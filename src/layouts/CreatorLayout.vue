<script lang="ts" setup>
import type { CreatorLayoutProvide } from './const';

import { provide, ref } from 'vue';
import { useResponsive, useClasses, useLocale } from '@/hooks';
import { useAppStore } from '@/store';
import { creatorLayoutToken } from './const';

import RouteView from './components/common/RouteView.vue';
import PortalHeader from './components/portal/PortalHeader.vue';
import CreatorSider from './components/portal/CreatorSider.vue';

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
    <PortalHeader :is-creator="true">
      <creator-sider
        v-if="appStore.isMobile"
        :isMobile="true"
        :class="[`${creatorClasses}-sider`]"
      />
    </PortalHeader>
    <a-layout ref="scrollEl" class="main-content">
      <a-layout-content class="view-wrapper">
        <div :class="[creatorClasses, contentClasses, { mobile: appStore.isMobile }]">
          <creator-sider v-if="!appStore.isMobile" :class="[`${creatorClasses}-sider`]" />
          <div :class="[`${creatorClasses}-content`]">
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
  position: relative;

  &.mobile {
    display: flex;
    flex-direction: column;

    .@{app-prefix}-creator-layout-content {
      flex-grow: 1;
      flex-shrink: 1;
      width: 100%;
    }
  }

  &:not(.mobile) {
    .@{app-prefix}-creator-layout-sider {
      flex-shrink: 0;
      position: fixed;
      bottom: @layout-space;
      top: calc(@portal-header-height + @layout-space);
    }

    .@{app-prefix}-creator-layout-content {
      margin-left: calc(@left-menu-width + @layout-space);
      width: calc(100% - @left-menu-width);
    }
  }
}

.@{app-prefix}-blog-layout{
  height: 100vh;

  .main-content {
    margin-top: @portal-header-height;
    padding-top: @layout-space;
    overflow: auto;
  }

  &.mobile {
    .view-wrapper {
      width: 100%;
      background: #fff;
    }
  }
}
</style>
