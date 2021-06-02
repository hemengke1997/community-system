import React, { useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { Button, Typography, Popconfirm, Image, message } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import { getRepairsList, updateStatus } from '@/api/user';
import ComplaintModal, { ComplaintModalType } from './components/ComplaintModal';
import { isNull, isUndefined } from 'lodash';

const { Paragraph } = Typography;

type TableParamType = {
  status: string;
} & anyObject;

const UserRepairs: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const complaintModalRef = useRef<ComplaintModalType>(null);

  const sortFn = (sortVal: SortOrder) => {
    if (isUndefined(sortVal) || isNull(sortVal)) {
      return '';
    }
    if (sortVal === 'ascend') {
      return 'ASC';
    }
    return 'DESC';
  };

  const loadData = async (
    params: TableParamType,
    sorter: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[]>,
  ) => {
    const res = await getRepairsList({
      page: params.current,
      size: params.pageSize,
      priceSortType: sortFn(sorter?.price),
      status: filter?.status?.[0] || '',
      timeSortType: sortFn(sorter?.createTime),
    });

    if (res.code === 200) {
      return {
        data: res.data.records,
        success: true,
        total: res.data.total,
      };
    }
    return {
      success: false,
    };
  };

  const handleComplaint = (id: number) => {
    complaintModalRef.current!.show({
      id,
      reload: actionRef.current?.reload,
    });
  };

  const _updateStatus = (id: number, status: number) => {
    updateStatus({ id, status }).then((res) => {
      if (res.code === 200) {
        message.success('操作成功');
        actionRef.current?.reload();
      } else {
        message.error(res.msg || '确认维修失败');
      }
    });
  };

  const mode = (record: any) => {
    const { status, id } = record;
    const t = {
      '0': (
        <Button disabled size="small">
          等待中
        </Button>
      ),
      '1': (
        <Popconfirm
          title="请业主确认维修情况~如有异议，可以申请投诉o~🎁"
          okText="俺确定了!"
          cancelText="我这就去检查!"
          placement="leftTop"
          onConfirm={() => _updateStatus(id, 2)}
        >
          <Button size="small">确认维修</Button>
        </Popconfirm>
      ),
      '2': (
        <Button size="small" onClick={() => handleComplaint(id)}>
          申请投诉
        </Button>
      ),
      '3': (
        <Popconfirm
          title="取消投诉就不能再申请投诉了o~🤕"
          okText="坚持取消🙂"
          cancelText="我再等等👌"
          placement="leftTop"
          onConfirm={() => _updateStatus(id, 4)}
        >
          <Button size="small">取消投诉</Button>
        </Popconfirm>
      ),
      '4': (
        <Button disabled size="small">
          已完结
        </Button>
      ),
    };

    return t[status];
  };

  const columns: ProColumns<any>[] = [
    {
      title: '报修物品',
      align: 'center',
      dataIndex: 'thing',
      render: (_, record) => (
        <Paragraph ellipsis={{ rows: 1, tooltip: record.thing }}>{record.thing ?? ''}</Paragraph>
      ),
      width: 120,
    },
    {
      title: '报修内容',
      align: 'center',
      dataIndex: 'remark',
      render: (_, record) => (
        <Paragraph ellipsis={{ rows: 2, tooltip: record.remark }}>{record.remark ?? ''}</Paragraph>
      ),
    },
    {
      title: '报修图片',
      dataIndex: 'pic',
      width: 100,
      render: (_, record) => {
        return <Image src={record.pic}></Image>;
      },
    },
    {
      title: '申请报修时间',
      dataIndex: 'createTime',
      align: 'center',
      sorter: true,
      width: 150,
      valueType: 'dateTime',
    },
    {
      title: '报修状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      align: 'center',
      width: 120,
      filterMultiple: false,
      valueEnum: {
        '0': {
          text: '申请报修中',
          status: 'Processing',
        },
        '1': {
          text: '待维修',
          status: 'Warning',
        },
        '2': {
          text: '已维修',
          status: 'Success',
        },
        '3': {
          text: '投诉中',
          status: 'Processing',
        },
        '4': {
          text: '已完结',
          status: 'Success',
        },
      },
    },
    {
      title: '费用',
      dataIndex: 'price',
      sorter: true,
      align: 'center',
      valueType: 'money',
      width: 120,
      render: (text, record) => {
        if (isNull(record.price)) {
          return '待通过';
        }
        return text;
      },
    },
    {
      title: '操作',
      dataIndex: '',
      align: 'center',
      width: 140,
      render: (_, record) => {
        return mode(record);
      },
    },
  ];

  return (
    <>
      <ProTable
        rowKey="id"
        actionRef={actionRef}
        options={false}
        search={false}
        columns={columns}
        bordered
        request={loadData}
      ></ProTable>
      <ComplaintModal ref={complaintModalRef} />
    </>
  );
};

export default UserRepairs;
