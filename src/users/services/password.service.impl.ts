import { Injectable } from '@nestjs/common';
import { compare as compareAsync, hash as hashAsync } from 'bcrypt';
import { PasswordService } from './password.service';

@Injectable()
export class PasswordServiceImpl implements PasswordService {
  async hash(rawPassword: string): Promise<string> {
    return await hashAsync(rawPassword, 12);
  }
  async compare(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return await compareAsync(rawPassword, hashedPassword);
  }
}
