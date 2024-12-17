import { NextRequest, NextResponse } from 'next/server'
import { getSession } from './lib/auth/session'
import { absoluteUrl } from './utils/absolute-url'
import { getLoginRoute } from './app/routes'

const publicRoutes = [getLoginRoute()]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route))

  try {
    const session = await getSession()
    const isAuthenticated = session?.userId != undefined

    if (!isPublicRoute && !isAuthenticated) {
      console.log("Middleware: Usuário não autenticado, redirecionando para a página de login")
      return NextResponse.redirect(absoluteUrl(getLoginRoute()))
    }
  } catch (error) {
    console.error("Erro ao obter sessão:", error)
    return NextResponse.redirect(absoluteUrl(getLoginRoute()))
  }

  console.log("Middleware: Usuário autenticado. Seguindo para", path)
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|public|.*\\.png$|.*\\.ico$|.*\\.svg$).*)'],
}
