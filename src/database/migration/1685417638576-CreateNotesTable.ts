import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateNotesTable1685417638576 implements MigrationInterface {
  name = 'CreateNotesTable1685417638576';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notes',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
          }),
          new TableColumn({
            name: 'title',
            type: 'varchar(60)',
            isNullable: false,
          }),
          new TableColumn({
            name: 'body',
            type: 'text',
            isNullable: false,
          }),
          new TableColumn({
            name: 'user_id',
            type: 'varchar(36)',
            isNullable: false,
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
          }),
          new TableColumn({
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
          }),
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'notes',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'fk__note_user',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('notes', 'fk__note_user');
    await queryRunner.dropTable('notes', true);
  }
}
