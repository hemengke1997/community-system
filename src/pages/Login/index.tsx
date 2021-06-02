import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message, Tabs, Typography, Form } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Link, history, useModel } from 'umi';
import { login } from '@/api/login';

import styles from './index.module.less';

const { Text, Link: TyLink } = Typography;

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm<anyObject>();
  const { refresh } = useModel('@@initialState');
  // 点击登录
  const handleSubmit = async (values: any) => {
    setSubmitting(true);

    try {
      // 登录
      const res = await login({
        loginName: values.username,
        password: values.password,
      });
      if (res.code === 200) {
        message.success('登录成功');

        localStorage.setItem('CS-userInfo', JSON.stringify(res.data.userInfo));
        localStorage.setItem('CS-token', JSON.stringify(res.data.token));
        await refresh();
        const t = setTimeout(() => {
          history.push('/');
          clearTimeout(t);
        });
        return;
      } else {
        message.error(res.msg);
      }
      console.log(res, 'res');
    } catch (error) {
      message.error('登录失败，请重试！');
    }

    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <span className={styles.title}>社区管理系统</span>
            </Link>
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
              searchConfig: {
                submitText: '登录',
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values);
            }}
            form={form}
          >
            <Tabs>
              <Tabs.TabPane tab={<Text>账号密码登录</Text>} />
            </Tabs>

            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'用户名: 账号 or admin'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码: 密码 or admin'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>

            <div style={{ marginBottom: 16, textAlign: 'center' }}>
              <TyLink onClick={() => history.push('/register')}>没有账号？立即注册</TyLink>
            </div>
          </ProForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
