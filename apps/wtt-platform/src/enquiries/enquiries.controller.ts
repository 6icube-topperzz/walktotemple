import { Controller, Post, Body } from '@nestjs/common'
import { EnquiriesService } from './enquiries.service'
import { Public } from '@wtt/auth'

@Controller('enquiries')
export class EnquiriesController {
  constructor(private svc: EnquiriesService) {}

  @Public()
  @Post()
  async create(@Body() body: any): Promise<any[]> {
    return this.svc.create(body)
  }
}
