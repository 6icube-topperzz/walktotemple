import { IsString, IsUUID, IsInt, IsOptional, IsEmail, IsArray, ValidateNested, Min } from 'class-validator'
import { Type } from 'class-transformer'

class TravellerDto {
  @IsString() fullName: string
  @IsInt() age: number
  @IsOptional() @IsString() gender?: string
  @IsOptional() @IsString() idType?: string
  @IsOptional() @IsString() idNumber?: string
  @IsOptional() isLead?: boolean
}

export class InitiateBookingDto {
  @IsUUID() departureDateId: string
  @IsInt() @Min(1) adults: number
  @IsOptional() @IsInt() children?: number
  @IsString() contactName: string
  @IsString() contactMobile: string
  @IsOptional() @IsEmail() contactEmail?: string
  @IsOptional() @IsString() pickupPoint?: string
  @IsOptional() @IsString() specialRequirements?: string
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => TravellerDto) travellers?: TravellerDto[]
}
