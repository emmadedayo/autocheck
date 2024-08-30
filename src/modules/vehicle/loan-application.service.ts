import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleService } from './vehicle.service';
import { LoanApplication } from '../../dbconfig/entity/LoanApplication.entity';
import {
  CreateLoanApplicationDto,
  UpdateLoanApplicationDto,
} from './dto/vehicle.dto';
import { User } from '../../dbconfig/entity/User.entity';
import { Valuation } from '../../dbconfig/entity/Valuation.entity';
import { LoanEligibilityService } from './loan-eligibility-service.service';
import { BaseResponse } from '../../common/response/base_response';
import { LoanStatus } from '../../common/enum/loan.enum';

@Injectable()
export class LoanApplicationService {
  constructor(
    @InjectRepository(LoanApplication)
    private readonly loanApplicationRepository: Repository<LoanApplication>,
    private readonly vehicleService: VehicleService,
    private readonly loanEligibilityService: LoanEligibilityService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Valuation)
    private readonly valuationRepository: Repository<Valuation>,
  ) {}

  async createLoanApplication(
    user: User,
    createLoanApplicationDto: CreateLoanApplicationDto,
    evaluation_id: string,
  ) {
    const valuation = await this.valuationRepository.findOneBy({
      id: evaluation_id,
    });
    if (!valuation) {
      throw new NotFoundException('Vehicle Evaluation not found');
    }
    const loanEligibility =
      this.loanEligibilityService.calculateLoanEligibility(
        valuation,
        createLoanApplicationDto,
      );
    if (!loanEligibility.isEligible) {
      throw new HttpException(
        'Oops, the loan application is not eligible.',
        HttpStatus.BAD_REQUEST,
      );
    }
    //check for pending loan application
    const pendingLoanApplication =
      await this.loanApplicationRepository.findOneBy({
        user_id: user.id,
        status: LoanStatus.PENDING,
      });
    if (pendingLoanApplication) {
      throw new HttpException(
        'Oops, you have a pending loan application.',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.loanApplicationRepository.save({
      repayment_plan: loanEligibility.repaymentPlan,
      is_eligible: loanEligibility.isEligible,
      required_salary: loanEligibility.requiredSalary,
      status: LoanStatus.PENDING,
      user: user,
      vehicle: valuation.vehicle,
      calculate_loan_details: loanEligibility.calculateLoanDetails,
      duration: createLoanApplicationDto.duration,
    });
    return BaseResponse.ok(
      loanEligibility,
      'Congratulations, your loan application is eligible.',
    );
  }

  async getLoanApplicationById(id: string): Promise<LoanApplication> {
    const loanApplication = await this.loanApplicationRepository.findOneBy({
      id,
    });
    if (!loanApplication) {
      throw new NotFoundException('Loan application not found');
    }
    return loanApplication;
  }

  async updateLoanStatus(
    id: string,
    updateLoanStatusDto: UpdateLoanApplicationDto,
  ) {
    const updatedLoanApplication =
      await this.loanApplicationRepository.findOneBy({ id });
    if (!updatedLoanApplication) {
      throw new NotFoundException('Loan application not found');
    }
    await this.loanApplicationRepository.update(id, {
      status: updateLoanStatusDto.status,
    });
    return BaseResponse.ok(null, 'Loan application updated successfully');
  }

  async getLoanApplications() {
    const loanApplications = await this.loanApplicationRepository.find();
    return BaseResponse.ok(
      loanApplications,
      'Loan applications retrieved successfully',
    );
  }
}
