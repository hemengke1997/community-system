import React from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Menu, message } from 'antd';
import { history } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/api/login';
import { isEmpty } from 'lodash';
import { getUserInfo } from '@/utils';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC = () => {
  const userInfo = getUserInfo()

  /**
   * 退出登录，返回首页
   */
  const loginOut = async () => {
    outLogin().then(async (res) => {
      if (res.msg === 'success') {
        // 退出成功
        message.success('退出登录成功');
        localStorage.removeItem('CS-userInfo');
        localStorage.removeItem('CS-token');
        const t = setTimeout(() => {
          history.push('/login');
          clearTimeout(t);
        });
      } else {
        message.error(res.msg || '登出失败');
      }
    });
  };

  const onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;
    if (key === 'logout' && userInfo) {
      loginOut();
    }
  };

  const loginButton = (
    <Button size="small" type="primary" onClick={() => history.push('/login')}>
      登录
    </Button>
  );

  if (isEmpty(userInfo)) {
    return loginButton;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} icon={<UserOutlined />} alt="avatar" />
        <span className={styles.anticon}>{userInfo?.username}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
