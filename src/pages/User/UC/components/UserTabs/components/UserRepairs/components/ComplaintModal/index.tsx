import React, { useImperativeHandle, useState } from 'react';
import { Modal, Steps } from 'antd';
import FillInfo from './components/FillInfo';
import Result from './components/Result';

export type setCurrentStepType = React.Dispatch<React.SetStateAction<number>>;
export type setFormDataType = React.Dispatch<React.SetStateAction<anyObject>>;

export type ComplaintModalProp = {
  id?: number;
  reload?: () => void;
};

export type ComplaintModalType = {
  show: (props: ComplaintModalProp) => void;
};

const ComplaintModal: React.ForwardRefRenderFunction<ComplaintModalType> = (_, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [props, setProps] = useState<ComplaintModalProp>({})

  useImperativeHandle(ref, () => {
    return {
      show(props) {
        setProps(props)
        setVisible(true);
      },
    };
  });

  const stepComponent = () => {
    switch (currentStep) {
      case 0:
        return (
          <FillInfo setCurrentStep={setCurrentStep} {...props} />
        );
      case 1:
        return <Result />;

      default:
        return <></>;
    }
  };

  const onCancel = () => {
    setVisible(false);
    setCurrentStep(0);
  };

  return (
    <Modal destroyOnClose visible={visible} title="报修投诉" footer={null} onCancel={onCancel}>
      <Steps current={currentStep} style={{ maxWidth: 400, margin: '0 auto 32px' }}>
        <Steps.Step title="填写投诉理由"></Steps.Step>
        <Steps.Step title="完成"></Steps.Step>
      </Steps>

      {stepComponent()}
    </Modal>
  );
};

export default React.forwardRef(ComplaintModal);
