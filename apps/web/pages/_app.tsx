import { SessionProvider, useSession } from "next-auth/react";

import { Header } from "@/../../packages/ui/components/Header";
import { Layout } from "ui";

import { MENU_ITEMS } from "../config";
import "../styles/global.scss";

import { HEADER_CONFIG } from "@/config/HeaderConfig";

export default function App({ Component, pageProps, session }: any) {
  return (
    <SessionProvider session={session}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </SessionProvider>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="h-[calc(100vh-72px)]">
      <Header logo="/logo.png" links={HEADER_CONFIG[session ? "signedIn" : "signedOut"]} />
      {session ? (
        <Layout menuItems={MENU_ITEMS} sx={{ background: "var(--pewter-blue)" }}>
          {children}
        </Layout>
      ) : (
        <div className="h-full">{children}</div>
      )}
    </div>
  );
}
