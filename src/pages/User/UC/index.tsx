import React from 'react';
import { Row, Col } from 'antd';
import UserInfo from './components/UserInfo';
import UesrTabs from './components/UserTabs';

const UC: React.FC = () => {
  return (
    <Row gutter={32}>
      <Col span={6}>
        <UserInfo />
      </Col>
      <Col span={18}>
        <UesrTabs />
      </Col>
    </Row>
  );
};

export default UC;
