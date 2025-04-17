export interface HttpIput {
  url?: string;
  method?: HttpMethod;
  baseURL?: string;
  params?: unknown;
  data?: unknown;
  headers?: {
    [key: string]: string;
  };
}

export enum HttpCode {
  OK = 200,
  BAD = 500,
  NOT_FOUND = 404,
  OK_Create = 201,
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
}

export enum LogsType {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}
