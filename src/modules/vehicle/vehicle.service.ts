import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from '../../dbconfig/entity/Vehicle.entity';
import { Repository } from 'typeorm';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { BaseResponse } from '../../common/response/base_response';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async createVehicle(createVehicleDto: CreateVehicleDto) {
    const existingVehicle = await this.vehicleRepository.findOneBy({
      vin: createVehicleDto.vin,
    });
    if (existingVehicle) {
      throw new ConflictException('Vehicle with this VIN already exists.');
    }

    const vehicle = this.vehicleRepository.create(createVehicleDto);
    return BaseResponse.ok(vehicle, 'Vehicle created successfully');
  }

  async updateVehicle(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    await this.vehicleRepository.update(id, updateVehicleDto);
    const updatedVehicle = await this.vehicleRepository.findOneBy({ id });
    if (!updatedVehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return updatedVehicle;
  }

  async getVehicleById(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOneBy({ id });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }

  async deleteVehicle(id: string): Promise<void> {
    const result = await this.vehicleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Vehicle not found');
    }
  }

  async getVehicles() {
    const vehicles = await this.vehicleRepository.find();
    return BaseResponse.ok(vehicles, 'Vehicles found');
  }
}
