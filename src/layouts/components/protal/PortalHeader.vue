<script lang="ts" setup>
import { useAppStore } from '@/store';
import { useClasses } from '@/hooks';

// import Menu from '@/components/menu/index.vue';
import Logo from '../common/Logo.vue';

const appStore = useAppStore();
const classes = useClasses('header');
</script>
<template>
  <a-layout-header :class="classes">
    <Logo :systemTitle="appStore.protalTitle" />
    <div class="menu-wrapper inline-block">
      <!-- <Menu /> -->
    </div>
  </a-layout-header>
</template>

<style lang="less" scoped>
.@{app-prefix}-header{
  position: fixed;
  top: 0;
  width: 100%;
  height: @protal-header-height;
  padding: 0 24px;
  line-height: @protal-header-height;
  background: @protal-header-background;
}
</style>
