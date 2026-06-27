import { auth } from "@/lib/auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const role = (req.auth?.user as any)?.role

  const isAuthPage = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/signup")
  
  if (isAuthPage) {
    if (isLoggedIn) {
      return Response.redirect(new URL(`/${role || "student"}`, nextUrl))
    }
    return
  }

  const isProtectedRoute = nextUrl.pathname.startsWith("/admin") || 
                           nextUrl.pathname.startsWith("/warden") || 
                           nextUrl.pathname.startsWith("/student")

  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL("/login", nextUrl))
  }

  // Role based protection
  if (isLoggedIn && nextUrl.pathname.startsWith("/admin") && role !== "admin") {
    return Response.redirect(new URL(`/${role || "login"}`, nextUrl))
  }
  if (isLoggedIn && nextUrl.pathname.startsWith("/warden") && role !== "warden") {
    return Response.redirect(new URL(`/${role || "login"}`, nextUrl))
  }
  if (isLoggedIn && nextUrl.pathname.startsWith("/student") && role !== "student") {
    return Response.redirect(new URL(`/${role || "login"}`, nextUrl))
  }

  return
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
