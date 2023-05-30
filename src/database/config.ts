import { DataSourceOptions } from 'typeorm';
import { Note } from '../notes/entities/note.entity';
import { User } from '../users/entities/user.entity';
import { CreateUsersTable1685417615460 } from './migration/1685417615460-CreateUsersTable';
import { CreateNotesTable1685417638576 } from './migration/1685417638576-CreateNotesTable';

export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'note_nestjs',
  entities: [User, Note],
  connectTimeout: 1000_000_000,
  migrations: [CreateUsersTable1685417615460, CreateNotesTable1685417638576],
} satisfies DataSourceOptions;
