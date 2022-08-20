export default [
  {
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    path: '/home',
    name: 'home',
    icon: 'BankOutlined',
    component: './Home',
  },
  {
    path: '/users',
    name: 'users',
    icon: 'SolutionOutlined',
    component: './Users',
  },
  {
    path: '/rights',
    name: 'rights',
    icon: 'AlignLeftOutlined',
    routes: [
      {
        path: '/rights/roles',
        name: 'roles',
        component: './Rights/Roles',
      },
      {
        path: '/rights/list',
        name: 'list',
        component: './Rights/List',
      },
    ],
  },
  {
    path: '/goods',
    name: 'goods',
    icon: 'FileSearchOutlined',
    routes: [
      {
        path: '/goods/list',
        name: 'list',
        component: './Goods/List',
      },
      {
        path: '/goods/params',
        name: 'params',
        component: './Goods/Params',
      },
      {
        path: '/goods/categories',
        name: 'categories',
        component: './Goods/Categories',
      },
    ],
  },
  {
    path: '/orders',
    name: 'orders',
    icon: 'FolderOpenOutlined',
    component: './Orders',
  },
  {
    path: '/reports',
    name: 'reports',
    icon: 'PieChartOutlined',
    component: './Reports',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
