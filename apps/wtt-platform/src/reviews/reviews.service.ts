import { Injectable, Inject } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DB_TOKEN } from '../db/db.module'
import { Db, reviews } from '@wtt/contracts'

@Injectable()
export class ReviewsService {
  constructor(@Inject(DB_TOKEN) private db: Db) {}

  async create(userId: string, data: any): Promise<any[]> {
    return this.db.insert(reviews).values({ ...data, userId }).returning()
  }

  async findAll(): Promise<any[]> {
    return this.db.query.reviews.findMany({ orderBy: (t, { desc }) => [desc(t.createdAt)] })
  }
}
