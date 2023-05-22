import { AxiosInstance, AxiosResponse } from 'axios';

const logRequest = (res: AxiosResponse<any, any>, error = false) => {
  const status = res?.status;
  const method = res?.request._method;
  const url = res?.request.responseURL.replace('https://', '');
  let reqData = res?.config.data;
  if (res.headers['Content-Type'] === 'multipart/form-data') {
    reqData = reqData ? JSON.parse(reqData) : null;
  }

  console.info(decodeURI(`${status} ${method} ${url}`));
  if (reqData) console.info('req', reqData);
  if (error && res?.data) console.error('res', res.data);

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
