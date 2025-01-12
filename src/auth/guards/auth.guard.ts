import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService , private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const authorization = request.headers.authorization // Bearer Token
    const token = authorization?.split(' ')[1]

    if(!token){
      throw new UnauthorizedException()
    }

    try {
      await this.jwtService.verifyAsync(token, { secret: this.configService.get('JWTSECRET') })
      return true
    } catch (error) {
      throw new UnauthorizedException('Verify error: ' + error)
    }
  }
}
