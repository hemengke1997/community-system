import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#13C2C2',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  title: '社区服务系统',
  pwa: false,
  iconfontUrl: '',
  menu: {
    locale: false,
  },
  logo: '/favicon.jpg',
  headerHeight: 48,
  footerRender: false,
};

export default Settings;
