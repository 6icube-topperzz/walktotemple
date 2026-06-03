import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DB_TOKEN } from '../db/db.module'
import { Db, packages, bookings, enquiries, departureDates, itineraryDays, pickupPoints } from '@wtt/contracts'

interface Stats {
  totalBookingsThisMonth: number
  revenueThisMonth: number
  pendingEnquiries: number
  totalBookings: number
}

@Injectable()
export class AdminService {
  constructor(@Inject(DB_TOKEN) private db: Db) {}

  // Packages
  async findAllPackages(): Promise<any[]> {
    return this.db.query.packages.findMany({ orderBy: (t, { desc }) => [desc(t.createdAt)] })
  }

  async createPackage(data: typeof packages.$inferInsert): Promise<any[]> {
    return this.db.insert(packages).values(data).returning()
  }

  async updatePackage(id: string, data: Partial<typeof packages.$inferInsert>): Promise<any> {
    const [updated] = await this.db.update(packages).set(data).where(eq(packages.id, id)).returning()
    if (!updated) throw new NotFoundException('Package not found')
    return updated
  }

  async deletePackage(id: string): Promise<any[]> {
    return this.db.update(packages).set({ isActive: false }).where(eq(packages.id, id)).returning()
  }

  // Itinerary
  async addItineraryDay(data: typeof itineraryDays.$inferInsert): Promise<any[]> {
    return this.db.insert(itineraryDays).values(data).returning()
  }

  async findItinerary(packageId: string): Promise<any[]> {
    return this.db.query.itineraryDays.findMany({
      where: eq(itineraryDays.packageId, packageId),
      orderBy: (t, { asc }) => [asc(t.dayNumber)],
    })
  }

  // Departures
  async createDeparture(data: typeof departureDates.$inferInsert): Promise<any[]> {
    return this.db.insert(departureDates).values(data).returning()
  }

  async updateDeparture(id: string, data: Partial<typeof departureDates.$inferInsert>): Promise<any[]> {
    return this.db.update(departureDates).set(data).where(eq(departureDates.id, id)).returning()
  }

  // Pickup points
  async addPickupPoint(data: typeof pickupPoints.$inferInsert): Promise<any[]> {
    return this.db.insert(pickupPoints).values(data).returning()
  }

  // Bookings
  async findAllBookings(): Promise<any[]> {
    return this.db.query.bookings.findMany({ orderBy: (t, { desc }) => [desc(t.createdAt)] })
  }

  // Enquiries
  async findAllEnquiries(): Promise<any[]> {
    return this.db.query.enquiries.findMany({ orderBy: (t, { desc }) => [desc(t.createdAt)] })
  }

  // Stats
  async getStats(): Promise<Stats> {
    const allBookings = await this.db.query.bookings.findMany()
    const allEnquiries = await this.db.query.enquiries.findMany()
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const monthlyBookings = allBookings.filter(
      (b) => b.createdAt && new Date(b.createdAt) >= startOfMonth,
    )
    const monthlyRevenue = monthlyBookings.reduce(
      (sum, b) => sum + parseFloat(b.totalAmount ?? '0'),
      0,
    )

    return {
      totalBookingsThisMonth: monthlyBookings.length,
      revenueThisMonth: monthlyRevenue,
      pendingEnquiries: allEnquiries.filter((e) => e.status === 'new').length,
      totalBookings: allBookings.length,
    }
  }
}
