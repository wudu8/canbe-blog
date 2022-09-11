<script lang="ts" setup>
import { computed } from 'vue';
// import { useAppStore } from '@/store';
import { useClasses, useMenuTree } from '@/hooks';
import { creatorMenus } from '@/router/routes';
import { forEachTree } from '@/utils/treeUtils';
import { isEmpty } from 'lodash-es';

import CMenu from '@/components/menu/Index.vue';

// const appStore = useAppStore();
const classes = useClasses('creator-menu');

const { menuTree } = useMenuTree(computed(() => creatorMenus));
const defaultOpenKeys: string[] = [];
forEachTree(menuTree.value, item => {
  if (!isEmpty(item.children)) {
    defaultOpenKeys.push((item.name as string) || '');
  }
});
</script>
<template>
  <div :class="[`${classes}-wrapper`]">
    <CMenu
      :class="classes"
      :menus="menuTree"
      :useCollapsed="true"
      :defaultOpenKeys="defaultOpenKeys"
    />
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-creator-menu-wrapper{
  width: 100%;

  // .@{app-prefix}-creator-menu {
  // }
}
</style>
