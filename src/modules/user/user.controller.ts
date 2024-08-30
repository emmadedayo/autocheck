import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateLoginDto, CreateUserDto } from './dto/user.dto';
import { Public } from './strategy/public-strategy';

@Public()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post('login')
  async login(@Body() createLoginDto: CreateLoginDto) {
    return this.userService.login(createLoginDto);
  }
}
