import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common'
import { BookingsService } from './bookings.service'
import { CurrentUser } from '@wtt/auth'
import { InitiateBookingDto } from './dto/initiate-booking.dto'

@Controller('bookings')
export class BookingsController {
  constructor(private svc: BookingsService) {}

  @Post('initiate')
  async initiate(@CurrentUser() user: any, @Body() dto: InitiateBookingDto): Promise<any> {
    return this.svc.initiate(user.id, dto)
  }

  @Post('confirm')
  async confirm(@Body() body: { bookingId: string; razorpayPaymentId: string }): Promise<any> {
    return this.svc.confirm(body.bookingId, body.razorpayPaymentId)
  }

  // Alias used by the web app and the standard test: GET /bookings/my-bookings
  @Get('my-bookings')
  async myBookings(@CurrentUser() user: any): Promise<any[]> {
    return this.svc.findByUser(user.id)
  }

  @Get()
  async list(@CurrentUser() user: any): Promise<any[]> {
    return this.svc.findByUser(user.id)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: any): Promise<any> {
    return this.svc.findById(id, user.id)
  }

  @Put(':id/cancel')
  async cancel(@Param('id') id: string, @CurrentUser() user: any): Promise<any> {
    return this.svc.cancel(id, user.id)
  }
}
