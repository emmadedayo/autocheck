import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordToUser1724945290662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //add password text
    await queryRunner.query(`ALTER TABLE "user" ADD COLUMN password TEXT`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //drop password column
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN password`);
  }
}
