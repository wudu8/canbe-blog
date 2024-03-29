<script lang="ts">
import type { ArticleDataSource } from './types';
import type { ArticleListContext } from './token';

import { merge } from 'lodash-es';
import { useClasses } from '@/hooks';

import { articleListProps, defaultArticleItemConfig } from './types';
import { ArticleListToken } from './token';

import ArticleEmpty from './components/ArticleEmpty.vue';
import ArticleItem from './components/ArticleItem.vue';

const defultEmptyNum = 5;

export default defineComponent({
  name: 'ArticleList',
  components: {
    ArticleEmpty,
    ArticleItem
  },
  emits: ['updateItem'],
  props: articleListProps,
  setup(props, { emit }) {
    const classes = useClasses('article-list-content');

    const updateItem = (record: ArticleDataSource) => {
      emit('updateItem', record);
    };

    provide<ArticleListContext>(ArticleListToken, {
      updateItem,
      itemConfig: merge({}, defaultArticleItemConfig, props.itemConfig)
    });

    return { defultEmptyNum, classes };
  }
});
</script>

<template>
  <div :class="classes">
    <a-list :bordered="false" :data="dataSource">
      <template #item="{ item, index }">
        <ArticleItem :item="item" :key="item.id ?? index">
          <template #actions v-if="$slots.actions">
            <slot name="actions" :row="item" :index="index"></slot>
          </template>
        </ArticleItem>
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
