import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from '../../dbconfig/entity/Vehicle.entity';
import { Valuation } from '../../dbconfig/entity/Valuation.entity';
import { LoanApplication } from '../../dbconfig/entity/LoanApplication.entity';
import { ValuationService } from './valuation.service';
import { LoanApplicationService } from './loan-application.service';
import { UserService } from '../user/user.service';
import { User } from '../../dbconfig/entity/User.entity';
import { VinService } from '../../common/vin/vin.service';
import { JwtModule } from '@nestjs/jwt';
import { Config } from '../../common/config';
import { LoanEligibilityService } from './loan-eligibility-service.service';

@Module({
  imports: [
    JwtModule.register({
      secret: Config.JWT_SECRET,
      signOptions: { expiresIn: '3457d' },
    }),
    TypeOrmModule.forFeature([Vehicle, Valuation, User, LoanApplication]),
  ],
  controllers: [VehicleController],
  providers: [
    VehicleService,
    UserService,
    ValuationService,
    LoanApplicationService,
    VinService,
    LoanEligibilityService,
  ],
})
export class VehicleModule {}
