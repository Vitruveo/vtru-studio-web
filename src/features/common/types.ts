export interface APIResponse<T = unknown, E = any> {
  code: string;
  transaction: string;
  message: string;
  data?: T;
  args?: E;
}
