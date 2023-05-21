import qs, { IStringifyOptions } from 'qs';

export const generateUrl = (
  url: string,
  queries?: Record<string, unknown>,
  options?: IStringifyOptions
) => {
  return `${url}${queries ? `?${qs.stringify(queries, options)}` : ''}`;
};
