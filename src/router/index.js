import { createWebHistory, createRouter } from 'vue-router';
import { constantRoutes as constant, dynamicRoutes as dynamic } from '@/pages/firstDemo/router/index';

// const data = await new Promise((resolve, reject) => {
//   import('@/pages/firstDemo/router/index').then(res => {
//     resolve(res);
//   });
// });

// console.log(data, 33);

/* Layout */
import Layout from '@/layout';

// 所有项目共用
let allPublic = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...allPublic, ...constant],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export const dynamicRoutes = dynamic;
export const constantRoutes = [...allPublic, ...constant];
export default router;
