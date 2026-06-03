import { Module, Global } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createDb } from '@wtt/contracts'

export const DB_TOKEN = 'DRIZZLE_DB'

@Global()
@Module({
  providers: [
    {
      provide: DB_TOKEN,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('DATABASE_URL')
        if (!url) throw new Error('DATABASE_URL is required')
        return createDb(url)
      },
    },
  ],
  exports: [DB_TOKEN],
})
export class DbModule {}
