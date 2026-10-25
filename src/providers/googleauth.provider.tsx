
"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import type { ReactNode } from "react";

export default function GoogleAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  // const clientId = 385201233796-t2jreupa3lugje7t4atpvsbq29hs4rct.apps.googleusercontent.com

  // if (!clientId) {
  //   console.error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID");
  //   return <>{children}</>;
  // }

  return (
    <GoogleOAuthProvider clientId="385201233796-t2jreupa3lugje7t4atpvsbq29hs4rct.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
}
