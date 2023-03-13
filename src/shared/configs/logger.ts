import { AxiosInstance, AxiosResponse } from 'axios';

const responseLogMiddleware = (res: AxiosResponse<any, any>) => {
  const status = res.status;
  const method = res.request._method;
  const url = res.request.responseURL.replace('https://', '');
  let req;
  try {
    req = res?.config?.data ? JSON.parse(res?.config?.data) : null;
  } catch (e) {
    req = null;
  }
  console.info(decodeURI(`${status} ${method} ${url}`));
  if (req) {
    console.info('req', req);
  }
  return res;
};

const responseErrorLogMiddleware = (err: any) => {
  const res = err.response;
  const status = res.status;
  const method = res.request._method;
  const url = res.request.responseURL.replace('https://', '');
  const req = res?.config?.data ? JSON.parse(res?.config?.data) : null;
  const resData = res.data;
  console.info(decodeURI(`${status} ${method} ${url}`));
  if (req) {
    console.info('req', req);
  }
  if (resData) {
    console.info('res', resData);
  }
  return Promise.reject(err);
};

const registerLogger = (client: AxiosInstance) => {
  client.interceptors.response.use(
    responseLogMiddleware,
    responseErrorLogMiddleware
  );
};

export default registerLogger;
