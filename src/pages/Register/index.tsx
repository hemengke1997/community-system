import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Form, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { register } from '@/api/user';
import { history } from 'umi';

import styles from './index.module.less';

const Register: React.FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    const { username, password } = values;
    setSubmitting(true);
    register({
      loginName: username,
      password,
    })
      .then((res) => {
        if (res.msg === 'success') {
          message.success('注册成功...请登录');
          setTimeout(() => {
            history.push('/login');
          }, 1000);
        } else {
          message.error(res.msg);
        }
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <span className={styles.title}>账号注册</span>
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
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
                submitText: '注册',
              },
            }}
            form={form}
            onFinish={async (values) => {
              handleSubmit(values);
            }}
            name="register"
            scrollToFirstError
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请输入用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名~',
                },
              ]}
            ></ProFormText>
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请输入密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码~',
                },
              ]}
            />
            <ProFormText.Password
              name="comfirm"
              hasFeedback
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              dependencies={['password']}
              placeholder={'请再次输入密码'}
              validateTrigger={['onBlur']}
              rules={[
                {
                  required: true,
                  message: '请输入密码~',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次输入的密码不一致哦~');
                  },
                }),
              ]}
            />
          </ProForm>
        </div>
      </div>
    </div>
  );
};

export default Register;
