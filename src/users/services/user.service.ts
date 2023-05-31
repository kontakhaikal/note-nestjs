import { UserLoginRequest, UserLoginResponse } from '../dto/user-login';
import {
  UserRegisterRequest,
  UserRegisterResponse,
} from '../dto/user-register';

export interface UserService {
  register(request: UserRegisterRequest): Promise<UserRegisterResponse>;
  login(request: UserLoginRequest): Promise<UserLoginResponse>;
}
