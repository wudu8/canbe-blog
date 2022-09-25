<script setup lang="ts">
import { useClasses } from '@/hooks';
import { ArticleDataSource } from '../types';

import DotList from '@/components/dot-List/DotList.vue';

interface Props {
  item: ArticleDataSource;
}
const props = withDefaults(defineProps<Props>(), {});

const classes = useClasses('item-header');
const dateTime = computed(() => {
  return props.item.publishTime;
});
</script>

<template>
  <div :class="classes">
    <span :class="`${classes}-author`">{{ props.item.blogAuthor }}</span>
    <a-divider direction="vertical" />
    <span :class="`${classes}-sub-text`">{{ dateTime }}</span>
    <a-divider direction="vertical" />
    <DotList :data="props.item.blogTags" :class="`${classes}-sub-text`" />
  </div>
</template>

<style lang="less" scope>
.@{app-prefix}-item-header {
  margin-bottom: 10px;

  &-author {
    color: @sub-text-color;
  }

  &-sub-text {
    color: @weak-text-color;
  }
}
</style>
