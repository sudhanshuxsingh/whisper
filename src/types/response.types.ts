export type ActionResponse<T> = {
  code: number;
  error?: string;
  data?: T;
};
