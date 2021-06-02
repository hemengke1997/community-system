import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import defaultSettings from '../config/defaultSettings';
import { isEmpty } from 'lodash';
import { message } from 'antd';
import { getUserInfo } from './utils';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitStateProps> {
  return {
    settings: defaultSettings,
  };
}

export type InitStateProps = {
  settings?: Partial<LayoutSettings>;
};

// https://umijs.org/zh-CN/plugins/plugin-layout
export const layout = ({
  initialState,
}: // setInitialState,
{
  initialState: InitStateProps;
  setInitialState: (state: InitStateProps) => void;
}) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    onPageChange: () => {
      const userInfo = getUserInfo();
      const {
        location: { pathname },
      } = history;
      // 非登录状态下，跳转到登录页面
      if (pathname !== '/login' && pathname !== '/register' && isEmpty(userInfo)) {
        message.info('请先登录哦亲~');
        history.push('/login');
      } else if (
        !userInfo.tel &&
        userInfo.roleName === 'user' &&
        pathname !== '/user/uc/setting'
      ) {
        // 已登录且未完善个人信息的用户
        message.info('请完善个人信息');
        history.push('/user/uc/setting');
      }
    },
    disableMobile: true,
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
