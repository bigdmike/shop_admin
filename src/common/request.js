import axios from 'axios';
import store from '@/store/index.js';
import router from '@/router';

// let baseURL = process.env.VUE_APP_BASE_API;
let baseURL = 'https://api.krace.com.tw/';
// 建立axios例項
const service = axios.create({
  baseURL: baseURL,
  timeout: 30000, // 請求超時時間
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
const err = (error) => {
  if (error.response) {
    let data = error.response.data;
    console.log(`message: ${data.msg}`);
  }
  return Promise.reject(error);
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return parts
      .pop()
      .split(';')
      .shift();
};

const showDialog = (res) => {
  store.commit('SetDialog', {
    title: '發生錯誤',
    content: res.msg,
    status: true,
  });
  if (res.code == 302) {
    router.push('/login');
  }
};

const showSnackBar = (text) => {
  store.commit('SetSnackbar', {
    content: text,
    status: true,
  });
};

// request攔截器
service.interceptors.request.use(
  (config) => {
    const token = getCookie('account_token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone攔截器
service.interceptors.response.use((response) => {
  return response.data;
}, err);

/*
 *  get請求
 *  url:請求地址
 *  params:引數
 * */
export function get(url, params = {}, success_text = '') {
  store.commit('SetPageLoading', 1);
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'get',
      params: params,
    })
      .then((response) => {
        resolve(response);
        response.code != 200 ? showDialog(response) : '';
        success_text != '' ? showSnackBar(success_text) : '';
        store.commit('SetPageLoading', -1);
      })
      .catch((error) => {
        reject(error);
        store.commit('SetPageLoading', -1);
      });
  });
}

/*
 *  post請求
 *  url:請求地址
 *  params:引數
 * */
export function post(url, params = {}, success_text = '') {
  store.commit('SetPageLoading', 1);
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: params,
    })
      .then((response) => {
        resolve(response);
        response.code != 200 ? showDialog(response) : '';
        success_text != '' ? showSnackBar(success_text) : '';
        store.commit('SetPageLoading', -1);
      })
      .catch((error) => {
        reject(error);
        store.commit('SetPageLoading', -1);
      });
  });
}

/*
 *  post請求
 *  url:請求地址
 *  params:引數
 * */
export function prerender_post(url, params = {}) {
  store.commit('SetPageLoading', 1);
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: params,
    })
      .then((response) => {
        resolve(response);
        store.commit('SetPageLoading', -1);
      })
      .catch((error) => {
        reject(error);
        store.commit('SetPageLoading', -1);
      });
  });
}

/*
 *  put請求
 *  url:請求地址
 *  params:引數
 * */
export function put(url, params = {}, success_text = '') {
  store.commit('SetPageLoading', 1);
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'put',
      data: params,
    })
      .then((response) => {
        resolve(response);
        response.code != 200 ? showDialog(response) : '';
        success_text != '' ? showSnackBar(success_text) : '';

        store.commit('SetPageLoading', -1);
      })
      .catch((error) => {
        reject(error);
        store.commit('SetPageLoading', -1);
      });
  });
}

/*
 *  patch請求
 *  url:請求地址
 *  params:引數
 * */
export function patch(url, params = {}, success_text = '') {
  store.commit('SetPageLoading', 1);
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'patch',
      data: params,
    })
      .then((response) => {
        resolve(response);
        response.code != 200 ? showDialog(response) : '';
        success_text != '' ? showSnackBar(success_text) : '';
        store.commit('SetPageLoading', -1);
      })
      .catch((error) => {
        reject(error);
        store.commit('SetPageLoading', -1);
      });
  });
}

/*
 *  delete請求
 *  url:請求地址
 *  params:引數
 * */
export function del(url, success_text = '') {
  store.commit('SetPageLoading', 1);
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'delete',
    })
      .then((response) => {
        response.code != 200 ? showDialog(response) : '';
        success_text != '' ? showSnackBar(success_text) : '';
        store.commit('SetPageLoading', -1);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
        store.commit('SetPageLoading', -1);
      });
  });
}

/*
 *  post_image請求
 *  url:請求地址
 *  params:引數
 * */
export function post_image(url, params = {}, success_text = '') {
  let image_data = new FormData();
  Object.keys(params).forEach((item) => {
    image_data.append(item, params[item]);
  });
  store.commit('SetPageLoading', 1);
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: image_data,
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
      },
    })
      .then((response) => {
        resolve(response);
        response.code != 200 ? showDialog(response) : '';
        success_text != '' ? showSnackBar(success_text) : '';
        store.commit('SetPageLoading', -1);
      })
      .catch((error) => {
        reject(error);
        store.commit('SetPageLoading', -1);
      });
  });
}

export default {
  get,
  post,
  put,
  del,
  patch,
};
