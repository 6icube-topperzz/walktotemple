import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common'
import { eq, and } from 'drizzle-orm'
import { DB_TOKEN } from '../db/db.module'
import { Db, bookings, departureDates, travellers } from '@wtt/contracts'
import { InitiateBookingDto } from './dto/initiate-booking.dto'

function generateBookingNumber(): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `WTT-${ts}-${rand}`
}

@Injectable()
export class BookingsService {
  constructor(@Inject(DB_TOKEN) private db: Db) {}

  async initiate(userId: string, dto: InitiateBookingDto): Promise<any> {
    const departure = await this.db.query.departureDates.findFirst({
      where: eq(departureDates.id, dto.departureDateId),
    })
    if (!departure) throw new NotFoundException('Departure date not found')

    const available = departure.totalSeats - (departure.bookedSeats ?? 0)
    const requested = dto.adults + (dto.children ?? 0)
    if (requested > available) throw new BadRequestException('Not enough seats available')

    const price = departure.priceOverride ?? '0'
    const pricePerAdult = parseFloat(price || '0') || 0
    const subtotal = pricePerAdult * dto.adults
    const taxes = subtotal * 0.05
    const totalAmount = subtotal + taxes

    const [booking] = await this.db
      .insert(bookings)
      .values({
        bookingNumber: generateBookingNumber(),
        userId,
        packageId: departure.packageId!,
        departureDateId: dto.departureDateId,
        adults: dto.adults,
        children: dto.children ?? 0,
        pricePerAdult: pricePerAdult.toString(),
        subtotal: subtotal.toString(),
        taxes: taxes.toString(),
        totalAmount: totalAmount.toString(),
        contactName: dto.contactName,
        contactMobile: dto.contactMobile,
        contactEmail: dto.contactEmail,
        pickupPoint: dto.pickupPoint,
        specialRequirements: dto.specialRequirements,
        status: 'pending',
        paymentStatus: 'pending',
      })
      .returning()

    if (dto.travellers?.length) {
      await this.db.insert(travellers).values(
        dto.travellers.map((t) => ({ ...t, bookingId: booking.id })),
      )
    }

    return booking
  }

  async confirm(bookingId: string, razorpayPaymentId: string): Promise<any> {
    const booking = await this.db.query.bookings.findFirst({
      where: eq(bookings.id, bookingId),
    })
    if (!booking) throw new NotFoundException('Booking not found')

    const [updated] = await this.db
      .update(bookings)
      .set({ status: 'confirmed', paymentStatus: 'paid', razorpayPaymentId, confirmedAt: new Date() })
      .where(eq(bookings.id, bookingId))
      .returning()

    await this.db
      .update(departureDates)
      .set({ bookedSeats: (booking.adults ?? 0) + (booking.children ?? 0) })
      .where(eq(departureDates.id, booking.departureDateId!))

    return updated
  }

  async findByUser(userId: string): Promise<any[]> {
    return this.db.query.bookings.findMany({
      where: eq(bookings.userId, userId),
      orderBy: (t, { desc }) => [desc(t.createdAt)],
    })
  }

  async findById(id: string, userId: string): Promise<any> {
    const booking = await this.db.query.bookings.findFirst({
      where: and(eq(bookings.id, id), eq(bookings.userId, userId)),
    })
    if (!booking) throw new NotFoundException('Booking not found')
    return booking
  }

  async cancel(id: string, userId: string): Promise<any> {
    const booking = await this.findById(id, userId)
    if (booking.status === 'cancelled') throw new BadRequestException('Already cancelled')

    const [updated] = await this.db
      .update(bookings)
      .set({ status: 'cancelled', cancelledAt: new Date() })
      .where(eq(bookings.id, id))
      .returning()

    return updated
  }
}
