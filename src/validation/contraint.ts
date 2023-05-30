import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
@ValidatorConstraint({ async: true, name: 'IsUsernameUnique' })
export class UsernameUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validate(
    username?: string,
    _validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (username === undefined) {
      // not validated
      return true;
    }

    const isExist = await this.userRepository.exist({ where: { username } });

    return !isExist;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `username is already used`;
  }
}
