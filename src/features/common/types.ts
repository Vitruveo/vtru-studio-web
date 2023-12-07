export interface APIResponse<T = unknown, E = unknown> {
  code: string;
  transaction: string;
  message: string;
  data?: T;
  args?: E;
}
