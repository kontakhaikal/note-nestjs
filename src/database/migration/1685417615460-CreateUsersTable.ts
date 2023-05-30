import { type } from 'os';
import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateUsersTable1685417615460 implements MigrationInterface {
  name = 'CreateUsersTable1685417615460';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          new TableColumn({ name: 'id', type: 'varchar(36)', isPrimary: true }),
          new TableColumn({
            name: 'username',
            type: 'varchar(24)',
            isUnique: true,
          }),
          new TableColumn({ name: 'first_name', type: 'varchar(32)' }),
          new TableColumn({ name: 'last_name', type: 'varchar(32)' }),
          new TableColumn({ name: 'password', type: 'varchar(225)' }),
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }
}
