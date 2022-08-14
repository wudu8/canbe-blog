<script setup lang="ts">
import { computed } from 'vue';
import { useClasses } from '@/hooks';
import { ArticleListData } from '../types';

import DotList from '@/components/dot-List/DotList.vue';

interface Props {
  item: ArticleListData;
}
const props = withDefaults(defineProps<Props>(), {});

const classes = useClasses('item-header');
const dateTime = computed(() => {
  return props.item.dateTime;
});
</script>

<template>
  <div :class="`${classes}-header`">
    <span :class="`${classes}-author`">{{ props.item.author }}</span>
    <a-divider direction="vertical" />
    <span :class="`${classes}-sub-text`">{{ dateTime }}</span>
    <a-divider direction="vertical" />
    <DotList :data="props.item.tags" :class="`${classes}-sub-text`" />
  </div>
</template>

<style lang="less" scope>
.@{app-prefix}-item-header {
  &-author {
    color: @sub-text-color;
  }

  &-sub-text {
    color: @weak-text-color;
  }
}
</style>
