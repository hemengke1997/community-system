import React, { useImperativeHandle, useState } from 'react';
import { message, Modal } from 'antd';
import qrcode from './img/qrcode.jpg';
import { pay, payAll } from '@/api/user';

type PayProp = {
  id?: number;
  reload?: () => void;
};

export type PayModalType = {
  show: (props: PayProp) => void;
};

const PayModal: React.ForwardRefRenderFunction<PayModalType> = (_, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [props, setProps] = useState<PayProp>({});
  const [loading, setLoading] = useState<boolean>(false);

  useImperativeHandle(ref, () => {
    return {
      show(props) {
        setProps(props);
        setVisible(true);
      },
    };
  });

  const onOk = async () => {
    const { id, reload } = props;
    if (loading) return;
    setLoading(true);
    if (id) {
      // 调删除一个费用的接口
      const res = await pay({ id });
      if (res.code === 200) {
        message.success('缴费成功');
        reload?.();
      } else {
        message.error(res.msg || '缴费失败');
      }
    } else {
      // 调删除所有的接口
      const res = await payAll();
      if (res.code === 200) {
        message.success('缴费成功');
        reload?.();
      } else {
        message.error(res.msg || '缴费失败');
      }
    }
    setVisible(false);
    setLoading(false);
  };

  return (
    <Modal
      visible={visible}
      title="缴纳费用"
      onCancel={() => setVisible(false)}
      onOk={onOk}
      destroyOnClose
      okButtonProps={{ loading }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={qrcode} alt="收款二维码" style={{ height: 300 }}></img>
      </div>
    </Modal>
  );
};

export default React.forwardRef(PayModal);
