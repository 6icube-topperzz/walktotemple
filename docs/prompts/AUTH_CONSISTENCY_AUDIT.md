# Auth Guard Consistency Verification
## Run in EACH platform Claude Code window
## Goal: verify all 4 platforms match cb-platform pattern

---

## PASTE THIS IN EACH PLATFORM WINDOW

```
You are in [platform folder].

Read and audit these files and answer each question:

─────────────────────────────────────────────────
AUDIT 1: src/app.module.ts
─────────────────────────────────────────────────
Check and report:
  1. Is ConfigModule.forRoot({ isGlobal: true }) present?
  2. Is JwtModule.register({ global: true, secret: process.env.JWT_SECRET }) present?
  3. Is APP_GUARD → JwtAuthGuard registered as a provider?
  4. Are there any duplicate imports of JwtModule?
  5. Are there any leftover PassportModule imports?
  6. Are there any leftover JwtStrategy imports?

─────────────────────────────────────────────────
AUDIT 2: src/main.ts
─────────────────────────────────────────────────
Check and report:
  1. Is app.use(cookieParser()) present?
  2. Is cookie-parser imported at the top?
  3. Is there a global prefix set? (e.g. app.setGlobalPrefix('api'))
  4. Is versioning enabled? (enableVersioning)
  5. What port does it listen on?

─────────────────────────────────────────────────
AUDIT 3: src/auth/auth.guard.ts
─────────────────────────────────────────────────
Check and report:
  1. Does it import JwtService from @nestjs/jwt?
  2. Does it import Reflector from @nestjs/core?
  3. Does it import ConfigService from @nestjs/config?
  4. Does it reference any non-existent TokenService?
     If yes → remove that dependency immediately
  5. Does it check for @Public() decorator to opt out?
  6. Does it read token from Authorization: Bearer header?
  7. Does it read token from access_token cookie as fallback?
  8. Does it attach user to req.user with these fields:
       id, email, role, app_id, session_id?

─────────────────────────────────────────────────
AUDIT 4: src/auth/public.decorator.ts
─────────────────────────────────────────────────
Check and report:
  1. Does this file exist?
  2. Does it export: const Public = () => SetMetadata('isPublic', true)
  If missing → create it now

─────────────────────────────────────────────────
AUDIT 5: src/auth/roles.guard.ts
─────────────────────────────────────────────────
Check and report:
  1. Does this file exist?
  2. Does it export Roles decorator?
  3. Does it export RolesGuard class?
  4. Does it use Reflector to read roles metadata?
  If missing → create it from this content:

    import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
    import { Reflector } from '@nestjs/core'
    import { SetMetadata } from '@nestjs/common'

    export const ROLES_KEY = 'roles'
    export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles)

    @Injectable()
    export class RolesGuard implements CanActivate {
      constructor(private reflector: Reflector) {}
      canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
          context.getHandler(), context.getClass()
        ])
        if (!requiredRoles || requiredRoles.length === 0) return true
        const { user } = context.switchToHttp().getRequest()
        if (!user) throw new ForbiddenException('Authentication required')
        if (!requiredRoles.includes(user.role)) {
          throw new ForbiddenException(`Access denied. Required: ${requiredRoles.join(' or ')}`)
        }
        return true
      }
    }

─────────────────────────────────────────────────
AUDIT 6: src/auth/current-user.decorator.ts
─────────────────────────────────────────────────
Check and report:
  1. Does this file exist?
  2. Does it export CurrentUser decorator?
  3. Does it extract req.user correctly?
  If missing → create it:

    import { createParamDecorator, ExecutionContext } from '@nestjs/common'
    export const CurrentUser = createParamDecorator(
      (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        return request.user
      }
    )

─────────────────────────────────────────────────
AUDIT 7: .env file
─────────────────────────────────────────────────
Check and report:
  1. Is JWT_SECRET present and non-empty?
  2. Is there only ONE JWT_SECRET entry (no duplicates)?
  3. Is AUTH_SERVICE_URL=http://localhost:4001/api/v1 present?
  4. Are there any other duplicate keys?
  If duplicates found → remove them, keep last occurrence

─────────────────────────────────────────────────
AUDIT 8: tsconfig.json
─────────────────────────────────────────────────
Check and report:
  1. Is "esModuleInterop": true present?
  If missing → add it (required for cookieParser import)

─────────────────────────────────────────────────
AUDIT 9: Controllers — @Public() usage
─────────────────────────────────────────────────
Check all controller files and report:
  1. Which routes are marked @Public()?
  2. Are browse/listing routes correctly marked @Public()?
     e.g. GET /packages, GET /products → should be @Public()
  3. Are user-specific routes correctly protected (no @Public())?
     e.g. GET /my-bookings, GET /my-orders → should NOT be @Public()
  4. Is @Public() imported from the correct path in each controller?
     Should be: import { Public } from '../auth/public.decorator'

─────────────────────────────────────────────────
FIX EVERYTHING FOUND
─────────────────────────────────────────────────
After the audit:
  1. Fix all issues found
  2. Remove any dead code or unused imports
  3. Run: pnpm run build
     Must show: zero TypeScript errors

─────────────────────────────────────────────────
FINAL VERIFICATION
─────────────────────────────────────────────────
After clean build, run these curl tests:

For cb-platform (port 4007):
  curl http://localhost:4007/api/v1/products
  → Should be 200 (public route)

  curl http://localhost:4007/api/v1/orders/my-orders
  → Should be 401 (protected route)

  curl http://localhost:4007/api/v1/orders/my-orders \
    -H "Authorization: Bearer <token_from_login>"
  → Should be 200 (auth works)

For wtt-platform (port 4008):
  curl http://localhost:4008/api/v1/packages
  → 200 (public)

  curl http://localhost:4008/api/v1/bookings/my-bookings
  → 401 (protected)

For travenzz-platform (port 4009):
  curl http://localhost:4009/api/v1/packages
  → 200 (public)

  curl http://localhost:4009/api/v1/bookings/my-trips
  → 401 (protected)

For talenzz-platform (port 4006):
  curl http://localhost:4006/api/v1/jobs
  → 200 (public)

  curl http://localhost:4006/api/v1/profiles/me
  → 401 (protected)

─────────────────────────────────────────────────
REPORT FORMAT
─────────────────────────────────────────────────
After all checks and fixes, report back with:

Platform: [name]
Port: [port]
──────────────────────
app.module.ts:    ✅/❌ [what was fixed]
main.ts:          ✅/❌ [what was fixed]
auth.guard.ts:    ✅/❌ [what was fixed]
public.decorator: ✅/❌ [existed/created]
roles.guard:      ✅/❌ [existed/created]
current-user:     ✅/❌ [existed/created]
.env:             ✅/❌ [duplicates removed?]
tsconfig:         ✅/❌ [esModuleInterop added?]
controllers:      ✅/❌ [@Public() correct?]
Build:            ✅ zero errors / ❌ [errors]
401 test:         ✅/❌
200 test:         ✅/❌
──────────────────────
Overall: ✅ Consistent with cb-platform / ❌ Issues remain
```
