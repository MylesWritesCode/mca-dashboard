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
    <div className="h-[calc(100vh-72px)]">
      <Header logo="/logo.png" />
      <Layout menuItems={MENU_ITEMS} contentClassName="main-content">
        {children}
      </Layout>
    </div>
  );
}
