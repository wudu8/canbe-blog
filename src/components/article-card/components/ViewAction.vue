<script setup lang="ts">
import type { ArticleListContext } from '../token';
import type { ArticleDataSource } from '../types';

import { inject } from 'vue';
import { useClasses } from '@/hooks';
import { getArticleIncrComment } from '@/apis/article';
import { ArticleListToken } from '../token';

import ActionItem from '@/components/icon-item/ActionItem.vue';

interface Props {
  item: ArticleDataSource;
}
const props = withDefaults(defineProps<Props>(), {});
const articleContext = inject<ArticleListContext>(ArticleListToken);

const classes = useClasses('view-actions-list');
const handleLike = (e: Event) => {
  if (articleContext?.disabledFavour) {
    return;
  }
  e.stopPropagation();
  getArticleIncrComment(props.item.id).then(res => {
    if (res.success) {
      articleContext?.updateItem({
        ...props.item,
        favourNum: res.result ? props.item.favourNum + 1 : props.item.favourNum - 1
      });
    }
  });
};
</script>

<template>
  <div :class="classes">
    <a-space size="large">
      <ActionItem
        :label="props.item.readingNum"
        :title="$t('component.article.action.view')"
        :disabled="true"
      >
        <icon-eye />
      </ActionItem>
      <ActionItem
        :label="props.item.favourNum"
        :title="$t('component.article.action.like')"
        :disabled="articleContext?.disabledFavour"
        @click="handleLike"
      >
        <icon-thumb-up />
      </ActionItem>
      <ActionItem
        :label="props.item.commentNum"
        :title="$t('component.article.action.comment')"
        :disabled="true"
      >
        <icon-message />
      </ActionItem>
      <ActionItem
        v-if="!articleContext?.hiddenStoreNum"
        :label="props.item.storeNum"
        :title="$t('component.article.action.store')"
        :disabled="true"
      >
        <icon-star />
      </ActionItem>
    </a-space>
  </div>
</template>

<style lang="less" scope>
.@{app-prefix}-view-actions-list {
  height: 32px;
  line-height: 32px;
}
</style>
