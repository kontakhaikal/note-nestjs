import { UserCredential } from '../dto/user-credential.dto';

export interface CredentialService {
  generateCredentialToken(userCredential: UserCredential): Promise<string>;
  retriveUserCredential(credentialToken: string): Promise<UserCredential>;
}
