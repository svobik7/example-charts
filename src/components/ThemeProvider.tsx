import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from '@ant-design/cssinjs';
import { ConfigProvider, type ThemeConfig } from 'antd';
import type { PropsWithChildren } from 'react';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#599b8f',
  },
  components: {
    Layout: {
      colorBgHeader: '#fff',
    },
    Button: {
      lineWidth: 0,
    },
    Badge: {
      paddingXS: 4,
      fontSizeSM: 10,
    },
  },
};

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <StyleProvider
      transformers={[legacyLogicalPropertiesTransformer]}
      ssrInline={true}
    >
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </StyleProvider>
  );
}
