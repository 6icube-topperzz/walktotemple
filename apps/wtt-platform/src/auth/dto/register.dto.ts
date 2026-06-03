import { IsEmail, IsString, MinLength, IsMobilePhone } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(10)
  mobile: string

  @IsString()
  @MinLength(2)
  fullName: string

  @IsString()
  @MinLength(8)
  password: string
}
