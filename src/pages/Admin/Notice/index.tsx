import React, { useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SortOrder } from 'antd/es/table/interface';
import { getNoticeList, deleteNotice } from '@/api/admin';
import { Button, message, Popconfirm, Space, Image } from 'antd';
import EditNoticeModal, { EditNoticeModalType } from './components/EditNoticeModal';

const Notice: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const editNoticeRef = useRef<EditNoticeModalType>(null);

  const loadData = async (
    params: any,
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[]>,
  ) => {
    const res = await getNoticeList({
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
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '标题',
      dataIndex: 'title',
      align: 'center',
    },
    {
      title: '内容',
      dataIndex: 'text',
      align: 'center',
    },
    {
      title: '图片',
      dataIndex: 'pic',
      align: 'center',
      width: 120,
      render: (_, record) => (
        <Image src={record.pic} style={{ height: 40, objectFit: 'contain' }}></Image>
      ),
    },
    {
      title: '确认公告人数',
      dataIndex: 'num',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() =>
                editNoticeRef.current?.show({
                  id: record.id,
                  reload: actionRef.current?.reload!,
                })
              }
            >
              修改
            </Button>
            <Popconfirm title="确认删除公告？" onConfirm={() => handleDeleteNotice([record.id])}>
              <Button size="small">删除</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const handleDeleteNotice = (ids: number[]) => {
    deleteNotice(ids).then((res) => {
      if (res.code === 200) {
        message.success('删除公告成功');
        actionRef.current?.reload();
      } else {
        message.error(res.msg);
      }
    });
  };

  return (
    <>
      <ProTable
        headerTitle="公告列表"
        rowKey="id"
        search={false}
        actionRef={actionRef}
        options={false}
        columns={columns}
        request={loadData}
        toolbar={{
          actions: [
            <Button
              type="primary"
              onClick={() => editNoticeRef.current?.show({ reload: actionRef.current?.reload! })}
            >
              新增公告
            </Button>,
          ],
        }}
      ></ProTable>
      <EditNoticeModal ref={editNoticeRef} />
    </>
  );
};

export default Notice;
