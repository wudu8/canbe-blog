<script setup lang="ts">
import { useClasses } from '@/hooks';

import SiderCard from '@/components/article-type/SiderCard.vue';

const classes = useClasses('siderbar');

const dataSource = [
  {
    id: 1,
    name: '前端',
    num: 503
  },
  {
    id: 2,
    name: '后端',
    num: 3564
  },
  {
    id: 3,
    name: 'Java',
    num: 14
  }
];
</script>

<template>
  <div :class="classes">
    <a-space direction="vertical" size="medium" fill>
      <SiderCard :dataSource="dataSource" class="sds" />
      <SiderCard :dataSource="dataSource" />
      <SiderCard :dataSource="dataSource" />
    </a-space>
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-siderbar{
  flex-shrink: 0;
}
</style>
