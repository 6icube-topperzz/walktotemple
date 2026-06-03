import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { AdminService } from './admin.service'
import { Roles } from '@wtt/auth'

@Controller('admin')
@Roles('admin')
export class AdminController {
  constructor(private svc: AdminService) {}

  @Get('stats')
  async stats(): Promise<any> { return this.svc.getStats() }

  // Packages
  @Get('packages')
  async packages(): Promise<any[]> { return this.svc.findAllPackages() }

  @Post('packages')
  async createPackage(@Body() body: any): Promise<any[]> { return this.svc.createPackage(body) }

  @Put('packages/:id')
  async updatePackage(@Param('id') id: string, @Body() body: any): Promise<any> { return this.svc.updatePackage(id, body) }

  @Delete('packages/:id')
  async deletePackage(@Param('id') id: string): Promise<any[]> { return this.svc.deletePackage(id) }

  // Itinerary
  @Post('packages/:id/itinerary')
  async addItinerary(@Param('id') packageId: string, @Body() body: any): Promise<any[]> {
    return this.svc.addItineraryDay({ ...body, packageId })
  }

  @Get('packages/:id/itinerary')
  async getItinerary(@Param('id') packageId: string): Promise<any[]> {
    return this.svc.findItinerary(packageId)
  }

  // Departures
  @Post('departures')
  async createDeparture(@Body() body: any): Promise<any[]> { return this.svc.createDeparture(body) }

  @Put('departures/:id')
  async updateDeparture(@Param('id') id: string, @Body() body: any): Promise<any[]> { return this.svc.updateDeparture(id, body) }

  // Pickup points
  @Post('packages/:id/pickups')
  async addPickup(@Param('id') packageId: string, @Body() body: any): Promise<any[]> {
    return this.svc.addPickupPoint({ ...body, packageId })
  }

  // Bookings
  @Get('bookings')
  async bookings(): Promise<any[]> { return this.svc.findAllBookings() }

  // Enquiries
  @Get('enquiries')
  async enquiries(): Promise<any[]> { return this.svc.findAllEnquiries() }
}
