import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { ValuationService } from './valuation.service';
import { LoanApplicationService } from './loan-application.service';
import {
  CreateLoanApplicationDto,
  CreateVehicleDto,
  UpdateLoanApplicationDto,
  UpdateVehicleDto,
} from './dto/vehicle.dto';
import { Vehicle } from '../../dbconfig/entity/Vehicle.entity';
import { LoanApplication } from '../../dbconfig/entity/LoanApplication.entity';
import { BaseResponse } from '../../common/response/base_response';
import { CurrentUser } from '../user/user.decorator';
import { User } from '../../dbconfig/entity/User.entity';

@Controller('')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly valuationService: ValuationService,
    private readonly loanApplicationService: LoanApplicationService,
  ) {}

  @Post('vehicle/create')
  async createVehicle(
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<BaseResponse<Vehicle>> {
    return this.vehicleService.createVehicle(createVehicleDto);
  }

  @Get('vehicle/get-by/:id')
  async getVehicleById(@Param('id') id: string): Promise<Vehicle> {
    return this.vehicleService.getVehicleById(id);
  }

  @Patch('vehicle/update-by/:id')
  async updateVehicle(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehicleService.updateVehicle(id, updateVehicleDto);
  }

  @Delete('vehicle/delete-by/:id')
  async deleteVehicle(@Param('id') id: string): Promise<void> {
    return this.vehicleService.deleteVehicle(id);
  }

  @Get('vehicle/all')
  async getVehicles(): Promise<BaseResponse<Vehicle[]>> {
    return this.vehicleService.getVehicles();
  }

  @Put('vehicle/loan/create/:evaluation_id')
  async createLoanApplication(
    @CurrentUser() user: User,
    @Body() createLoanApplicationDto: CreateLoanApplicationDto,
    @Param('evaluation_id') evaluation_id: string,
  ) {
    return this.loanApplicationService.createLoanApplication(
      user,
      createLoanApplicationDto,
      evaluation_id,
    );
  }

  @Get('vehicle/loan/:id')
  async getLoanApplicationById(
    @Param('id') id: string,
  ): Promise<LoanApplication> {
    return this.loanApplicationService.getLoanApplicationById(id);
  }

  @Patch('vehicle/loan/:id/status')
  async updateLoanStatus(
    @Param('id') id: string,
    @Body() updateLoanStatusDto: UpdateLoanApplicationDto,
  ) {
    return this.loanApplicationService.updateLoanStatus(
      id,
      updateLoanStatusDto,
    );
  }

  @Get('vehicle/loan')
  async getLoanApplications() {
    return this.loanApplicationService.getLoanApplications();
  }

  @Get('vehicle/valuation')
  async createValuation(@CurrentUser() user: User) {
    return this.valuationService.getValuations(user);
  }

  @Get('vehicle/valuation/:id')
  async getValuationById(@CurrentUser() user: User, @Param('id') id: string) {
    return this.valuationService.getValuationById(user, id);
  }
}
