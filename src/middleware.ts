import { NextRequest, NextResponse } from 'next/server'
import { getSession } from './lib/auth/session'
import { absoluteUrl } from './utils/absolute-url'
import { getHomeRoute, getLoginRoute, getStudentsRoute } from './app/routes'

const publicRoutes = [getLoginRoute()]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route))

  try {
    const session = await getSession()
    const isAuthenticated = session?.userId != undefined

    if (isAuthenticated && path === getLoginRoute()) {
      return NextResponse.redirect(absoluteUrl(getStudentsRoute()))
    } else if (!isPublicRoute && !isAuthenticated) {
      return NextResponse.redirect(absoluteUrl(getLoginRoute()))
    } else if (path === "/" || path === getHomeRoute()) {
      return NextResponse.redirect(absoluteUrl(getStudentsRoute()))
    }
  } catch (error) {
    console.error("Erro ao obter sessão:", error)
    return NextResponse.redirect(absoluteUrl(getLoginRoute()))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|public|.*\\.png$|.*\\.ico$|.*\\.svg$).*)'],
}
