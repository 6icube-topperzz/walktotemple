import { Controller, Get, Param, Query } from '@nestjs/common'
import { PackagesService } from './packages.service'
import { Public } from '@wtt/auth'

@Controller('packages')
export class PackagesController {
  constructor(private svc: PackagesService) {}

  @Public()
  @Get()
  async findAll(@Query('region') region?: string): Promise<any[]> {
    return this.svc.findAll(region)
  }

  @Public()
  @Get('featured')
  async featured(): Promise<any[]> {
    return this.svc.findFeatured()
  }

  @Public()
  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<any> {
    return this.svc.findBySlug(slug)
  }

  @Public()
  @Get(':slug/itinerary')
  async itinerary(@Param('slug') slug: string): Promise<any[]> {
    const pkg = await this.svc.findBySlug(slug)
    return this.svc.findItinerary(pkg.id)
  }

  @Public()
  @Get(':slug/departures')
  async departures(@Param('slug') slug: string): Promise<any[]> {
    const pkg = await this.svc.findBySlug(slug)
    return this.svc.findDepartures(pkg.id)
  }

  @Public()
  @Get(':slug/pickup-points')
  async pickupPoints(@Param('slug') slug: string): Promise<any[]> {
    const pkg = await this.svc.findBySlug(slug)
    return this.svc.findPickupPoints(pkg.id)
  }

  @Public()
  @Get(':slug/reviews')
  async reviews(@Param('slug') slug: string): Promise<any[]> {
    const pkg = await this.svc.findBySlug(slug)
    return this.svc.findReviews(pkg.id)
  }
}
