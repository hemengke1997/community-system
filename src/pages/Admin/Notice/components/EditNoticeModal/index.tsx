import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Modal, Form, Input, Upload, Button, message } from 'antd';
import { getToken } from '@/utils';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';
import { getNotice, updateNotice, addNotice } from '@/api/admin';
import { useUpdate } from 'ahooks';

type EditNoticeModalProp = {
  id?: number;
  reload: () => void;
};

export type EditNoticeModalType = {
  show: (props: EditNoticeModalProp) => void;
};

const EditNoticeModal: React.ForwardRefRenderFunction<EditNoticeModalType> = (_, ref) => {
  useImperativeHandle(ref, () => ({
    show(props) {
      setVisible(true);
      setProps(props);
    },
  }));

  const update = useUpdate();

  const [visible, setVisible] = useState<boolean>(false);
  const [props, setProps] = useState<EditNoticeModalProp>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (props?.id && visible) {
      getNotice({ id: props.id }).then((res) => {
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
            title: data.title,
            text: data.text,
            pic: fileList,
          });

          update();
        } else {
          message.error(res.msg || '获取公告信息失败');
        }
      });
    }
  }, [visible, props?.id]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const api = async (formRes: any) => {
    const params = {
      pic: formRes.pic[0]?.response?.data?.path,
      text: formRes.text,
      title: formRes.title,
    };
    if (props?.id) {
      // 更新
      const res = await updateNotice({
        id: props.id,
        ...params,
      });
      return res;
    } else {
      // 新增
      const res = await addNotice({
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

  return (
    <Modal
      visible={visible}
      title="公告管理"
      destroyOnClose
      forceRender
      onOk={onOk}
      onCancel={onCancel}
      afterClose={afterClose}
      okButtonProps={{ loading }}
    >
      <Form form={form} labelCol={{ span: 4 }}>
        <Form.Item
          label="标题"
          required
          name="title"
          rules={[
            {
              required: true,
              message: '请输入公告标题',
            },
          ]}
        >
          <Input placeholder="请输入标题" maxLength={20}></Input>
        </Form.Item>
        <Form.Item
          label="内容"
          required
          name="text"
          rules={[
            {
              required: true,
              message: '请输入公告内容',
            },
          ]}
        >
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            showCount
            placeholder="请输入内容"
            maxLength={100}
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

export default React.forwardRef(EditNoticeModal);
