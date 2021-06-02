import React, { useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import { ComplaintModalProp, setCurrentStepType } from '../../index';
import { complain } from '@/api/user';

type FillInfoType = {
  setCurrentStep: setCurrentStepType;
} & ComplaintModalProp;

const Options = [
  {
    label: '报修',
    value: '报修',
  },
];

const FillInfo: React.FC<FillInfoType> = (props) => {
  const { setCurrentStep, id, reload } = props;

  const [form] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false);

  const onValidateForm = () => {
    if (loading) return;
    form.validateFields().then(async (formRes) => {
      setLoading(true);
      const res = await complain({
        repairId: id,
        text: formRes.content,
        type: formRes.type,
      });
      if (res.code === 200) {
        setLoading(false);
        reload?.();
        setCurrentStep(1);
      } else {
        setLoading(false);
        message.error(res.msg || '申诉失败');
      }
    });
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      validateMessages={{ required: '${label}必填' }}
      labelCol={{ span: 5 }}
    >
      <Form.Item label="投诉类型" initialValue={Options[0].value} name="type">
        <Select>
          {Options.map((item, index) => (
            <Select.Option key={index} value={item.value}>
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
