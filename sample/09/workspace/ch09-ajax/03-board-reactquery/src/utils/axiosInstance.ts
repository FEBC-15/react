// https://github.com/FEBC-15/js/blob/main/workspace-ins/ch09/ex09-todolist/yong/utils.ts 참고해서 작성

import axios from "axios";

const API_SERVER = 'https://fesp-api.koyeb.app/market';

export function getAxiosInstance() {
  const instance = axios.create({
    baseURL: API_SERVER,
    timeout: 1000*5,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Client-Id': 'openmarket',
    }
  });

  // 요청 인터셉터 추가
  instance.interceptors.request.use((config) => {
    console.log('요청 인터셉터 호출', config);
    config.params = {
      // delay: 3000,
      ...config.params,
    };
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // 응답 인터셉터 추가
  instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    console.error('에러 응답 인터셉터 호출', error);
    return Promise.reject(new Error('잠시 후 다시 이용해 주시기 바랍니다.'));
  });

  return instance;
}