import React, { useEffect, useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Space,
  message,
  Row,
  Col,
  Select,
  InputNumber,
  Cascader,
} from 'antd';

import { history } from 'umi';
import { getHouse, updateUser, getUser } from '@/api/user';
import { getUserInfo } from '@/utils';
import { CascaderOptionType, CascaderValueType } from 'antd/lib/cascader';

interface Option {
  value: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
}

const UserSetting: React.FC = () => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [house, setHouse] = useState<Option[]>([]);

  const [address, setAddress] = useState<string>();

  const userInfo = getUserInfo();

  useEffect(() => {
    getHouse().then((res) => {
      if (res.code === 200) {
        const { data } = res;
        if (Array.isArray(data)) {
          setHouse(data);
        } else {
          setHouse([]);
        }

        // 获取个人信息
        getUser({ id: userInfo.id }).then((userRes) => {
          if (userRes.code === 200) {
            const { data } = userRes;
            form.setFieldsValue({
              age: data.age,
              sex: data.sex,
              name: data.nickname,
              phone: data.tel,
              address: data.addressId?.split(',').map((item: string) => Number(item)),
            });
          }
        });
      } else {
        message.error(res.msg || '获取房屋失败');
      }
    });
  }, []);

  const goUC = () => {
    history.push('/user/uc');
  };

  const handleEditInfo = () => {
    form.validateFields().then((res) => {
      console.log(res);
      setSubmitLoading(true);
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
          getUser({ id: userInfo.id }).then((userRes) => {
            if (userRes.code === 200) {
              message.success('修改成功，返回用户中心...');
              const newUserInfo = {
                ...userInfo,
                ...userRes.data,
              };
              localStorage.setItem('CS-userInfo', JSON.stringify(newUserInfo));
              const t = setTimeout(() => {
                setSubmitLoading(false);
                clearTimeout(t);
                goUC();
              }, 500);
            }
          });
        } else {
          message.error('修改用户信息失败');
        }
      });
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

  return (
    <Card title="修改个人信息">
      <Row gutter={64} justify="space-around">
        <Col span={12}>
          <Form layout="vertical" form={form}>
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
            <Form.Item>
              <Space>
                <Button onClick={goUC}>取消</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleEditInfo}
                  loading={submitLoading}
                >
                  确认
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default UserSetting;
