import React, { useImperativeHandle, useState } from 'react';

import { Modal, Space } from 'antd';

export type ViewReasonModalType = {
  show: (props: anyObject) => void;
};

const ViewReasonModal: React.ForwardRefRenderFunction<ViewReasonModalType> = (_, ref) => {
  useImperativeHandle(ref, () => ({
    show(props) {
      setProps(props);
      setVisible(true);
      console.log(props);
    },
  }));

  const [visible, setVisible] = useState<boolean>(false);
  const [props, setProps] = useState<anyObject>();

  const onOk = () => {
    setVisible(false);
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <Modal title="查看申诉理由" destroyOnClose visible={visible} onOk={onOk} onCancel={onCancel}>
      <Space>
        <span>理由：</span>
        <span>{props?.reason}</span>
      </Space>
    </Modal>
  );
};

export default React.forwardRef(ViewReasonModal);
