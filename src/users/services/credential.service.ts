import { UserCredential } from '../dto/user-credential';

export interface CredentialService {
  generateCredentialToken(userCredential: UserCredential): Promise<string>;
  retriveUserCredential(credentialToken: string): Promise<UserCredential>;
}
