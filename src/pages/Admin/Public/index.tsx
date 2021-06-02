import React, { useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Popconfirm, Image, Space } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import { getPublicList, deletePublic } from '@/api/admin';
import AddPublicModal, { AddPublicModalType } from './components/AddPublicModal';

const Public: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const addPublicRef = useRef<AddPublicModalType>(null);

  const loadData = async (
    params: any,
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[]>,
  ) => {
    const res = await getPublicList({
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
      valueType: 'dateTime',
      align: 'center',
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '设备图片',
      dataIndex: 'pic',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Image src={record.pic} style={{ height: 40, objectFit: 'contain' }} />
      ),
    },
    {
      title: '操作',
      align: 'center',
      render: (_, record) => {
        return (
          <Space>
            <Button type="primary" size="small">
              修改设备
            </Button>
            <Popconfirm title="确认删除设备？" onConfirm={() => handleDeletePublic([record.id])}>
              <Button size="small">删除设备</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const handleDeletePublic = (ids: number[]) => {
    deletePublic(ids).then((res) => {
      if (res.code === 200) {
        message.success('删除成功');
        actionRef.current?.reload();
      } else {
        message.error(res.msg);
      }
    });
  };

  return (
    <>
      <ProTable
        headerTitle="用户列表"
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
              onClick={() => addPublicRef.current?.show({ reload: actionRef.current?.reload! })}
            >
              新增公共设备
            </Button>,
          ],
        }}
      ></ProTable>
      <AddPublicModal ref={addPublicRef} />
    </>
  );
};

export default Public;
