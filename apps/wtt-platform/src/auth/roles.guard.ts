import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { SetMetadata } from '@nestjs/common'

// ── DECORATOR ──────────────────────────────────
// Usage on any controller method:
//   @Roles('admin', 'super_admin')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Get('admin/dashboard')
//   async adminDashboard() { ... }

export const ROLES_KEY = 'roles'
export const Roles = (...roles: string[]) =>
  SetMetadata(ROLES_KEY, roles)

// ── GUARD ──────────────────────────────────────
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get required roles from @Roles() decorator
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    )

    // No @Roles() decorator = any authenticated user can access
    if (!requiredRoles || requiredRoles.length === 0) return true

    const { user } = context.switchToHttp().getRequest()

    if (!user) {
      throw new ForbiddenException('Authentication required')
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        `Access denied. Required: ${requiredRoles.join(' or ')}. Your role: ${user.role}`
      )
    }

    return true
  }
}

// ── AVAILABLE ROLES ────────────────────────────
// customer      → regular user (CB, WTT, TRZ, TAL)
// vendor        → CB home chef / TRZ guide / WTT vendor
// admin         → app-level admin (can manage one app)
// super_admin   → platform-level admin (can manage all apps)
// guide         → TRZ local guide
// recruiter     → TAL recruiter

// ── COMMON USAGE PATTERNS ─────────────────────
// Customer dashboard:
//   @Roles('customer', 'vendor', 'admin', 'super_admin')
//   (any logged-in user)
//
// Vendor panel:
//   @Roles('vendor', 'admin', 'super_admin')
//
// Admin panel:
//   @Roles('admin', 'super_admin')
//
// Super admin only:
//   @Roles('super_admin')
