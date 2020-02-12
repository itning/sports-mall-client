import axios from 'axios'
import Vue from 'vue'

let show = false;
//错误吐司
const showErrorToast = function (title, msg, duration = 4.5) {
    Vue.prototype.$notification['error']({
        message: title,
        description: msg,
        duration: duration,
        onClose: () => {
            show = false;
        }
    });
};
//一次显示错误吐司
const onceToast = function (msg, title = '注意：') {
    if (show) {
        return;
    }
    showErrorToast(title, msg);
    show = true;
};

//12s超时
let instance = axios.create({timeout: 1000 * 12});

//请求拦截器
instance.interceptors.request.use((request) => {
    let token = window.localStorage.getItem('authorization_token');
    if (token !== undefined) {
        request.headers = {
            "Authorization": token,
            "Accept": "application/json"
        };
    } else {
        request.headers = {"Accept": "application/json"};
    }
    return request;

}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(
    response => {
        return Promise.resolve(response);
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response === undefined) {
            showErrorToast('网络异常', '请检查网络连接状态后再试', null);
            return Promise.reject(error);
        }
        if (error.response.status) {
            switch (error.response.status) {
                case 401:
                    window.localStorage.setItem('last_path', window.location.pathname);
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 2000);
                    onceToast(error.response.data.msg);
                    return;
                case 403:
                    console.warn('权限不足');
                    break;
                case 404:
                    console.warn('请求URL不存在');
                    break;
                case 500:
                    console.warn('服务器错误');
                    break;
                case 503:
                    console.warn('服务器错误');
                    break;
                default:
                    console.warn(error);
            }
            return Promise.reject(error);
        }
    }
);

const Method = {GET: 0, POST: 1, DELETE: 2, UPDATE: 3, PUT: 4, PATCH: 5};

export function Get(url) {
    return new _request(url, Method.GET);
}

export function Del(url) {
    return new _request(url, Method.DELETE);
}

export function Post(url) {
    return new _request(url, Method.POST);
}

export function Patch(url) {
    return new _request(url, Method.PATCH);
}

export function Download(url, fileName) {
    instance.get(url, {
        responseType: 'blob' //指定返回数据的格式为blob
    }).then(response => {
        let url = window.URL.createObjectURL(response.data);
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = fileName(response.headers);
        a.click();
        window.URL.revokeObjectURL(url);
    }).catch(error => {
        if (error.response !== undefined) {
            console.warn(error);
            showErrorToast("下载失败：", error.toString());
        }
    });
}

function _request(url, method) {
    this.method = method;
    this.url = url;
    this.code = 200;
    this.startMsg = '错误：';
}

_request.prototype.withErrorStartMsg = function (msg) {
    this.startMsg = msg;
    return this;
};

_request.prototype.withSuccessCode = function (code) {
    this.code = code;
    return this;
};
_request.prototype.withJSONData = function (params) {
    this.jsonData = params;
    return this;
};

_request.prototype.withURLSearchParams = function (params) {
    let urlSearchParams = new URLSearchParams();
    for (let p in params) {
        if (params.hasOwnProperty(p)) {
            let v = params[p];
            urlSearchParams.append(p, v);
        }
    }
    this.urlSearchParams = urlSearchParams;
    return this;
};

_request.prototype.withFormData = function (params, enableUploadProgress = true, uploadProgress) {
    let formData = new FormData();
    for (let p in params) {
        if (params.hasOwnProperty(p)) {
            let v = params[p];
            formData.append(p, v);
        }
    }
    this.formData = formData;
    this.enableUploadProgress = enableUploadProgress;
    this.uploadProgress = uploadProgress;
    return this;
};

_request.prototype.doAfter = function (fn) {
    this.doAfterFun = fn;
    return this;
};

_request.prototype.withOnceErrorToast = function (isOnce = false) {
    this.isOnce = isOnce;
    return this;
};

_request.prototype.watchError = function (errorWatchFunc) {
    this.errorWatchFunc = errorWatchFunc;
    return this;
};

_request.prototype.do = function (fn) {
    let that = this;
    let promise = null;
    switch (this.method) {
        case Method.GET:
            promise = instance.get(this.url);
            break;
        case Method.DELETE:
            if (this.urlSearchParams !== undefined) {
                promise = instance.delete(this.url, {data: this.urlSearchParams});
            } else if (this.formData !== undefined) {
                promise = instance.delete(this.url, {
                    data: this.formData,
                    headers: {'content-type': 'multipart/form-data'}
                });
            } else {
                promise = instance.delete(this.url);
            }
            break;
        case Method.POST:
            if (this.urlSearchParams !== undefined) {
                promise = instance.post(this.url, this.urlSearchParams);
            } else if (this.formData !== undefined) {
                if (this.enableUploadProgress === false) {
                    promise = instance.post(this.url, this.formData, {headers: {'content-type': 'multipart/form-data'}});
                } else {
                    const uploadProgress = this.uploadProgress;
                    let config = {
                        headers: {'content-type': 'multipart/form-data'},
                        onUploadProgress: progressEvent => {
                            let progress = progressEvent.loaded / progressEvent.total * 100 | 0;
                            uploadProgress(progress);
                        }
                    };
                    promise = instance.post(this.url, this.formData, config);
                }
            } else {
                promise = instance.post(this.url);
            }
            break;
        case Method.PATCH:
            if (this.urlSearchParams !== undefined) {
                promise = instance.patch(this.url, this.urlSearchParams);
            } else if (this.formData !== undefined) {
                promise = instance.patch(this.url, this.formData, {headers: {'content-type': 'multipart/form-data'}});
            } else if (this.jsonData !== undefined) {
                promise = instance.patch(this.url, this.jsonData);
            } else {
                promise = instance.patch(this.url);
            }
            break;
        default:
            return Promise.reject('none switch found of ' + this.method);
    }
    promise
        .then(response => {
            if (response.status === that.code) {
                fn(response)
            } else {
                showErrorToast(that.startMsg, response.data.msg);
            }
        })
        .catch(error => {
            if (error.response !== undefined) {
                if (that.errorWatchFunc !== undefined) {
                    that.errorWatchFunc(error.response)
                }
                if (that.isOnce !== undefined && that.isOnce) {
                    onceToast(error.response.data.msg, that.startMsg);
                } else {
                    showErrorToast(that.startMsg, error.response.data.msg);
                }
            }
        })
        .then(() => {
            if (that.doAfterFun !== undefined) {
                that.doAfterFun();
            }
        });
    return this;
};

export default instance;
