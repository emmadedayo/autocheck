import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Config } from '../config';
import { Vehicle } from '../../dbconfig/entity/Vehicle.entity';
import { VinResponseDto } from './vin-response.dto';

@Injectable()
export class VinService {
  private readonly API_HOST = 'vin-lookup2.p.rapidapi.com';

  async lookupVin(vin: string): Promise<VinResponseDto> {
    const url = `https://${this.API_HOST}/vehicle-lookup`;

    const config: AxiosRequestConfig = {
      method: 'GET',
      url,
      params: { vin },
      headers: {
        'x-rapidapi-key': Config.RAPID_API,
        'x-rapidapi-host': this.API_HOST,
      },
    };

    try {
      const response: AxiosResponse<any> = await axios(config);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          `Error from API: ${error.response.data.message || error.response.statusText}`,
          error.response.status,
        );
      } else if (error.request) {
        throw new HttpException(
          'No response received from VIN API',
          HttpStatus.GATEWAY_TIMEOUT,
        );
      } else {
        throw new HttpException(
          'An error occurred while making the request',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  private baseValues: number[] = [18000, 20000, 22000, 24000, 26000];

  private getRandomBaseValue(): number {
    const randomIndex = Math.floor(Math.random() * this.baseValues.length);
    return this.baseValues[randomIndex];
  }

  async simulateValuation(vehicle: Vehicle): Promise<Promise<VinResponseDto>> {
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - vehicle.year;
    const baseValue = this.getRandomBaseValue();
    const depreciation = vehicleAge * 1000;
    const mileageAdjustment = Math.floor(vehicle.mileage / 10000) * 500;
    const loanValue = Math.max(
      baseValue - depreciation - mileageAdjustment,
      5000,
    );
    const tradeInValue = loanValue * 0.9;
    const adjustedTradeInValue = tradeInValue * 0.95;
    const retailValue = loanValue * 1.1;
    const msrpValue = baseValue;
    const averageTradeIn = tradeInValue;
    const weight = 3500;

    // Construct the response DTO
    const vinResponseDto = new VinResponseDto();
    vinResponseDto.uid = vehicle.vin;
    vinResponseDto.mileage_adjustment = mileageAdjustment;
    vinResponseDto.loan_value = loanValue;
    vinResponseDto.trade_in_value = tradeInValue;
    vinResponseDto.adjusted_trade_in_value = adjustedTradeInValue;
    vinResponseDto.make = vehicle.make;
    vinResponseDto.make_code = vehicle.make;
    vinResponseDto.model = vehicle.model;
    vinResponseDto.model_code = vehicle.model;
    vinResponseDto.year = vehicle.year;
    vinResponseDto.retail_value = retailValue;
    vinResponseDto.msrp_value = msrpValue;
    vinResponseDto.average_trade_in = averageTradeIn;
    vinResponseDto.weight = weight;

    return vinResponseDto;
  }
}
