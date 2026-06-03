import { Injectable, Inject } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DB_TOKEN } from '../db/db.module'
import { Db, pickupPoints } from '@wtt/contracts'

@Injectable()
export class PickupService {
  constructor(@Inject(DB_TOKEN) private db: Db) {}

  async create(data: typeof pickupPoints.$inferInsert): Promise<any[]> {
    return this.db.insert(pickupPoints).values(data).returning()
  }

  async findByPackage(packageId: string): Promise<any[]> {
    return this.db.query.pickupPoints.findMany({ where: eq(pickupPoints.packageId, packageId) })
  }

  async remove(id: string): Promise<any[]> {
    return this.db.delete(pickupPoints).where(eq(pickupPoints.id, id)).returning()
  }
}
