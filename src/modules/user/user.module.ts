import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../../dbconfig/entity/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from '../../common/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: Config.JWT_SECRET,
      signOptions: { expiresIn: '3457d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
