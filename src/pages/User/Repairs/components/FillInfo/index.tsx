import React, { useState } from 'react';
import { Button, Form, Input, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { setCurrentStepType } from '../../index';

import styles from './index.module.less';
import { getToken, getUserInfo } from '@/utils';
import { UploadChangeParam } from 'antd/lib/upload';
import { applyRepairs } from '@/api/user';

type FillInfoType = {
  setCurrentStep: setCurrentStepType;
};

const FillInfo: React.FC<FillInfoType> = (props) => {
  const { setCurrentStep } = props;

  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const [form] = Form.useForm();

  const onValidateForm = () => {
    form.validateFields().then((res) => {
      try {
        const { pic } = res;
        const { response } = pic[0];
        const { code, msg, data } = response;

        if (code === 200) {
          applyRepairs({
            pic: data.path,
            remark: res.content,
            thing: res.title,
            userId: getUserInfo().id,
          }).then((apiRes) => {
            if (apiRes.code === 200) {
              message.success('申请报修成功');
              setCurrentStep(1);
            } else {
              message.error('申请报修失败');
            }
          });
          console.log(res, '----!!');
        } else {
          message.error(msg);
        }
      } catch (err) {
        message.error('图片上传中...');
      }
    });
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onUploadChange: (info: UploadChangeParam) => void = (info) => {
    const { fileList } = info;
    if (fileList.length) {
      setUploadSuccess(true);
    } else {
      setUploadSuccess(false);
    }
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      validateMessages={{ required: '${label}必填' }}
      labelCol={{ span: 5 }}
      className={styles.form}
    >
      <Form.Item label="维修物品" required rules={[{ required: true }]} name="title">
        <Input placeholder="请输入维修物品，如水龙头"></Input>
      </Form.Item>
      <Form.Item label="维修信息" required rules={[{ required: true }]} name="content">
        <Input.TextArea
          autoSize={{ minRows: 3, maxRows: 5 }}
          placeholder="请大致描述物品的损坏情况，以便维修师傅携带必要的工具"
        ></Input.TextArea>
      </Form.Item>
      <Form.Item
        label="上传图片"
        required
        name="pic"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
          {
            required: true,
            message: '请上传报修图片',
          },
        ]}
      >
        <Upload
          name="file"
          accept=".png, .jpg, .jpeg"
          fileList={[]}
          action="http://49.234.108.236/community/file/upload"
          multiple={false}
          headers={{
            Authorization: getToken(),
          }}
          listType="picture"
          onChange={onUploadChange}
        >
          {uploadSuccess ? null : <Button icon={<UploadOutlined />}>选择图片</Button>}
        </Upload>
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
