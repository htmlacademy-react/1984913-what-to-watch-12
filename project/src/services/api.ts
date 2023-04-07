import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import { API_URL, REQUEST_TIMEOUT } from '../utils/constants';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';

const StatusCodeMaping:Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]:true,
  [StatusCodes.UNAUTHORIZED]:true,
  [StatusCodes.NOT_FOUND]:true,
};

const showApiError = (response:AxiosResponse)=>!!StatusCodeMaping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error:AxiosError<{error:string}>)=>{
      const errorInfo = error.response;
      if(errorInfo && showApiError(errorInfo)){
        throw error;
      }
    }
  );

  return api;
};
