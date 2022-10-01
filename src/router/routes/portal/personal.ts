/*
 * @Author: zkr
 * @Date: 2022-09-26 16:24:59
 * @LastEditors: zkr
 * @LastEditTime: 2022-09-30 11:32:48
 * @FilePath: \canbe-blog\src\router\routes\portal\personal.ts
 */
import { RouteRecordRaw } from 'vue-router';

import { t } from '@/locale';
import { PortalLayout } from '@/layouts';
import { pathEnum } from '@/router/path';

const routes: Array<RouteRecordRaw> = [
  {
    path: pathEnum.personal,
    name: 'personal',
    redirect: pathEnum.personalHome,
    component: PortalLayout,
    children: [
      {
        path: pathEnum.personalHome,
        name: 'personal_home',
        meta: {
          title: t('portal.personal_home.info_setting'),
          sort: 1
        },
        component: () => import('@/views/portal/personal/Index.vue')
      },
      {
        path: pathEnum.personalSetting,
        name: 'personal_setting',
        meta: {
          title: t('portal.personal_home.info_setting'),
          sort: 2
        },
        component: () => import('@/views/portal/personal/editInfo/index.vue')
      }
    ]
  }
];

export default routes;
