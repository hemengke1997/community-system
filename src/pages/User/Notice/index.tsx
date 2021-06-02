import React, { useEffect, useState } from 'react';
import { List, Card, Avatar, Image, Button, message } from 'antd';
import { myNotice, affirmNotice } from '@/api/user';

const Notice: React.FC = () => {
  const [notice, setNotice] = useState<anyObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    _myNotice();
  }, []);

  const _myNotice = () => {
    myNotice({}).then((res) => {
      if (res.code === 200) {
        setNotice(res.data || []);
      }
      setLoading(false);
    });
  };

  const _affirmNotice = (id: number) => {
    affirmNotice({ id }).then((res) => {
      if (res.code === 200) {
        message.success('确认成功');
        _myNotice();
      } else {
        message.error(res.msg || '确认公告失败');
      }
    });
  };

  return (
    <Card title="公告栏">
      <List<any>
        itemLayout="vertical"
        dataSource={notice}
        loading={loading}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            extra={
              !item.isAffirm ? (
                <Button size="small" onClick={() => _affirmNotice(item.id)}>
                  确认公告
                </Button>
              ) : null
            }
          >
            <List.Item.Meta
              avatar={<Avatar>管理员</Avatar>}
              title={item.title}
              description={item.text}
            ></List.Item.Meta>
            {item.pic ? <Image src={item.pic} style={{ objectFit: 'contain' }}></Image> : null}
          </List.Item>
        )}
      ></List>
    </Card>
  );
};

export default Notice;
