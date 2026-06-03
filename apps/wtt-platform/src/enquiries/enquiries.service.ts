import { Injectable, Inject } from '@nestjs/common'
import { DB_TOKEN } from '../db/db.module'
import { Db, enquiries } from '@wtt/contracts'

@Injectable()
export class EnquiriesService {
  constructor(@Inject(DB_TOKEN) private db: Db) {}

  async create(data: typeof enquiries.$inferInsert): Promise<any[]> {
    return this.db.insert(enquiries).values(data).returning()
  }

  async findAll(): Promise<any[]> {
    return this.db.query.enquiries.findMany({ orderBy: (t, { desc }) => [desc(t.createdAt)] })
  }
}
