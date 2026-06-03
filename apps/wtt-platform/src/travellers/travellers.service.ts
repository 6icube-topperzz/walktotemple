import { Injectable, Inject } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DB_TOKEN } from '../db/db.module'
import { Db, travellers } from '@wtt/contracts'

@Injectable()
export class TravellersService {
  constructor(@Inject(DB_TOKEN) private db: Db) {}

  async findByBooking(bookingId: string): Promise<any[]> {
    return this.db.query.travellers.findMany({ where: eq(travellers.bookingId, bookingId) })
  }
}
