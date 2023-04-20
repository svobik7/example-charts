import type { ThemeConfig } from 'antd';

const COLORS = {
  brandGreen: 'rgba(89, 155, 143)',
};

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
