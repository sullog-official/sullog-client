import qs, { type IStringifyOptions } from 'qs';

export const generateUrl = ({
  url,
  params,
  options,
}: {
  url: string;
  params?: Record<string, unknown>;
  options?: IStringifyOptions;
}) => {
  return `${url}${params ? `?${qs.stringify(params, options)}` : ''}`;
};
