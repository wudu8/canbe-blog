<script setup lang="ts">
import { useClasses } from '@/hooks';

import SiderBar from './components/SiderBar.vue';
import ArticleList from './components/ArticleList.vue';

const classes = useClasses('home');
</script>

<template>
  <div :class="classes">
    <div :class="`${classes}-list-container`">
      <ArticleList />
    </div>
    <SiderBar :class="`${classes}-siderbar`" />
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
