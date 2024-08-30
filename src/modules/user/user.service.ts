import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../dbconfig/entity/User.entity';
import { Repository } from 'typeorm';
import { CreateLoginDto, CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { BaseResponse } from '../../common/response/base_response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, phone } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { phone }],
    });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    //has
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    delete user.password;
    return BaseResponse.ok(user, 'User created successfully', HttpStatus.OK);
  }

  //get user

  async getUsers() {
    const users = await this.userRepository.find();
    return BaseResponse.ok(users, 'Users found', HttpStatus.OK);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new ConflictException('User not found');
    }
    return BaseResponse.ok(user, 'User found', HttpStatus.OK);
  }

  async login(data: CreateLoginDto) {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      return BaseResponse.bad('User not found', null, HttpStatus.NOT_FOUND);
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return BaseResponse.bad(
        'Invalid credentials',
        null,
        HttpStatus.BAD_REQUEST,
      );
    }
    //delete password
    delete user.password;
    const access_token = this.jwtService.sign({ sub: user });
    return BaseResponse.ok(
      { user, access_token },
      'Login successful',
      HttpStatus.OK,
    );
  }
}
