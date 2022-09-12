<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router';

import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { isString } from 'lodash-es';
import { useAppStore } from '@/store';
import { useClasses, useMenuTree } from '@/hooks';
import { portalNavMenus } from '@/router/routes';
import { portalHeaderPathEnum } from '@/router/path';
import { filterAndFlattenTrees } from '@/utils/treeUtils';

const appStore = useAppStore();
const classes = useClasses('header-menu');
const router = useRouter();
const currentRoute = useRoute();

const { menuTree } = useMenuTree(computed(() => portalNavMenus));

const topMenus = computed(() => {
  const paths = Object.values(portalHeaderPathEnum);
  return filterAndFlattenTrees(menuTree.value, item => paths.includes(item.path));
});

const selectedRoute = computed(() => {
  return topMenus.value.find(menu => menu.name === currentRoute.name) ?? ({} as RouteRecordRaw);
});

const handleSelect = (value: VKey) => {
  if (isString(value)) {
    router.push(value);
  }
};
</script>
<template>
  <div :class="[{ 'windi-ml-3': !appStore.isMobile }, `${classes}-wrapper`]">
    <div v-if="!appStore.isMobile" :class="classes">
      <div
        v-for="(route, index) in topMenus"
        :key="route.name || index"
        :class="[{ 'menu-selected': selectedRoute.name === route.name }, `${classes}-item`]"
        @click="handleSelect(route.path)"
      >
        {{ route?.meta?.title }}
      </div>
    </div>
    <a-dropdown v-else position="bl" class="menu-dropdown-popup" @select="handleSelect">
      <a-button class="menu-dropdown-btn">
        {{ selectedRoute?.meta?.title ?? topMenus?.[0]?.meta?.title }}
        <icon-caret-down />
      </a-button>
      <template #content>
        <a-doption
          v-for="(route, index) in topMenus"
          :key="route.name || index"
          :value="route.path"
          :class="[{ 'doption-selected': selectedRoute.name === route.name }]"
        >
          {{ route?.meta?.title }}
        </a-doption>
      </template>
    </a-dropdown>
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-header-menu-wrapper{
  height: @portal-header-height;
  line-height: @portal-header-height;
  width: 100%;

  .@{app-prefix}-header-menu {
    display: flex;

    &-item {
      padding: 0 16px;
      cursor: pointer;
      position: relative;
      transition: all 0.3s;

      &::after {
        content: '';
        display: block;
        position: absolute;
        height: 2px;
        background: @primary-color;
        bottom: 0;
        left: 50%;
        right: 50%;
        transition: all 0.3s;
      }

      &:hover {
        &::after {
          left: 10px;
          right: 10px;
        }
      }

      &:hover,
      &.menu-selected {
        color: @primary-color;
      }
    }
  }

  .menu-dropdown-btn {
    background: none;
    color: @primary-color;
    padding: 0;
    font-size: 15px;

    .arco-icon {
      transition: all 0.3s;
      transform: rotate(0deg);
      color: @weak-text-color;
    }

    &.arco-dropdown-open .arco-icon {
      transform: rotate(180deg);
      color: @primary-color;
    }
  }
}
</style>
<style lang="less">
.menu-dropdown-popup {
  left: 0 !important;
  top: @portal-header-height !important;

  .arco-dropdown {
    .arco-dropdown-list-wrapper {
      max-height: 70vh;
    }

    .arco-dropdown-option {
      padding: 12px 0;
      width: 160px;
      justify-content: center;

      &.doption-selected {
        color: @primary-color;
      }
    }
  }
}
</style>
