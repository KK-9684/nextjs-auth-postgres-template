import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <div className="flex-grow h-100">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
