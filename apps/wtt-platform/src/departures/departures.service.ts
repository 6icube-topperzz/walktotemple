import { Injectable, Inject } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DB_TOKEN } from '../db/db.module'
import { Db, departureDates } from '@wtt/contracts'

@Injectable()
export class DeparturesService {
  constructor(@Inject(DB_TOKEN) private db: Db) {}

  async create(data: typeof departureDates.$inferInsert): Promise<any[]> {
    return this.db.insert(departureDates).values(data).returning()
  }

  async findAll(): Promise<any[]> {
    return this.db.query.departureDates.findMany({
      orderBy: (t, { asc }) => [asc(t.departureDate)],
    })
  }

  async update(id: string, data: Partial<typeof departureDates.$inferInsert>): Promise<any[]> {
    return this.db.update(departureDates).set(data).where(eq(departureDates.id, id)).returning()
  }
}
