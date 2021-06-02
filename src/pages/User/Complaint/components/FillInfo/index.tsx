import React, { useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import { setCurrentStepType } from '../../index';
import { saveComplain } from '@/api/user';

import styles from './index.module.less';

type FillInfoType = {
  setCurrentStep: setCurrentStepType;
};

const Options = [
  {
    label: '物业',
  },
  {
    label: '邻居',
  },
  {
    label: '公共设备',
  },
  {
    label: '报修',
  },
];

const FillInfo: React.FC<FillInfoType> = (props) => {
  const { setCurrentStep } = props;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onValidateForm = () => {
    if (loading) return;
    form.validateFields().then((formRes) => {
      setLoading(true);
      saveComplain({
        status: 0,
        text: formRes.content,
        type: formRes.type,
      }).then((res) => {
        if (res.code === 200) {
          setLoading(false);
          message.success('投诉成功');
          setCurrentStep(1);
        } else {
          setLoading(false);
          message.error(res.msg || '申诉失败');
        }
      });
    });
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      validateMessages={{ required: '${label}必填' }}
      labelCol={{ span: 5 }}
      className={styles.form}
    >
      <Form.Item label="投诉类型" initialValue={Options[0].label} name="type">
        <Select>
          {Options.map((item, index) => (
            <Select.Option key={index} value={item.label}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="投诉理由" required rules={[{ required: true }]} name="content">
        <Input.TextArea
          autoSize={{ minRows: 4, maxRows: 6 }}
          placeholder="请详情描述投诉理由"
        ></Input.TextArea>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button type="primary" htmlType="submit" onClick={onValidateForm}>
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FillInfo;
