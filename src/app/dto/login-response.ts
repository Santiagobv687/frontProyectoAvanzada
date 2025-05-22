// login-response.ts
import {UserResponse} from './user-response';

export interface LoginResponse {
  token: string;
  usuario: UserResponse;
}

