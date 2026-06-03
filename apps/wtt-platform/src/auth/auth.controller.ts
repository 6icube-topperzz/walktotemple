import { Controller, Post, Get, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { Public, CurrentUser } from '@wtt/auth'

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<any> {
    return this.auth.register(dto)
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<any> {
    return this.auth.login(dto)
  }

  @Get('me')
  me(@CurrentUser() user: any): any {
    return user
  }
}
