import React from 'react';
import { Affix, Card, Avatar, Typography } from 'antd';
import {
  HomeOutlined,
  ManOutlined,
  WhatsAppOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

import styles from './index.module.less';
import { Link as UmiLink } from 'umi';
import { getUserInfo } from '@/utils';

const { Text, Title } = Typography;

const UserInfo: React.FC = () => {
  const userInfo = getUserInfo();

  return (
    <Affix offsetTop={72}>
      <Card
        extra={
          <UmiLink to="/user/uc/setting">
            <SettingOutlined />
          </UmiLink>
        }
        title="个人信息"
      >
        <div className={styles.info}>
          <Avatar
            size={128}
            style={{ backgroundColor: '#87d068' }}
            icon={<UserOutlined />}
          ></Avatar>
          <div style={{ marginTop: 8 }}></div>
          <Title level={4} keyboard>
            {userInfo.nickname}
          </Title>
        </div>
        <div style={{ paddingLeft: 8, width: '100%' }}>
          <div className={styles.description} style={{ marginTop: 16 }}>
            <UserOutlined  className={styles.infoIcon} />
            <Text style={{ flex: 1 }}>{userInfo.age}岁</Text>
          </div>
          <div className={styles.description}>
            <HomeOutlined className={styles.infoIcon} />
            <Text style={{ flex: 1 }}>{userInfo.address}</Text>
          </div>
          <div className={styles.description}>
            <ManOutlined className={styles.infoIcon} />
            <Text>{userInfo.sex === '0' ? '男' : '女'}</Text>
          </div>
          <div className={styles.description}>
            <WhatsAppOutlined className={styles.infoIcon} />
            <Text>{userInfo.tel}</Text>
          </div>
        </div>
      </Card>
    </Affix>
  );
};

export default UserInfo;
