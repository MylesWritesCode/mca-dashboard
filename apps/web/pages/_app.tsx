import { MENU_ITEMS } from "../config";

import { Layout } from "ui/components/Layout";

interface WebProps {
  Component: React.ComponentType;
  pageProps: any;
}

export default function App({ Component, pageProps }: WebProps) {
  return (
    <Layout menuItems={MENU_ITEMS}>
      <Component {...pageProps} />
    </Layout>
  );
}
