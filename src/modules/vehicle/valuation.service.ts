import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleService } from './vehicle.service';
import { Valuation } from '../../dbconfig/entity/Valuation.entity';
import { VinService } from '../../common/vin/vin.service';
import { Vehicle } from '../../dbconfig/entity/Vehicle.entity';
import { BaseResponse } from '../../common/response/base_response';
import { User } from '../../dbconfig/entity/User.entity';

@Injectable()
export class ValuationService {
  constructor(
    @InjectRepository(Valuation)
    private readonly valuationRepository: Repository<Valuation>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly vehicleService: VehicleService,
    private readonly vinService: VinService,
    private readonly vin: VinService,
  ) {}

  async getValuationById(user: User, vehicleId: string) {
    const vehicle = await this.vehicleRepository.findOneBy({ id: vehicleId });
    const vinData = await this.vinService.lookupVin(vehicle.vin);

    const valuationData = this.isVinDataEmpty(vinData)
      ? await this.vinService.simulateValuation(vehicle)
      : vinData;
    const valuation = this.createValuationEntity(valuationData, vehicle, user);
    await this.valuationRepository.save(valuation);
    return BaseResponse.ok(valuationData, 'Valuation found');
  }

  private isVinDataEmpty(vinData: any): boolean {
    return Object.keys(vinData).length === 0;
  }

  private createValuationEntity(
    valuationData: any,
    vehicle: Vehicle,
    user: User,
  ): Valuation {
    return this.valuationRepository.create({
      uid: valuationData.uid,
      mileage_adjustment: valuationData.mileage_adjustment,
      loan_value: valuationData.loan_value,
      trade_in_value: valuationData.trade_in_value,
      adjusted_trade_in_value: valuationData.adjusted_trade_in_value,
      retail_value: valuationData.retail_value,
      msrp_value: valuationData.msrp_value,
      average_trade_in: valuationData.average_trade_in,
      weight: valuationData.weight,
      vehicle,
      user,
      valuation_date: new Date(),
    });
  }

  async getValuations(user: User) {
    const valuations = await this.valuationRepository.find({
      where: { user_id: user.id },
    });
    return BaseResponse.ok(valuations, 'Valuations found');
  }
}
