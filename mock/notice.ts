import { Request, Response } from 'express';

export default {
  'GET /api/getNoticeList': async (_: Request, res: Response) => {
    const list = [];
    for (let i = 0; i < 20; i++) {
      list.push({
        title: '大家伙注意！陈一凡痴呆，大家不要接近，会传染！',
        description: '近日来，有群众反映，陈一凡说话吞吐，表情呆滞，或已感染痴呆症',
        createTime: '2021-04-07'
      });
    }
    return res.json(list)
  },
};
