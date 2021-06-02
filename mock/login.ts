import { Request, Response } from 'express';

const sleep = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

let access: 'admin' | 'user' | '' = '';

export default {
  'GET /api/getUserInfo': async (_: Request, res: Response) => {
    // if (!access) {
    //   // 未登录
    //   res.send({});
    //   return;
    // }
    res.send({
      name: '程双双',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      signature: '成于大气，信达天下',
      tags: [
        {
          key: '0',
          label: '按时缴费',
        },
        {
          key: '1',
          label: '睡觉很晚，邻居有意见',
        },
        {
          key: '2',
          label: '遛狗不牵绳',
        },
        {
          key: '3',
          label: '三好学生',
        },
      ],
      access: 'user',
      address: '成都信息工程大学',
      phone: '13258324380',
      sex: '女'
    });
  },
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await sleep(100);

    if (password === 'chengss' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    if (password === 'chengss' && username === 'chengss') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }

    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = '';
  },
  'GET /api/login/outLogin': async (_: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
};
