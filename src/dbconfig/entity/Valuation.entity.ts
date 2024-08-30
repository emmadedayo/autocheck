import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Vehicle } from './Vehicle.entity';
import { User } from './User.entity';

@Entity()
export class Valuation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vehicle, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @ManyToOne(() => User, { onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  //user_id
  @Column('uuid')
  user_id: string;

  @Column('varchar', { length: 255, nullable: true })
  uid: string;

  @Column('int', { nullable: true })
  mileage_adjustment: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  loan_value: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  trade_in_value: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  adjusted_trade_in_value: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  retail_value: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  msrp_value: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  average_trade_in: number;

  @Column('int', { nullable: true })
  weight: number;

  @Column('date')
  valuation_date: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
