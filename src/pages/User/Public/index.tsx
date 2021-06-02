import React, { useEffect, useState } from 'react';
import { Card, List, Image, message } from 'antd';
import { getPublicList } from '@/api/user';

const Public: React.FC = () => {
  const [publicList, setPublicList] = useState<anyObject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getPublicList().then((res) => {
      if (res.code === 200) {
        setPublicList(res.data);
        setLoading(false);
      } else {
        message.error(res.msg);
        setLoading(false);
      }
    });
  }, []);

  return (
    <Card style={{ minHeight: '100%' }}>
      <List
        grid={{ column: 6, gutter: 16 }}
        dataSource={publicList}
        loading={loading}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <Card
              bordered
              hoverable
              cover={<Image preview={{ mask: <>查看大图</> }} src={item.pic}></Image>}
            >
              <Card.Meta title={item.name}></Card.Meta>
            </Card>
          </List.Item>
        )}
      ></List>
    </Card>
  );
};

export default Public;
