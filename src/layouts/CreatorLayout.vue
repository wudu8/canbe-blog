<script lang="ts" setup>
import type { CreatorLayoutProvide } from './const';

import { provide, ref } from 'vue';
import { useResponsive, useClasses, useLocale } from '@/hooks';
import { useAppStore } from '@/store';
import { creatorLayoutToken } from './const';

import RouteView from './components/common/RouteView.vue';
import PortalHeader from './components/protal/PortalHeader.vue';
import CreatorMenu from './components/protal/CreatorMenu.vue';

useResponsive(true);
const appStore = useAppStore();
const { currentLocale } = useLocale();
const layoutClasses = useClasses('blog-layout');
const contentClasses = useClasses('blog-layout-content');
const creatorClasses = useClasses('creator-layout');

const scrollEl = ref<HTMLElement>();

provide<CreatorLayoutProvide>(creatorLayoutToken, {
  /* 当前滚动的div */
  scrollEl
});
</script>
<template>
  <a-layout
    theme="light"
    :class="{ [appStore.device]: true, [layoutClasses]: true, [currentLocale]: true }"
  >
    <PortalHeader :is-creator="true" />
    <a-layout ref="scrollEl" class="layout-content">
      <a-layout-content class="content-wrapper">
        <div :class="[creatorClasses, contentClasses]">
          <creator-menu class="content-left-menu" />
          <div :class="`${creatorClasses}-content`">
            <route-view :haveClass="false" />
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
@left-menu-width: 240px;

.@{app-prefix}-creator-layout{
  display: flex;

  .content-left-menu {
    width: @left-menu-width;
    flex-shrink: 0;
  }

  &-content {
    flex-grow: 1;
    flex-shrink: 1;
    width: calc(100% - @left-menu-width);
  }
}

.@{app-prefix}-blog-layout{
  height: 100vh;

  .layout-content {
    margin-top: @protal-header-height;
    padding-top: 16px;
    overflow: auto;
  }

  &.mobile {
    .content-wrapper {
      width: 100%;
      background: #fff;
    }
  }
}
</style>
