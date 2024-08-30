import { IsString, IsNumber, IsOptional } from 'class-validator';

export class VinResponseDto {
  @IsString()
  uid: string;

  @IsNumber()
  mileage_adjustment: number;

  @IsNumber()
  loan_value: number;

  @IsNumber()
  trade_in_value: number;

  @IsNumber()
  adjusted_trade_in_value: number;

  @IsString()
  make: string;

  @IsString()
  make_code: string;

  @IsString()
  model: string;

  @IsString()
  model_code: string;

  @IsString()
  @IsOptional()
  trim?: string;

  @IsOptional()
  @IsString()
  trim_code?: string;

  @IsNumber()
  year: number;

  @IsNumber()
  retail_value: number;

  @IsNumber()
  msrp_value: number;

  @IsNumber()
  average_trade_in: number;

  @IsNumber()
  weight: number;
}
