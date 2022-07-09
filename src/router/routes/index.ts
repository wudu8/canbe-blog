import { sortRoutes } from '@/router/utils';
import { type RouteRecordRaw } from 'vue-router';

const allModules = import.meta.globEager('./*.ts'),
  moduleRoutes: RouteRecordRaw[] = [];

Object.keys(allModules).forEach(key => {
  const mod = allModules[key].default || {},
    modList = Array.isArray(mod) ? [...mod] : [mod];

  moduleRoutes.push(...modList);
});

export default sortRoutes(moduleRoutes);
