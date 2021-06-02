import { Request, Response } from 'express';

function repairsList() {
  const list = [];
  const status = ['1', '2', '3'];

  for (let i = 0; i < 20; i++) {
    list.push({
      id: `fake-list-${i}`,
      title: '水龙头',
      content: '保修的时候写的内容，比如水龙头漏水之类的',
      cost: 100,
      status: status[i % 3],
      createTime: '2021-03-31 13:11:42',
    });
  }
  return list;
}

export default {
  'GET /api/order/getRepairsList': async (req: Request, res: Response) => {
    const result = repairsList();
    return res.json(result);
  },
};
