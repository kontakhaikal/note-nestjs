import { UserCredential } from '../dto/user-credential';

export interface CredentialService {
  generateCredentialToken(userCredential: UserCredential): Promise<string>;
  retrieveUserCredential(credentialToken: string): Promise<UserCredential>;
}
