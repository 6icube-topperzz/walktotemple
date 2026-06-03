import { Controller, Get } from '@nestjs/common'
import { Public } from '@wtt/auth'

@Controller('health')
export class HealthController {
  @Public()
  @Get()
  check() {
    return { status: 'healthy', service: 'wtt-platform', ts: new Date().toISOString() }
  }
}
