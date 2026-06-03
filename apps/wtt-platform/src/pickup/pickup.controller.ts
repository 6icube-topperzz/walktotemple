import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common'
import { PickupService } from './pickup.service'
import { Roles } from '@wtt/auth'

@Controller('pickup-points')
export class PickupController {
  constructor(private svc: PickupService) {}

  @Get('package/:id')
  async findByPackage(@Param('id') id: string): Promise<any[]> { return this.svc.findByPackage(id) }

  @Post()
  @Roles('admin')
  async create(@Body() body: any): Promise<any[]> { return this.svc.create(body) }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string): Promise<any[]> { return this.svc.remove(id) }
}
