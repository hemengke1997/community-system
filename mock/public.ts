import { Request, Response } from 'express';

export default {
  'GET /api/getPublicList': async (_: Request, res: Response) => {
    const types = [
      '绿化',
      '公共照明设备',
      '公共消防设备',
      '健身区域',
      '儿童娱乐区',
      '篮球场',
      '乒乓球场',
      '游泳池',
      '电梯',
      '礼堂大厅',
      '公共卫生间',
    ];
    const list = types.map(item=>({title: item}))
    return res.json(list)
  },
};
