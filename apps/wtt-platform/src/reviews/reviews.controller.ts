import { Controller, Post, Body } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { CurrentUser } from '@wtt/auth'

@Controller('reviews')
export class ReviewsController {
  constructor(private svc: ReviewsService) {}

  @Post()
  async create(@CurrentUser() user: any, @Body() body: any): Promise<any[]> {
    return this.svc.create(user.id, body)
  }
}
