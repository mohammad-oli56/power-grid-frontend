import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname


    const accessToken = request.cookies.get('accessToken')?.value

    // if (pathname === '/login') {
    //     return NextResponse.next()
    // }


    // if (!accessToken) {
    //     return NextResponse.redirect(new URL('/login', request.url))
    // }

    // return NextResponse.next()


}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}