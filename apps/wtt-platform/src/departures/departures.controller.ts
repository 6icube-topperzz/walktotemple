import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common'
import { DeparturesService } from './departures.service'
import { Roles } from '@wtt/auth'

@Controller('departures')
export class DeparturesController {
  constructor(private svc: DeparturesService) {}

  @Get()
  async findAll(): Promise<any[]> { return this.svc.findAll() }

  @Post()
  @Roles('admin')
  async create(@Body() body: any): Promise<any[]> { return this.svc.create(body) }

  @Put(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() body: any): Promise<any[]> { return this.svc.update(id, body) }
}
