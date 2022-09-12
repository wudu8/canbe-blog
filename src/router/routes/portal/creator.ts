import type { RouteRecordRaw } from 'vue-router';

import { t } from '@/locale';
import { CreatorLayout } from '@/layouts';
import { pathEnum } from '@/router/path';

const routes: Array<RouteRecordRaw> = [
  {
    path: pathEnum.creator,
    name: 'creator',
    component: CreatorLayout,
    redirect: pathEnum.creatorHome,
    children: [
      {
        path: pathEnum.creatorHome,
        name: 'creator_home',
        meta: {
          icon: 'creator-home',
          title: t('portal.creator_home.title'),
          sort: 1
        },
        component: () => import('@/views/portal/home/Index.vue')
      },
      {
        path: '/creator_content',
        name: 'creator_content',
        meta: {
          icon: 'creator-content',
          title: t('portal.creator_content.title'),
          sort: 2
        },
        children: [
          {
            path: pathEnum.creatorArticle,
            name: 'creator_article',
            meta: {
              title: t('portal.creator_article.title'),
              sort: 1
            },
            component: () => import('@/views/portal/home/Index.vue')
          },
          {
            path: pathEnum.drafts,
            name: 'drafts',
            meta: {
              title: t('portal.drafts.title'),
              sort: 2
            },
            component: () => import('@/views/portal/home/Index.vue')
          },
          {
            path: pathEnum.creatorColumn,
            name: 'creator_column',
            meta: {
              title: t('portal.creator_column.title'),
              sort: 3
            },
            component: () => import('@/views/portal/home/Index.vue')
          }
        ]
      }
    ]
  }
];

export default routes;
