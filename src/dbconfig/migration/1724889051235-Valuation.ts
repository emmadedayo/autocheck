import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Valuation1724889051235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'valuation',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'vehicle_id',
            type: 'uuid',
          },
          {
            name: 'estimated_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'valuation_date',
            type: 'date',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'valuation',
      new TableForeignKey({
        columnNames: ['vehicle_id'],
        referencedTableName: 'vehicle',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('valuation');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('vehicle_id') !== -1,
    );
    await queryRunner.dropForeignKey('valuation', foreignKey);
    await queryRunner.dropTable('valuation');
  }
}
