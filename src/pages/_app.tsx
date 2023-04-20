import '@/styles/globals.css';

import { LayoutRoot } from '@/components/LayoutRoot/LayoutRoot';
import { themeConfig } from '@/configs/themeConfig';
import { trpc } from '@/utils/trpcUtils';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={themeConfig}>
      <LayoutRoot>
        <Component {...pageProps} />
      </LayoutRoot>
    </ConfigProvider>
  );
}

export default trpc.withTRPC(App);
