import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    /*JwtModule.register({
      global: true,
      secret: 'JWTSECRET',
      signOptions: { expiresIn: '1d' },
    })*/
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWTSECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES') },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService]
})
export class AuthModule {}
