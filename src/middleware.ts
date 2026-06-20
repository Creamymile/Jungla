import { NextRequest, NextResponse } from 'next/server'

/**
 * Pre-launch Basic Auth gate.
 *
 * Locks the entire site behind a username/password prompt while the client
 * reviews work-in-progress. Crawlers (Google etc.) cannot authenticate, so the
 * site is effectively invisible to search until launch.
 *
 * Go-live: set DISABLE_PREVIEW_AUTH=true in Vercel and redeploy.
 */
export function middleware(req: NextRequest) {
  // Always allow local dev
  if (process.env.NODE_ENV === 'development') return NextResponse.next()

  // Go-live escape hatch — flip this env var to make the site public
  if (process.env.DISABLE_PREVIEW_AUTH === 'true') return NextResponse.next()

  const user = process.env.PREVIEW_AUTH_USER
  const pass = process.env.PREVIEW_AUTH_PASS

  // Misconfiguration safety net: if creds aren't set in prod, treat as locked
  // (return 503 rather than accidentally open the site).
  if (!user || !pass) {
    return new NextResponse('Service unavailable', { status: 503 })
  }

  const authHeader = req.headers.get('authorization')
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ')
    if (scheme === 'Basic' && encoded) {
      const decoded = Buffer.from(encoded, 'base64').toString()
      const idx = decoded.indexOf(':')
      const submittedUser = decoded.slice(0, idx)
      const submittedPass = decoded.slice(idx + 1)
      if (submittedUser === user && submittedPass === pass) {
        return NextResponse.next()
      }
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Jungla Preview"' },
  })
}

export const config = {
  /**
   * Run on every page request EXCEPT:
   *  - Next.js static assets (_next/static, _next/image)
   *  - favicon and PWA icon
   *  - /api/revalidate (Sanity webhook needs unauthenticated access — it has
   *    its own secret-based auth)
   */
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|api/revalidate).*)'],
}
