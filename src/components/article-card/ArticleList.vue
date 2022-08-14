<script lang="ts">
import { defineComponent } from 'vue';
import { useClasses } from '@/hooks';
import { articleListProps } from './types';

import ArticleEmpty from './components/ArticleEmpty.vue';
import ArticleItem from './components/ArticleItem.vue';

const defultEmptyNum = 5;

export default defineComponent({
  name: 'ArticleList',
  components: {
    ArticleEmpty,
    ArticleItem
  },
  props: articleListProps,
  setup(_props) {
    const classes = useClasses('article-list-content');
    return { defultEmptyNum, classes };
  }
});
</script>

<template>
  <div :class="classes">
    <a-list :bordered="false" :virtualListProps="virtualListProps" :data="dataSource">
      <template #item="{ item, index }">
        <ArticleItem :item="item" :key="index" />
      </template>
      <template #empty>
        <ArticleEmpty :emptyNum="defultEmptyNum" />
      </template>
    </a-list>
  </div>
</template>

<style lang="less" scope>
.@{app-prefix}-article-list-content {
  background: transparent;
}
</style>
