import React from 'react';
import { Result as AntdResult, Button } from 'antd';
import { history } from 'umi';

const Result: React.FC = () => {
  const goUserComplaint = () => {
    history.push('/user/uc?tab=2');
  };
  return (
    <AntdResult
      status="success"
      title="投诉成功"
      subTitle="我们会尽快对您的投诉进行处理，请稍等"
      extra={[
        <Button type="primary" onClick={goUserComplaint} key="goUserComplaint">
          前往我的投诉
        </Button>,
      ]}
    ></AntdResult>
  );
};

export default Result;
