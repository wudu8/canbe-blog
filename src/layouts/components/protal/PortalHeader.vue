<script lang="ts" setup>
import { useAppStore } from '@/store';
import { useClasses } from '@/hooks';

// import Menu from '@/components/menu/index.vue';
import Logo from '../common/Logo.vue';

const appStore = useAppStore();
const classes = useClasses('header');
</script>
<template>
  <a-layout-header :class="{ [classes]: true, 'header-shadow': true }">
    <div class="header-content">
      <Logo :systemTitle="appStore.protalTitle" />
      <div class="menu-wrapper inline-block">
        <!-- <Menu /> -->
      </div>
    </div>
  </a-layout-header>
</template>

<style lang="less" scoped>
.@{app-prefix}-header{
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: @protal-header-height;
  line-height: @protal-header-height;
  background: @protal-header-background;
  transition: all 0.2s;

  &.header-shadow {
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  }
}
</style>
