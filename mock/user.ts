import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

const getAccess = () => {
  return access;
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': (req: Request, res: Response) => {
    // if (!getAccess()) {
    //   res.status(401).send({
    //     data: {
    //       isLogin: false,
    //     },
    //     errorCode: '401',
    //     errorMessage: '请先登录！',
    //     success: true,
    //   });
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
          label: '三好学生'
        }
      ],
      access: 'user',
      address: '成都信息工程大学',
      phone: '13258324380',
    });
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account1': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(200);
    if (password === 'chengss' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }
    if (password === 'chengss' && username === 'user') {
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
    access = 'guest';
  },
  'GET /api/login/outLogin': (req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },
  'GET /api/getComplainList': (req: Request, res: Response) => {
    const list = [];
    const status = ['1', '2', '3', '4']; // 投诉成功、投诉被驳回、投诉处理中、用户取消投诉、
    for (let i = 0; i < 20; i++) {
      list.push({
        id: `fake-id-${i}`,
        title: '针对报修投诉，展示报修的物品名，否则展示投诉的类型',
        content: '针对报修投诉，展示用户填的信息，否则不展示',
        cost: 200,
        createTime: '2021-05-21 15:12:14',
        complaintContent:
          '展示用户的投诉内容，内容随意',
        status: status[i % 3],
      });
    }
    return res.json(list);
  },
  'GET /api/getCost': (req: Request, res: Response) => {
    const list = []
    for(let i = 0; i< 20 ; i++) {
      list.push(({
        id: `fake-id-${i}`,
        title: '费用是如何产生的，如物业费、垃圾清理费',
        cost: 30,
        createTime: '2021-05-21 15:12:14',
      }))
    }
    return res.json(list)
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,
};
