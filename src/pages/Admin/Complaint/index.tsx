import React, { useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SortOrder } from 'antd/es/table/interface';
import { getComplainList, updateComplain, deleteComplain } from '@/api/admin';
import { Button, message, Popconfirm, Space, Typography } from 'antd';

const { Paragraph } = Typography;

const Complaint: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const loadData = async (
    params: any,
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[]>,
  ) => {
    const res = await getComplainList({
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
      message.error(res.msg || '获取投诉列表出错');
      return {
        success: false,
      };
    }
  };

  const columns: ProColumns<any>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '用户名',
      dataIndex: 'nickname',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '投诉类型',
      dataIndex: 'type',
      align: 'center',
    },
    {
      title: '投诉内容',
      dataIndex: 'text',
      align: 'center',
      width: 200,
      render: (text) => {
        return <Paragraph ellipsis={{ rows: 1, tooltip: text }}>{text}</Paragraph>;
      },
    },
    {
      title: '投诉状态',
      align: 'center',
      dataIndex: 'status',
      valueEnum: {
        '0': {
          text: '投诉中',
          status: 'Processing',
        },
        '1': {
          text: '通过投诉',
          status: 'Success',
        },
        '2': {
          text: '驳回投诉',
          status: 'Warning',
        },
        '3': {
          text: '用户取消投诉',
          status: 'Default',
        },
      },
    },
    {
      title: '操作',
      align: 'center',
      render: (_, record) => {
        return (
          <Space>
            <Popconfirm title="确认通过投诉？" onConfirm={() => _updateComplain(record.id, 1)}>
              <Button size="small" type="primary" disabled={Number(record.status) !== 0}>
                通过投诉
              </Button>
            </Popconfirm>
            <Popconfirm title="确认驳回投诉？" onConfirm={() => _updateComplain(record.id, 2)}>
              <Button size="small" disabled={Number(record.status) !== 0} type="dashed">
                驳回投诉
              </Button>
            </Popconfirm>
            <Popconfirm title="确认删除投诉？" onConfirm={() => _deleteComplain([record.id])}>
              <Button size="small">删除投诉</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const _updateComplain = (id: number, status: number) => {
    updateComplain({ id, status }).then((res) => {
      if (res.code === 200) {
        message.success('操作成功');
        actionRef.current?.reload();
      } else {
        message.error(res.msg);
      }
    });
  };

  const _deleteComplain = (ids: number[]) => {
    deleteComplain(ids).then((res) => {
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
      headerTitle="投诉列表"
      rowKey="id"
      search={false}
      actionRef={actionRef}
      options={false}
      columns={columns}
      request={loadData}
    ></ProTable>
  );
};

export default Complaint;
