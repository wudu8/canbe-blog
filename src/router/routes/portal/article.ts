import type { RouteRecordRaw } from 'vue-router';

import { t } from '@/locale';
import { EmptyLayout } from '@/layouts';
import { pathEnum } from '@/router/path';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/article',
    name: 'article',
    component: EmptyLayout,
    children: [
      {
        path: pathEnum.editArticle,
        name: 'edit_article',
        meta: {
          title: t('portal.edit_article.title'),
          sort: 1
        },
        component: () => import('@/views/portal/editor/Index.vue')
      }
    ]
  }
];

export default routes;
