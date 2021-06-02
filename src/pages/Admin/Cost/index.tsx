import React, { useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import { getPayList, deletePay } from '@/api/admin';

const Cost: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const loadData = async (
    params: any,
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[]>,
  ) => {
    const res = await getPayList({
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
      message.error(res.msg || '获取费用列表出错');
      return {
        success: false,
      };
    }
  };

  const columns: ProColumns<anyObject>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '费用创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      align: 'center',
    },
    {
      title: '费用价格',
      dataIndex: 'price',
      valueType: 'money',
      align: 'center',
    },
    {
      title: '物品',
      dataIndex: 'thing',
      align: 'center',
    },
    {
      title: '内容',
      dataIndex: 'remark',
      align: 'center',
    },
    {
      title: '是否缴费',
      dataIndex: 'status',
      align: 'center',
      valueEnum: {
        0: {
          text: '未缴费',
          status: 'Warning',
        },
        1: {
          text: '已缴费',
          status: 'Success',
        },
      },
    },
    {
      title: '操作',
      align: 'center',
      render: (_, record) => {
        return (
          <Popconfirm title="确认删除费用？" onConfirm={() => handleDeletePay([record.id])}>
            <Button size="small">删除费用</Button>
          </Popconfirm>
        );
      },
    },
  ];

  const handleDeletePay = (ids: number[]) => {
    deletePay(ids).then((res) => {
      if (res.code === 200) {
        message.success('删除成功');
        actionRef.current?.reload();
      } else {
        message.error(res.msg);
      }
    });
  };

  return (
    <ProTable
      headerTitle="用户列表"
      rowKey="id"
      search={false}
      actionRef={actionRef}
      options={false}
      columns={columns}
      request={loadData}
    ></ProTable>
  );
};

export default Cost;
