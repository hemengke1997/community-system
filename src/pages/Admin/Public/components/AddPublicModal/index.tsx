import React, { useEffect, useImperativeHandle, useState } from 'react';
import { getPublic, updatePublic, savePublic } from '@/api/admin';

import { Modal, Form, Upload, Button, Input, message } from 'antd';
import { useUpdate } from 'ahooks';
import { getToken } from '@/utils';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';

type AddPublicModalProp = {
  id?: number;
  reload: () => void;
};

export type AddPublicModalType = {
  show: (props: AddPublicModalProp) => void;
};

const AddPublicModal: React.ForwardRefRenderFunction<AddPublicModalType> = (_, ref) => {
  useImperativeHandle(ref, () => ({
    show(props) {
      setVisible(true);
      setProps(props);
    },
  }));

  const update = useUpdate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const [visible, setVisible] = useState<boolean>(false);
  const [props, setProps] = useState<AddPublicModalProp>();

  useEffect(() => {
    if (props?.id && visible) {
      getPublic({ id: props.id }).then((res) => {
        if (res.code === 200) {
          const { data } = res;
          let fileList: UploadFile<any>[] = [];
          if (data.pic) {
            fileList = [
              {
                uid: '-1',
                name: '公告图片',
                status: 'done',
                url: data.pic || '',
                thumbUrl: data.pic || '',
              },
            ] as UploadFile<any>[];
          }

          form.setFieldsValue({
            name: data.name,
            pic: fileList,
          });

          update();
        } else {
          message.error(res.msg || '获取公告信息失败');
        }
      });
    }
  }, [visible, props?.id]);

  const api = async (formRes: any) => {
    const params = {
      pic: formRes.pic[0]?.response?.data?.path,
      name: formRes.name,
    };
    if (props?.id) {
      // 更新
      const res = await updatePublic({
        id: props.id,
        ...params,
      });
      return res;
    } else {
      // 新增
      const res = await savePublic({
        ...params,
      });
      return res;
    }
  };

  const onOk = () => {
    form.validateFields().then(async (formRes) => {
      setLoading(true);

      const res = await api(formRes);
      if (res.code === 200) {
        message.success('操作成功');
        props?.reload();
        onCancel();
      } else {
        message.error(res.msg);
      }
      setLoading(false);
    });
  };

  const onCancel = () => {
    setVisible(false);
  };

  const afterClose = () => {
    form.resetFields();
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onChange = () => {
    update();
  };

  return (
    <Modal
      title="设备管理"
      visible={visible}
      destroyOnClose
      forceRender
      onOk={onOk}
      onCancel={onCancel}
      afterClose={afterClose}
      okButtonProps={{ loading }}
    >
      <Form form={form} labelCol={{ span: 4 }}>
        <Form.Item
          label="设备名"
          required
          name="name"
          rules={[
            {
              required: true,
              message: '请输入设备名',
            },
          ]}
        >
          <Input placeholder="请输入设备名" maxLength={20}></Input>
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
              message: '请上传公告图片',
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
            onChange={onChange}
          >
            {form.getFieldValue('pic') && form.getFieldValue('pic').length ? null : (
              <Button icon={<UploadOutlined />}>选择图片</Button>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(AddPublicModal);
