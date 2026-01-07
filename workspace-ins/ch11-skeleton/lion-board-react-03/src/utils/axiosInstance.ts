import useUserStore from "@/zustand/userStore";
import axios from "axios";
import router from "@/routes";

// API 서버 주소
const API_SERVER = 'https://fesp-api.koyeb.app/market';
// access token 재발급 URL
const REFRESH_URL = '/auth/refresh';

// Axios 인스턴스 생성 함수
export function getAxiosInstance() {
  const instance = axios.create({
    baseURL: API_SERVER,
    timeout: 1000*15,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Client-Id': 'openmarket',
    }
  });

  // 요청 인터셉터 추가
  instance.interceptors.request.use((config) => {
    const { user } = useUserStore.getState();
    if(user && config.url !== REFRESH_URL){
      config.headers.Authorization = `Bearer ${ user.token?.accessToken }`;
    }
    config.params = {
      // delay: 500,
      ...config.params,
    };
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // 응답 인터셉터 추가
  instance.interceptors.response.use((response) => {
    return response;
  }, async (error) => {
    console.error('에러 응답 인터셉터 호출', error);

    const { user, setUser } = useUserStore.getState();
    const { config, response } = error;

    if(response?.status === 401){ // 인증 실패
      if(config.url === REFRESH_URL){ // refresh token도 만료된 경우 로그인 페이지로
        navigateLogin();
      }else if(user){ // 로그인 했으나 access token이 만료된 경우 access token과 refresh token 재발급
        // refresh 토큰으로 access token과 refresh token 재발급 요청
        const { data: { accessToken, refreshToken } } = await instance.get(REFRESH_URL, {
          headers: {
            Authorization: `Bearer ${user.token?.refreshToken}`
          }
        });
        setUser({ ...user, token: { accessToken, refreshToken } });
        // 갱신된 accessToken으로 실패했던 요청을 다시 시도
        config.headers.Authorization = `Bearer ${ accessToken }`;        
        return axios(config);
      }else{ // 로그인 안한 경우
        navigateLogin();
      }
    }

    return Promise.reject(error);
  });

  function navigateLogin(){
    const gotoLogin = confirm('로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?');
    if(gotoLogin){
      // state로 로그인 후에 돌아올 페이지 전달
      router.navigate('/users/login', { state: { from: router.state.location.pathname } });
    }
  }

  return instance;
}