import { NextRequest, NextResponse } from "next/server";

const MAIN_HOST = "haochinese.ru";

// 301: www.haochinese.ru -> haochinese.ru (склейка зеркал для SEO)
export default function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const hostname = host.split(":")[0].toLowerCase();

  if (hostname === `www.${MAIN_HOST}`) {
    const url = request.nextUrl.clone();
    url.host = MAIN_HOST;
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
