import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Vehicle } from './Vehicle.entity';
import { LoanStatus } from '../../common/enum/loan.enum';

@Entity()
export class LoanApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  //user_id
  @Column('uuid')
  user_id: string;

  @ManyToOne(() => Vehicle, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @Column('json')
  repayment_plan: any;

  @Column('json')
  calculate_loan_details: any;

  @Column('boolean', { default: false })
  is_eligible: boolean;

  @Column('numeric', { precision: 10, scale: 2 })
  required_salary: number;

  @Column('int')
  duration: number;

  @Column({
    type: 'varchar',
    enum: LoanStatus,
  })
  status: LoanStatus;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
