import '@/styles/globals.css';

import { LayoutRoot } from '@/components/LayoutRoot/LayoutRoot';
import { ThemeProvider } from '@/components/ThemeProvider';
import { trpc } from '@/utils/trpcUtils';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LayoutRoot>
        <Component {...pageProps} />
      </LayoutRoot>
    </ThemeProvider>
  );
}

export default trpc.withTRPC(App);
