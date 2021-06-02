import React, { useImperativeHandle, useState } from 'react';
import { Modal, Form, Input, message, Select, InputNumber, Cascader } from 'antd';

import { getUserInfo } from '@/api/admin';
import { CascaderOptionType, CascaderValueType } from 'antd/lib/cascader';
import { getHouse, updateUser } from '@/api/user';

type propsType = {
  id: number;
  reload: () => void;
};

export type EditUserModalType = {
  show: (props: propsType) => void;
};

interface Option {
  value: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
}

const EditUserModal: React.ForwardRefRenderFunction<EditUserModalType> = (_, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const [userInfo, setUserInfo] = useState<anyObject>({});

  const [loading, setLoading] = useState<boolean>(false);

  const [address, setAddress] = useState<string>();

  const [house, setHouse] = useState<Option[]>([]);

  const [props, setProps] = useState<propsType>();

  useImperativeHandle(ref, () => ({
    show(props) {
      _getUserInfo(props.id);
      _getHouse();
      setProps(props);
      setVisible(true);
    },
  }));

  const _getUserInfo = (id: number) => {
    getUserInfo({ id }).then((res) => {
      if (res.code === 200) {
        const { data } = res;
        setUserInfo(data);
        form.setFieldsValue({
          age: data.age,
          sex: data.sex,
          name: data.nickname,
          phone: data.tel,
          address: data.addressId?.split(',').map((item: string) => Number(item)),
        });
      } else {
        message.error(res.msg || '获取用户信息失败');
      }
    });
  };

  const _getHouse = () => {
    getHouse().then((res) => {
      if (res.code === 200) {
        const { data } = res;
        if (Array.isArray(data)) {
          setHouse(data);
        } else {
          setHouse([]);
        }
      } else {
        message.error(res.msg || '获取房屋失败');
      }
    });
  };

  const onHouseChange = (
    _: CascaderValueType,
    selectedOptions: CascaderOptionType[] | undefined,
  ) => {
    let _address = '';
    selectedOptions?.forEach((item) => {
      _address += item.name;
    });
    setAddress(_address);
  };

  const onOk = () => {
    form.validateFields().then((res) => {
      setLoading(true);
      // 调用接口
      updateUser({
        id: userInfo.id,
        age: res.age,
        sex: res.sex,
        nickname: res.name,
        tel: res.phone,
        addressId: res.address,
        address,
      }).then((apiRes) => {
        if (apiRes.code === 200) {
          message.success('修改成功');
          props?.reload();
          onCancel();
        } else {
          message.error('修改用户信息失败');
          setLoading(false);
        }
      });
    });
  };

  const onCancel = () => {
    setVisible(false);
    setLoading(false);
  };

  const afterClose = () => {
    form.resetFields();
  };

  return (
    <Modal
      title="修改用户信息"
      destroyOnClose
      visible={visible}
      onOk={onOk}
      okButtonProps={{ loading }}
      onCancel={onCancel}
      afterClose={afterClose}
    >
      <Form layout="horizontal" form={form} labelCol={{ span: 4 }}>
        <Form.Item
          label="姓名"
          required
          rules={[{ required: true, message: '请填写姓名' }]}
          name="name"
          initialValue={userInfo.name}
        >
          <Input maxLength={4} placeholder="真实姓名"></Input>
        </Form.Item>
        <Form.Item
          label="性别"
          required
          name="sex"
          rules={[{ required: true, message: '请选择性别' }]}
          initialValue={userInfo.sex}
        >
          <Select placeholder="性别">
            <Select.Option value="0">男</Select.Option>
            <Select.Option value="1">女</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="年龄"
          required
          name="age"
          initialValue={userInfo.age}
          rules={[{ required: true, message: '请输入年龄' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} placeholder="年龄"></InputNumber>
        </Form.Item>
        <Form.Item
          label="居住地址"
          name="address"
          rules={[
            {
              required: true,
              message: '请填写居住地址',
            },
          ]}
          initialValue={userInfo.addressId?.split(',')}
        >
          <Cascader
            onChange={onHouseChange}
            options={house}
            fieldNames={{
              label: 'name',
              value: 'id',
            }}
            placeholder="居住地址"
          />
        </Form.Item>
        <Form.Item
          label="手机号"
          required
          validateFirst
          name="phone"
          initialValue={userInfo.phone}
          rules={[
            { required: true, message: '请输入手机号' },
            {
              validator: async (_, value: string) => {
                if (
                  !value.match(
                    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
                  )
                ) {
                  return Promise.reject(new Error('请输入正确的手机号'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input maxLength={11} placeholder="手机号"></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(EditUserModal);
