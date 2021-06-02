import React from 'react';
import { Button, Result as AntdResult } from 'antd';
import { history } from 'umi'

const Result: React.FC = () => {

  const goUserRepairs = () => {
    history.push('/user/uc?tab=0')
  }
  return (
    <AntdResult
      status="success"
      title="操作成功"
      subTitle="维修师傅会与您主动联系，请保持手机畅通"
      extra={[
        <Button type='primary' onClick={goUserRepairs} key='goUserRepairs'>前往我的报修</Button>
      ]}
    ></AntdResult>
  );
};

export default Result;
