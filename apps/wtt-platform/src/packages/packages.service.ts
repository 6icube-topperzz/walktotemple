import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { eq, and } from 'drizzle-orm'
import { DB_TOKEN } from '../db/db.module'
import { Db, packages, itineraryDays, departureDates, pickupPoints, reviews } from '@wtt/contracts'

@Injectable()
export class PackagesService {
  constructor(@Inject(DB_TOKEN) private db: Db) {}

  async findAll(_region?: string): Promise<any[]> {
    return this.db.query.packages.findMany({
      where: eq(packages.isActive, true),
    })
  }

  async findFeatured(): Promise<any[]> {
    return this.db.query.packages.findMany({
      where: and(eq(packages.isActive, true), eq(packages.isFeatured, true)),
    })
  }

  async findBySlug(slug: string): Promise<any> {
    const pkg = await this.db.query.packages.findFirst({
      where: and(eq(packages.slug, slug), eq(packages.isActive, true)),
    })
    if (!pkg) throw new NotFoundException('Package not found')
    return pkg
  }

  async findItinerary(packageId: string): Promise<any[]> {
    return this.db.query.itineraryDays.findMany({
      where: eq(itineraryDays.packageId, packageId),
      orderBy: (t, { asc }) => [asc(t.dayNumber)],
    })
  }

  async findDepartures(packageId: string): Promise<any[]> {
    return this.db.query.departureDates.findMany({
      where: and(
        eq(departureDates.packageId, packageId),
        eq(departureDates.status, 'available'),
      ),
      orderBy: (t, { asc }) => [asc(t.departureDate)],
    })
  }

  async findPickupPoints(packageId: string): Promise<any[]> {
    return this.db.query.pickupPoints.findMany({
      where: eq(pickupPoints.packageId, packageId),
    })
  }

  async findReviews(packageId: string): Promise<any[]> {
    return this.db.query.reviews.findMany({
      where: eq(reviews.packageId, packageId),
      orderBy: (t, { desc }) => [desc(t.createdAt)],
    })
  }
}
