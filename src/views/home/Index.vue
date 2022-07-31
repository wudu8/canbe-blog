<script setup lang="ts">
import { useClasses } from '@/hooks';

import SiderBar from './components/SiderBar.vue';

const classes = useClasses('home');
</script>

<template>
  <div :class="classes">
    <div :class="`${classes}-list-container`"></div>
    <SiderBar :class="`${classes}-siderbar`" />
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-home {
  display: flex;

  &-list-container {
    flex: 1;
  }

  &-siderbar {
    width: 300px;
    margin-left: 12px;
  }
}
</style>
