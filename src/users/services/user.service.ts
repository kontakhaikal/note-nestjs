import { UserLoginRequest, UserLoginResponse } from '../dto/user-login.dto';
import { UserSignInRequest, UserSignInResponse } from '../dto/user-signin.dto';

export interface UserService {
  signIn(request: UserSignInRequest): Promise<UserSignInResponse>;
  logIn(request: UserLoginRequest): Promise<UserLoginResponse>;
}
