import {AxiosHelperConfig} from '@itning/axios-helper'
import Vue from 'vue'
import {LOCAL_STORAGE_KEY} from "../user";

let once = false;

function showErrorToast(title, data) {
  if (once) {
    return;
  }
  let msg;
  if (typeof data === "string") {
    msg = data;
  } else {
    msg = data.msg;
  }
  Vue.prototype.$notification['error']({
    message: title,
    description: msg,
    duration: 4.5,
    onClose: () => {
      once = false;
    }
  });
  once = true;
}

AxiosHelperConfig.errorMsgImpl = {
  showErrorToast: showErrorToast
};

AxiosHelperConfig.axiosInstanceBuilder
  .timeOut(1000 * 12)
  .requestInterceptor({
    onFulfilled: request => {
      let token = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (token !== undefined) {
        request.headers = {
          "Authorization": token,
          "Accept": "application/json"
        };
      } else {
        request.headers = {"Accept": "application/json"};
      }
      return request;
    },
    onRejected: error => {
      return Promise.reject(error);
    }
  })
  .responseInterceptor({
    onFulfilled: response => {
      return Promise.resolve(response);
    },
    onRejected: error => {
      if (error.response === undefined) {
        showErrorToast('网络异常', {msg: '请检查网络连接状态后再试'}, null);
        return Promise.reject(error);
      }
      if (error.response.status) {
        switch (error.response.status) {
          case 401:
            setTimeout(() => {
              window.location.href = "/login";
            }, 2000);
            showErrorToast("错误", error.response.data);
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
  })
  .build();
