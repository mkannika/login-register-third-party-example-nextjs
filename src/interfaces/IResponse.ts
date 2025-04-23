export interface IResponseFormat<T> {
  status: boolean;
  data: T;
  message?: string;
}
