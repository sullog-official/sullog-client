import { AxiosRequestConfig, AxiosResponse } from 'axios';

import axios from '@/shared/configs/axios';

export const request = <T>(config: AxiosRequestConfig) =>
  axios(config).then((response: AxiosResponse<T>) => response.data);
