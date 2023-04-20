import { themeConfig } from '@/configs/themeConfig';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import { LayoutRoot } from '@/components/LayoutRoot/LayoutRoot';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={themeConfig}>
      <LayoutRoot>
        <Component {...pageProps} />
      </LayoutRoot>
    </ConfigProvider>
  );
}
