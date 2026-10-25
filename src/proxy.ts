import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const AUTH_ROUTE = ["/login", "/register","/verify-account"]
const PUBLIC_ROUTE = ["/", "/about", "/login", "/register", "/property", "/about", "/contact","/verify-account"]


export function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname


    const accessToken = request.cookies.get('accessToken')?.value

    const decodedToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null

    let userRoll = null;

    if (decodedToken) {
        userRoll = decodedToken.role
    }


    if (accessToken && AUTH_ROUTE.includes(pathname)) {
        if (userRoll === "ADMIN") {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        } else if (userRoll === "POWER_OPERATOR") {
            return NextResponse.redirect(new URL('/poweroperator-dashboard', request.url))
        }
        else if (userRoll === "TECHNICIAN") {
            return NextResponse.redirect(new URL('/technician-dashboard', request.url))
        }
        else if (userRoll === "CUSTOMER") {
            return NextResponse.redirect(new URL('/coustomer-dashboard', request.url))
        } else {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }


    const isPublic = PUBLIC_ROUTE.some(route => {
        return pathname === route || pathname.startsWith(route + "/")
    });


    if (!accessToken && !isPublic) {
        return NextResponse.redirect(new URL("/login", request.url));
    }


    if (pathname.startsWith("/admin-dashboard") && userRoll !== "ADMIN") {
        return NextResponse.redirect(new URL('/', request.url))
    } else if (pathname.startsWith("/poweroperator-dashboard") && userRoll !== "POWER_OPERATOR") {
        return NextResponse.redirect(new URL('/', request.url))
    }else if (pathname.startsWith("/technician-dashboard") && userRoll !== "TECHNICIAN") {
        return NextResponse.redirect(new URL('/', request.url))
    } else if (pathname.startsWith("/coustomer-dashboard") && userRoll !== "CUSTOMER") {
        return NextResponse.redirect(new URL('/', request.url))
    }

 return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}