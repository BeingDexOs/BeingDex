import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from "qs";
import { ElMessage } from "element-plus"
import 'element-plus/es/components/message/style/css'
import { userStore } from '@/store/user';
import i18n from '@/locals/i18n'

const { t } = i18n.global

export const imgurl = import.meta.env.VITE_IMG_BASE_URL
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    get: {
      'Content-Type': 'application/json'
    },
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = localStorage.getItem('beingdex:token');
    token && (config.headers.token = token);
    return config;
  },
  error => {
    return Promise.reject(error);
  })

// 响应拦截器
instance.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data.code === 1) {
      return Promise.resolve(response.data);
    } else {
      ElMessage.error(response.data.msg)
      return Promise.reject(response.data);
    }
  },
  // 服务器状态码不是200的情况    
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          //未登录
          ElMessage.error(error.response.data.msg)
          localStorage.removeItem('beingdex:token')
          const user_store = userStore()
          user_store.islogin = false
          break;
        default:
          ElMessage.error(error.response.statusText)
          break;
      }
      return Promise.reject(error.response.data);
    }
  }
);

const langList = ['en', 'zh', 'ar', 'ja', 'vi', 'ru', 'es', 'tr', 'it', 'fr', 'ku', 'zh_tw', 'id', 'th', 'uk', 'sv', 'pt', 'uz', 'ko']

const getLangType = () => {
  const local_lang = localStorage.getItem('beingdex:lang')
  const language = langList.find(e => e == local_lang)
  return language
}

interface Arguments {
  url: string,
  method: string,
  [key: string]: any
}
async function apiRequest(method: string, url: string, params = {}, isupload = false) {
  let arg: Arguments = {
    url: url,
    method: method
  }
  const addObj = {
    lang: getLangType()
  }
  method == 'GET' ? arg['params'] = Object.assign(params, addObj) : method == 'POST' ? arg['data'] = qs.stringify(Object.assign(params, addObj)) : ''
  if (isupload) {
    arg['headers']['Content-Type'] = 'multipart/form-data'
    arg['data'] = params
  }
  return instance(arg)
}

export const $get = (url: string, params?: object) => apiRequest('GET', url, params)
export const $post = (url: string, params?: object) => apiRequest('POST', url, params)
export const $upload = (url: string, params?: object) => apiRequest('POST', url, params, true)