<script setup lang="ts">
import { useClasses } from '@/hooks';
import { useAppStore } from '@/store';

import SiderBar from './components/SiderBar.vue';
import ArticleList from './components/ArticleList.vue';

const classes = useClasses('home');
const appStore = useAppStore();
</script>

<template>
  <div :class="classes">
    <div :class="`${classes}-list-container`">
      <ArticleList />
    </div>
    <SiderBar v-if="!appStore.isMobile" :class="`${classes}-siderbar`" />
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-home {
  display: flex;

  &-list-container {
    flex: 1;
    overflow: hidden;
  }

  &-siderbar {
    width: 300px;
    margin-left: 12px;
  }
}
</style>
