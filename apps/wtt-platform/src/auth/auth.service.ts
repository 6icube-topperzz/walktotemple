import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Inject } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import * as bcrypt from 'bcryptjs'
import { DB_TOKEN } from '../db/db.module'
import { Db, users } from '@wtt/contracts'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

interface AuthResponse {
  token: string
  user: { id: string; email: string; role: string | null }
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(DB_TOKEN) private db: Db,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existing = await this.db.query.users.findFirst({
      where: eq(users.email, dto.email),
    })
    if (existing) throw new ConflictException('Email already registered')

    const passwordHash = await bcrypt.hash(dto.password, 12)
    const [user] = await this.db
      .insert(users)
      .values({ email: dto.email, mobile: dto.mobile, fullName: dto.fullName, passwordHash })
      .returning()

    return this.issueToken(user)
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, dto.email),
    })
    if (!user || !user.passwordHash) throw new UnauthorizedException('Invalid credentials')

    const valid = await bcrypt.compare(dto.password, user.passwordHash)
    if (!valid) throw new UnauthorizedException('Invalid credentials')

    return this.issueToken(user)
  }

  private issueToken(user: { id: string; email: string; role: string | null }): AuthResponse {
    const token = this.jwt.sign({ sub: user.id, email: user.email, role: user.role })
    return { token, user: { id: user.id, email: user.email, role: user.role } }
  }
}
