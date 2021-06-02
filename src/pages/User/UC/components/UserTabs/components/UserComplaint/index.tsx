import React, { useEffect, useState } from 'react';
import { List, Tag, Typography, message } from 'antd';
import { myComplain } from '@/api/user';

const { Text } = Typography;

const UserComplaint: React.FC = () => {
  const [complaintList, setComplaintList] = useState<anyObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    _myComplain();
  }, []);

  const _myComplain = async () => {
    const res = await myComplain();
    if (res.code === 200) {
      const { data } = res;
      setComplaintList(data);
    } else {
      message.error(res.msg || '获取用户投诉列表失败');
    }
    setLoading(false);
  };

  const getColor = (status: string) => {
    // 投诉成功、投诉被驳回、投诉处理中、用户取消投诉、
    switch (String(status)) {
      case '0':
        return {
          color: 'processing',
          text: '投诉处理中',
        };
      case '1':
        return {
          color: 'success',
          text: '投诉成功',
        };
      case '2':
        return {
          color: 'error',
          text: '驳回投诉',
        };

      case '3':
        return {
          color: 'warning',
          text: '用户取消投诉',
        };
      default:
        return {
          color: 'default',
          text: '-',
        };
    }
  };

  return (
    <List
      itemLayout="vertical"
      pagination={false}
      dataSource={complaintList}
      loading={loading}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          extra={<Tag color={getColor(item.status).color}>{getColor(item.status).text}</Tag>}
        >
          <List.Item.Meta
            avatar={<Text>{item.createTime}</Text>}
            title={item.type}
            description={item.text}
          ></List.Item.Meta>
        </List.Item>
      )}
    ></List>
  );
};

export default UserComplaint;
