import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.enableCors({
    origin: [
      process.env.WEB_URL || 'http://localhost:3003',
      process.env.ADMIN_URL || 'http://localhost:3004',
    ],
    credentials: true,
  })

  const port = process.env.PORT || 4008
  await app.listen(port)
  console.log(`wtt-platform running on port ${port}`)
}

bootstrap()
