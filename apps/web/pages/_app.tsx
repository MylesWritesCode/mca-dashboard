import { Header } from "@/../../packages/ui/components/Header";
import { Layout } from "ui";

import { MENU_ITEMS } from "../config";
import "../styles/global.scss";

export default function App({ Component, pageProps, session }: any) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full bg-cover" style={{ backgroundImage: "url(/blob-scene-haikei.svg)" }}>
      <Header logo="/icons/logo.svg" />
      <Layout menuItems={MENU_ITEMS} contentClassName="main-content">
        {children}
      </Layout>
    </div>
  );
}
