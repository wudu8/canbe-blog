<script lang="ts" setup>
import { useResponsive, useClasses } from '@/hooks';
import { useAppStore } from '@/store';

import RouteView from './components/common/RouteView.vue';
import Footer from './components/common/Footer.vue';
import PortalHeader from './components/protal/PortalHeader.vue';

useResponsive(true);
const appStore = useAppStore();
const layoutClasses = useClasses('blog-layout');
</script>
<template>
  <a-layout theme="light" :class="{ [appStore.device]: true, [layoutClasses]: true }">
    <PortalHeader />
    <a-layout class="layout-content">
      <a-layout-content class="content-wrapper">
        <route-view />
      </a-layout-content>
      <Footer :systemTitle="appStore.protalTitle" />
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.@{app-prefix}-blog-layout{
  min-height: 100vh;
  overflow: auto;

  .layout-content {
    margin-top: calc(@protal-header-height + 16px);
  }

  &.mobile {
    .content-wrapper {
      width: 100%;
      background: #fff;
    }
  }
}
</style>
