import React, { HTMLAttributes, useRef, useState } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { message, Image, Button, Popconfirm, InputNumber, Space, Typography } from 'antd';
import { getRepairsList, agreePrice, updateStatus } from '@/api/admin';
import { useMount } from 'ahooks';
import { SortOrder } from 'antd/es/table/interface';
import { isNull } from 'lodash';
import ViewReasonModal, { ViewReasonModalType } from './components';

const { Text } = Typography;

const PriceInput: React.FC<{ id: string; reload: () => void } & HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  const { id, reload } = props;

  const [price, setPrice] = useState<number>();

  const onChange = (val: number) => {
    setPrice(val);
    console.log(val);
  };

  const onConfirm = () => {
    if (typeof price !== 'undefined') {
      // 请求接口
      agreePrice({ id, price }).then((res) => {
        if (res.code === 200) {
          message.success('通过审核成功');
          reload();
        } else {
          message.error('通过审核失败');
        }
      });
    }
  };

  return (
    <Popconfirm
      destroyTooltipOnHide
      title={
        <Space style={{ marginLeft: -22 }}>
          <Text>请输入收费(￥)：</Text>
          <InputNumber onChange={onChange}></InputNumber>
        </Space>
      }
      okText="确认"
      cancelText="取消"
      placement="leftTop"
      icon={null}
      onConfirm={onConfirm}
    >
      <Button size="small" type="primary">
        填写价格通过
      </Button>
    </Popconfirm>
  );
};

// 报修管理
const Repairs: React.FC = () => {
  const actionRef = useRef<ActionType>();

  useMount(() => {});

  const viewReasonRef = useRef<ViewReasonModalType>(null);

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

  const mode = (record: anyObject) => {
    const { status, id } = record;
    const t = {
      '0': <PriceInput id={id} reload={reload} />,
      '1': (
        <Popconfirm
          title="确认维修？"
          okText="确认"
          cancelText="取消"
          placement="leftTop"
          onConfirm={() => _updateStatus(id, 2)}
        >
          <Button size="small" type="primary">
            确认维修
          </Button>
        </Popconfirm>
      ),
      '2': (
        <Button disabled size="small">
          已维修
        </Button>
      ),
      '3': (
        <Button size="small" onClick={() => viewReasonRef.current?.show(record)}>
          查看申诉理由
        </Button>
      ),
      '4': (
        <Button disabled size="small">
          已完结
        </Button>
      ),
    };

    return t[status];
  };


  const reload = () => {
    actionRef.current?.reload();
  };

  const columns: ProColumns<anyObject>[] = [
    {
      title: '报修id',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '用户名',
      dataIndex: 'nickname',
      align: 'center',
    },
    {
      title: '报修申请时间',
      dataIndex: 'createTime',
      align: 'center',
      valueType: 'dateTime',
    },
    {
      title: '报修物品',
      dataIndex: 'thing',
      align: 'center',
    },
    {
      title: '报修内容',
      align: 'center',
      dataIndex: 'remark',
    },
    {
      title: '报修图片',
      dataIndex: 'pic',
      align: 'center',
      width: 100,
      render: (_, record) =>
        record.pic ? (
          <Image src={record.pic} style={{ maxHeight: 40, objectFit: 'contain' }}></Image>
        ) : (
          '暂无报修图'
        ),
    },
    {
      title: '维修状态',
      align: 'center',
      dataIndex: 'status',
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
      align: 'center',
      render: (text, record) => {
        if (isNull(record.price)) {
          return '待通过';
        }
        return text;
      },
    },
    {
      title: '操作',
      align: 'center',
      width: 150,
      render: (_, record) => {
        return mode(record);
      },
    },
  ];

  const loadData = async (
    params: any,
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[]>,
  ) => {
    const res = await getRepairsList({
      page: params.current,
      size: params.pageSize,
    });
    if (res.code === 200) {
      const { data } = res;
      console.log(data, 'data');
      return {
        data: data.records,
        success: true,
        total: data.total,
      };
    } else {
      message.error(res.msg || '获取报修列表出错');
      return {
        success: false,
      };
    }
  };

  return (
    <div>
      <ProTable
        headerTitle="报修管理列表"
        rowKey="id"
        search={false}
        actionRef={actionRef}
        options={false}
        columns={columns}
        request={loadData}
      ></ProTable>
      <ViewReasonModal ref={viewReasonRef}></ViewReasonModal>
    </div>
  );
};

export default Repairs;
