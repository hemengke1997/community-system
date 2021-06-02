import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import UserRepairs from './components/UserRepairs';
import UserCost from './components/UserCost';
import UserComplaint from './components/UserComplaint';
import { useLocation } from 'umi';

import styles from './index.module.less';

type TabKey = 'repairs' | 'cost' | 'complain';

const UserTabs: React.FC = () => {
  const {
    // @ts-ignore
    query: { tab },
  } = useLocation();

  useEffect(() => {
    const t = Number(tab)
    switch (t) {
      case 0:
        setActiveTab('repairs');
        break;
      case 1:
        setActiveTab('cost');
        break;
      case 2:
        setActiveTab('complain');
        break;
      default:
        break;
    }
  }, [tab]);

  const [activeTab, setActiveTab] = useState<TabKey>('repairs');
  const tabList = [
    {
      key: 'repairs',
      tab: '我的报修',
    },
    {
      key: 'cost',
      tab: '我的费用',
    },
    {
      key: 'complain',
      tab: '我的投诉',
    },
  ];

  const tabContent: Record<TabKey, React.ReactNode> = {
    repairs: <UserRepairs />,
    cost: <UserCost />,
    complain: <UserComplaint />,
  };

  return (
    <Card
      tabList={tabList}
      activeTabKey={activeTab}
      onTabChange={(key) => setActiveTab(key as TabKey)}
      className={styles.card}
    >
      {tabContent[activeTab]}
    </Card>
  );
};

export default UserTabs;
