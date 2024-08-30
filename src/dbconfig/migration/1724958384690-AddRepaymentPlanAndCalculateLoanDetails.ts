import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddRepaymentPlanAndCalculateLoanDetails1724958384690
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('loan_application', [
      new TableColumn({
        name: 'repayment_plan',
        type: 'json',
        isNullable: false,
      }),
      new TableColumn({
        name: 'calculate_loan_details',
        type: 'json',
        isNullable: false,
      }),
      new TableColumn({
        name: 'is_eligible',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
      new TableColumn({
        name: 'required_salary',
        type: 'numeric',
        isNullable: false,
      }),
      new TableColumn({
        name: 'duration',
        type: 'integer',
        isNullable: false,
      }),
    ]);
    // Remove the old column
    await queryRunner.dropColumn('loan_application', 'requested_amount');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Add back the old column
    await queryRunner.addColumn(
      'loan_application',
      new TableColumn({
        name: 'requested_amount',
        type: 'numeric',
        isNullable: true,
      }),
    );

    // Remove the new columns
    await queryRunner.dropColumns('loan_application', [
      new TableColumn({
        name: 'repayment_plan',
        type: 'json',
      }),
      new TableColumn({
        name: 'calculate_loan_details',
        type: 'json',
      }),
      new TableColumn({
        name: 'is_eligible',
        type: 'boolean',
      }),
      new TableColumn({
        name: 'required_salary',
        type: 'numeric',
      }),
      new TableColumn({
        name: 'duration',
        type: 'integer',
      }),
    ]);
  }
}
