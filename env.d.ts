import { Request } from 'express';
import { UserCredential } from './src/notes/dto/user-credential';

declare global {
  namespace Express {
    export interface Request {
      userCredential?: UserCredential;
    }
  }
}
