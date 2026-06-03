import { Module } from '@nestjs/common'
import { TravellersService } from './travellers.service'

@Module({ providers: [TravellersService], exports: [TravellersService] })
export class TravellersModule {}
