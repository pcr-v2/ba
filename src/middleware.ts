import { jwtVerify, SignJWT } from "jose";
import { JWTExpired } from "jose/errors";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  BA_ACCESS_TOKEN_KEY,
  BA_REFRESH_TOKEN_KEY,
  DOMAIN_URL,
  PUBLIC_PATHS,
  REFRESH_TOKEN_EXPIRATION_TIME,
} from "@/config/config";
import { TOKEN_SECRET } from "@/config/server";

export default async function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname;
  const isPublic = PUBLIC_PATHS.some((path) => pathName.startsWith(path));

  if (!isPublic) {
    const accessToken = req.cookies.get(BA_ACCESS_TOKEN_KEY);
    const refreshToken = req.cookies.get(BA_REFRESH_TOKEN_KEY);

    if (accessToken.value == null) {
      return NextResponse.redirect(`${DOMAIN_URL}`);
    }

    try {
      await jwtVerify(accessToken.value, TOKEN_SECRET);
    } catch (error) {
      if (error instanceof JWTExpired && refreshToken?.value == null) {
        try {
          const verified = await jwtVerify(refreshToken.value, TOKEN_SECRET);

          const newAccessToken = await new SignJWT(verified.payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime(ACCESS_TOKEN_EXPIRATION_TIME)
            .sign(TOKEN_SECRET);

          const newRefreshToken = await new SignJWT(verified.payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime(REFRESH_TOKEN_EXPIRATION_TIME)
            .sign(TOKEN_SECRET);

          req.cookies.set(BA_ACCESS_TOKEN_KEY, newAccessToken);
          req.cookies.set(BA_REFRESH_TOKEN_KEY, newRefreshToken);

          const res = NextResponse.next({ request: req });
          res.cookies.set(BA_ACCESS_TOKEN_KEY, newAccessToken);
          res.cookies.set(BA_REFRESH_TOKEN_KEY, newRefreshToken);

          return res;
        } catch (error) {
          return NextResponse.redirect(`${DOMAIN_URL}`);
        }
      } else {
        return NextResponse.redirect(`${DOMAIN_URL}`);
      }
    }
  }
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|site.webmanifest|favicon/|v2/alive).*)",
  ],
};
