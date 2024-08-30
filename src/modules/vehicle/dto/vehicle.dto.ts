import {
  IsString,
  IsInt,
  IsUUID,
  Length,
  IsOptional,
  IsDecimal,
  IsDate,
  IsEnum,
} from 'class-validator';
import { LoanStatus } from '../../../common/enum/loan.enum';

export class CreateVehicleDto {
  @IsString()
  @Length(17, 17) // VIN is typically 17 characters
  vin: string;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsInt()
  year: number;

  @IsInt()
  mileage: number;
}

export class UpdateVehicleDto {
  @IsString()
  @Length(17, 17)
  @IsOptional()
  vin?: string;

  @IsString()
  @IsOptional()
  make?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsInt()
  @IsOptional()
  mileage?: number;
}

export class CreateValuationDto {
  @IsUUID()
  vehicle_id: string;

  @IsDecimal()
  estimated_value: number;

  @IsDate()
  valuation_date: Date;
}

export class UpdateValuationDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsUUID()
  @IsOptional()
  vehicle_id?: string;

  @IsDecimal()
  @IsOptional()
  estimated_value?: number;

  @IsDate()
  @IsOptional()
  valuation_date?: Date;
}

export class CreateLoanApplicationDto {
  @IsDecimal()
  salary_amount: number;

  @IsInt()
  duration: number;
}

export class UpdateLoanApplicationDto {
  @IsEnum(LoanStatus)
  @IsOptional()
  status?: LoanStatus;
}
