import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DbModule } from './db/db.module'
import { HealthModule } from './health/health.module'
import { AuthModule } from './auth/auth.module'
import { PackagesModule } from './packages/packages.module'
import { BookingsModule } from './bookings/bookings.module'
import { DeparturesModule } from './departures/departures.module'
import { PickupModule } from './pickup/pickup.module'
import { TravellersModule } from './travellers/travellers.module'
import { ReviewsModule } from './reviews/reviews.module'
import { EnquiriesModule } from './enquiries/enquiries.module'
import { AdminModule } from './admin/admin.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['../../.env', '.env'] }),
    DbModule,
    HealthModule,
    AuthModule,
    PackagesModule,
    BookingsModule,
    DeparturesModule,
    PickupModule,
    TravellersModule,
    ReviewsModule,
    EnquiriesModule,
    AdminModule,
  ],
})
export class AppModule {}
