<!--
 * @Author: zkr
 * @Date: 2022-08-07 18:18:51
 * @LastEditors: zkr
 * @LastEditTime: 2022-09-29 12:28:44
 * @FilePath: \canbe-blog\src\layouts\PortalLayout.vue
-->
<script lang="ts" setup>
import type { PortalLayoutProvide } from './const';

import { useResponsive, useClasses, useLocale } from '@/hooks';
import { useAppStore } from '@/store';
import { portalLayoutToken } from './const';

import RouteView from './components/common/RouteView.vue';
import Footer from './components/common/Footer.vue';
import PortalHeader from './components/portal/PortalHeader.vue';

useResponsive(true);
const appStore = useAppStore();
const { currentLocale } = useLocale();
const layoutClasses = useClasses('blog-layout');

const scrollEl = ref<HTMLElement>();

provide<PortalLayoutProvide>(portalLayoutToken, {
  /* 当前滚动的div */
  scrollEl
});
</script>
<template>
  <a-layout
    theme="light"
    :class="{ [appStore.device]: true, [layoutClasses]: true, [currentLocale]: true }"
  >
    <PortalHeader />
    <a-layout ref="scrollEl" class="main-content">
      <a-layout-content class="view-wrapper">
        <route-view />
      </a-layout-content>
      <Footer :systemTitle="appStore.portalTitle" />
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
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
