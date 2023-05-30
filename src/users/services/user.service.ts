import { UserLoginRequest, UserLoginResponse } from '../dto/user-login';
import { UserSignInRequest, UserSignInResponse } from '../dto/user-signin';

export interface UserService {
  signIn(request: UserSignInRequest): Promise<UserSignInResponse>;
  logIn(request: UserLoginRequest): Promise<UserLoginResponse>;
}
