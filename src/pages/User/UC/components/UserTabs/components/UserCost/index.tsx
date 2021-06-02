import React, { useEffect, useRef, useState } from 'react';
import { Typography, Button, message } from 'antd';
import { getMyCost } from '@/api/user';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import PayModal, { PayModalType } from './components/PayModal';
import styles from './index.module.less';

const { Paragraph } = Typography;

const UserCost: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [cost, setCost] = useState<anyObject[]>([]);
  const payModalRef = useRef<PayModalType>(null);

  const loadData = async () => {
    const res = await getMyCost({});

    if (res.code === 200) {
      setCost(res.data)
      return {
        data: res.data,
        success: true,
      };
    }
    return {
      success: false,
    };
  };

  const reload = () => {
    actionRef.current?.reload();
    console.log('reload')
  };

  const handlePay = (id?: number) => {
    payModalRef.current!.show({
      id,
      reload,
    });
  };

  const totalAmount = () => {
    let all = 0;
    cost.forEach((item) => {
      all += item.price;
    });
    return all;
  };

  const columns: ProColumns<any>[] = [
    {
      title: '维修物品',
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
      title: '费用',
      dataIndex: 'price',
      align: 'center',
      width: 120,
      valueType: 'money',
    },
    {
      title: '操作',
      dataIndex: '',
      align: 'center',
      width: 120,
      render: (_, record) => {
        return (
          <Button size="small" type="primary" onClick={() => handlePay(record.id)}>
            缴费
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <div className={styles.amount}>
        <Button onClick={() => handlePay()}>缴纳所有费用：￥{totalAmount()}</Button>
      </div>

      <ProTable
        rowKey="id"
        options={false}
        search={false}
        columns={columns}
        pagination={false}
        bordered
        request={loadData}
        actionRef={actionRef}
      ></ProTable>
      <PayModal ref={payModalRef} />
    </>
  );
};

export default UserCost;
