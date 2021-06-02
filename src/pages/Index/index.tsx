import { PageLoading } from '@ant-design/pro-layout';
import { useMount } from 'ahooks';
import { history } from 'umi';

const Index = () => {
  useMount(() => {
    const userInfo = JSON.parse(localStorage.getItem('CS-userInfo') || '{}');
    if (userInfo.roleName === 'user') {
      // 若未完善个人信息，跳转至完善信息页面

      history.push('/user');
    } else {
      history.push('/admin');
    }
  });

  return <PageLoading />;
};

export default Index;
