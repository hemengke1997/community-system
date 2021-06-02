const routes = [
  {
    path: '/',
    redirect: '/index',
    exact: true,
  },
  {
    path: '/index',
    component: '@/pages/Index',
    layout: false,
  },
  // 登录页
  {
    path: '/login',
    layout: false,
    component: '@/pages/Login',
    title: '登录',
  },
  // 注册页
  {
    path: '/register',
    layout: false,
    component: '@/pages/Register',
    title: '注册',
  },
  // 用户模块
  {
    path: '/user',
    redirect: '/user/uc',
  },
  {
    path: '/user/uc',
    component: './User/UC',
    name: '个人中心',
    access: 'canUser',
    icon: 'user',
  },
  {
    hideInMenu: true,
    name: '用户设置',
    path: '/user/uc/setting',
    component: './User/UserSetting',
  },
  {
    // 报修
    path: '/user/repairs',
    component: '@/pages/User/Repairs',
    name: '申请报修',
    access: 'canUser',
    icon: 'tool',
  },
  {
    // 投诉
    path: '/user/complaint',
    component: '@/pages/User/Complaint',
    name: '申请投诉',
    access: 'canUser',
    icon: 'dislike',
  },
  {
    // 公告
    path: '/user/notice',
    component: '@/pages/User/Notice',
    access: 'canUser',
    name: '查看公告',
    icon: 'insertRowBelow',
  },
  {
    // 查看公共设备管理情况
    path: '/user/public',
    component: '@/pages/User/Public',
    access: 'canUser',
    name: '查看公共设备',
    icon: 'bank',
  },

  // 管理员模块
  {
    path: 'admin',
    redirect: 'admin/uc',

  },
  {
    // 用户管理
    path: '/admin/uc',
    component: '@/pages/Admin/UC',
    name: '用户管理',
    access: 'canAdmin',
    icon: 'user'
  },
  {
    // 报修
    path: '/admin/repairs',
    component: '@/pages/Admin/Repairs',
    name: '报修管理',
    access: 'canAdmin',
    icon: 'tool'
  },
  {
    // 查看费用
    path: '/admin/cost',
    component: '@/pages/Admin/Cost',
    name: '费用管理',
    access: 'canAdmin',
    icon: 'payCircle'
  },
  {
    // 投诉
    path: '/admin/complaint',
    component: '@/pages/Admin/Complaint',
    name: '投诉管理',
    access: 'canAdmin',
    icon: 'dislike'
  },
  {
    // 公告
    path: '/admin/notice',
    component: '@/pages/Admin/Notice',
    name: '公告管理',
    access: 'canAdmin',
    icon: 'insertRowBelow'
  },
  {
    // 查看公共设备管理情况
    path: '/admin/public',
    component: '@/pages/Admin/Public',
    name: '公共设备管理',
    access: 'canAdmin',
    icon: 'bank'
  },

  {
    layout: false,
    component: '@/pages/NotFound/404.tsx',
  },
];

export default routes;
