import { UserAuthApiRes, UserAuthReq } from "./types";

export function userAuthReq({ email }: UserAuthReq): Promise<UserAuthApiRes> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ token: "new token receveid!" }), 500)
  );
}
