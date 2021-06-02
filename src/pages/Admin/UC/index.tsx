import React, { useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { message, Space, Button, Popconfirm } from 'antd';
import { getUserList, deleteUser } from '@/api/admin';
import { useMount } from 'ahooks';
import { SortOrder } from 'antd/es/table/interface';
import EditUserModal, { EditUserModalType } from './components/EditUserModal';

const UC: React.FC = () => {
  const ref = useRef<ActionType>();

  const editUserRef = useRef<EditUserModalType>(null);

  useMount(() => {});

  const columns: ProColumns<anyObject>[] = [
    {
      title: '登录名',
      dataIndex: 'username',
      align: 'center',
    },
    {
      title: '用户名',
      dataIndex: 'nickname',
      align: 'center',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '手机号',
      dataIndex: 'tel',
      align: 'center',
    },
    {
      title: '地址',
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      valueType: 'text',
      align: 'center',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      valueType: 'text',
      render: (text) => {
        switch (text) {
          case '0':
            return '男';
          case '1':
            return '女';

          default:
            return text;
        }
      },
    },
    {
      title: '权限',
      dataIndex: 'roleId',
      align: 'center',
      render: (_, record) => {
        const { roleId } = record;
        if (roleId === 1) {
          return '管理员';
        }
        if (roleId === 2) {
          return '普通用户';
        }
        return '未知用户';
      },
    },
    {
      title: '操作',
      align: 'center',
      fixed: 'right',
      render: (_, record) => {
        return (
          <Space>
            <Button size="small" type="primary" onClick={() => openModal(record.id)}>
              修改
            </Button>
            <Popconfirm title="确认删除用户？" onConfirm={() => handleDeleteUser([record.id])}>
              <Button size="small">删除</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const openModal = (id: number) => {
    editUserRef.current?.show({
      id,
      reload: ref.current?.reload!
    });
  };

  const handleDeleteUser = (ids: number[]) => {
    deleteUser(ids).then((res) => {
      if (res.code === 200) {
        message.success('删除成功');
        ref.current?.reload();
      } else {
        message.error('删除失败');
      }
    });
  };

  const loadData = async (
    params: any,
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[]>,
  ) => {
    const res = await getUserList({
      page: params.current,
      size: params.pageSize,
    });
    if (res.code === 200) {
      const { data } = res;

      return {
        data: data.records,
        success: true,
        total: data.total,
      };
    } else {
      message.error(res.msg || '获取用户列表出错');
      return {
        success: false,
      };
    }
  };

  return (
    <div>
      <ProTable
        headerTitle="用户列表"
        rowKey="id"
        search={false}
        actionRef={ref}
        options={false}
        columns={columns}
        request={loadData}
      ></ProTable>
      <EditUserModal ref={editUserRef} />
    </div>
  );
};

export default UC;
