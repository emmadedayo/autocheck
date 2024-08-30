import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Vehicle1724889043243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vehicle',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'vin',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'make',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'model',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'year',
            type: 'int',
          },
          {
            name: 'mileage',
            type: 'int',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vehicle');
  }
}
