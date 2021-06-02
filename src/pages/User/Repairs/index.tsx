import React, { useState } from 'react';
import { Card, Steps } from 'antd';
import FillInfo from './components/FillInfo';
import Result from './components/Result';

import styles from './index.module.less';

export type setCurrentStepType = React.Dispatch<React.SetStateAction<number>>;
export type setFormDataType = React.Dispatch<React.SetStateAction<anyObject>>;

const Repairs: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const stepComponent = () => {
    switch (currentStep) {
      case 0:
        return <FillInfo setCurrentStep={setCurrentStep} />;
      case 1:
        return <Result />;

      default:
        return <></>;
    }
  };

  return (
    <Card style={{ height: '100%' }}>
      <Steps current={currentStep} className={styles.step}>
        <Steps.Step title="填写维修信息"></Steps.Step>
        <Steps.Step title="完成"></Steps.Step>
      </Steps>

      {stepComponent()}
    </Card>
  );
};

export default Repairs;
