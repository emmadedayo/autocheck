import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateValuation1724941077610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('valuation', [
      new TableColumn({
        name: 'uid',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
      new TableColumn({
        name: 'mileage_adjustment',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'loan_value',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: 'trade_in_value',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: 'adjusted_trade_in_value',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: 'retail_value',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: 'msrp_value',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: 'average_trade_in',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: 'weight',
        type: 'int',
        isNullable: true,
      }),
    ]);
    //delete estimated_value column
    await queryRunner.dropColumn('valuation', 'estimated_value');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('valuation', [
      new TableColumn({
        name: 'uid',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
      new TableColumn({
        name: 'mileage_adjustment',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'loan_value',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: 'trade_in_value',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: 'adjusted_trade_in_value',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: 'retail_value',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: 'msrp_value',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: 'average_trade_in',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
      new TableColumn({
        name: 'weight',
        type: 'int',
        isNullable: true,
      }),
    ]);
    //add estimated_value column
    await queryRunner.addColumn(
      'valuation',
      new TableColumn({
        name: 'estimated_value',
        type: 'decimal',
        precision: 10,
        scale: 2,
      }),
    );
  }
}
