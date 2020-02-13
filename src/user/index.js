import {Base64} from 'js-base64';

export const LOCAL_STORAGE_KEY = 'authorization_token';
let User = {};

export function analyze(token) {
  try {
    return JSON.parse(JSON.parse(
      Base64.decode(token.split('.')[1])
    ).loginUser);
  } catch (e) {
    return {};
  }
}

User.loginUser = function () {
  if (window.localStorage.getItem(LOCAL_STORAGE_KEY) === null) {
    return {};
  }
  try {
    return JSON.parse(JSON.parse(
      Base64.decode(
        window.localStorage.getItem(LOCAL_STORAGE_KEY)
          .split('.')[1]
      )
    ).loginUser);
  } catch (e) {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    return {};
  }
};

User.install = function (Vue, options) {
  Vue.prototype.$user = User;
};
export default User;
