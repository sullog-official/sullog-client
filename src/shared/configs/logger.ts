import { AxiosInstance, AxiosResponse } from 'axios';

const logRequest = (res: AxiosResponse<any, any>, error = false) => {
  const status = res.status;
  const method = res.request._method;
  const url = res.request.responseURL.replace('https://', '');
  const req = res.config.data ? JSON.parse(res.config.data) : null;

  console.info(decodeURI(`${status} ${method} ${url}`));
  if (req) console.info('req', req);
  if (error && res.data) console.error('res', res.data);

  return res;
};

const responseLogMiddleware = (res: AxiosResponse<any, any>) => logRequest(res);

const responseErrorLogMiddleware = (err: any) =>
  Promise.reject(logRequest(err.response, true));

const registerLogger = (client: AxiosInstance) => {
  client.interceptors.response.use(
    responseLogMiddleware,
    responseErrorLogMiddleware
  );
};

export default registerLogger;
