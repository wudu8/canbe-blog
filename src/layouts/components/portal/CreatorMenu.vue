<script lang="ts" setup>
import { computed } from 'vue';
// import { useAppStore } from '@/store';
import { useClasses, useMenuTree } from '@/hooks';
import { creatorMenus } from '@/router/routes';
import { forEachTree } from '@/utils/treeUtils';
import { isEmpty } from 'lodash-es';

import CMenu from '@/components/menu/Index.vue';

interface Props {
  mode?: string;
}
const props = withDefaults(defineProps<Props>(), {});

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
      :mode="props.mode"
      :menus="menuTree"
      :useCollapsed="false"
      :defaultOpenKeys="defaultOpenKeys"
    />
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-creator-menu-wrapper{
  width: 100%;

  .@{app-prefix}-creator-menu {
    font-size: 16px;

    &.arco-menu.arco-menu-light :deep(.arco-menu-inner) {
      .arco-menu-item.arco-menu-selected {
        background-color: @background-primary-color;
      }

      .arco-menu-inline-content .arco-menu-item {
        &:not(.arco-menu-selected) {
          color: @weak-text-color;
        }
      }
    }
  }
}
</style>
