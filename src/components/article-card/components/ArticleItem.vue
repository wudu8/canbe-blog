<script setup lang="ts">
import { ref } from 'vue';
import { useClasses } from '@/hooks';
import { ArticleListData } from '../types';

import ViewAction from './ViewAction.vue';
import ArticleInfo from './ArticleInfo.vue';
import ArticleTitle from './ArticleTitle.vue';

interface Props {
  item: ArticleListData;
}
const props = withDefaults(defineProps<Props>(), {});

const ArticleTitleRef = ref<InstanceType<typeof ArticleTitle>>();

const handleClick = () => {
  ArticleTitleRef.value?.click();
};
const classes = useClasses('article-list-item');
</script>

<template>
  <a-list-item :class="classes" @click="handleClick">
    <a-list-item-meta>
      <template #title>
        <ArticleInfo :item="props.item" />
        <ArticleTitle ref="" :item="props.item" />
      </template>
      <template #description>
        <div :class="`${classes}-description`">{{ props.item.description }}</div>
        <ViewAction
          :viewLabel="props.item.viewNum"
          :likeLabel="props.item.likeNum"
          :commentLabel="props.item.commentNum"
        />
      </template>
    </a-list-item-meta>
    <template #extra v-if="props.item.thumb">
      <img :class="`${classes}-img`" :src="props.item.thumb" />
    </template>
  </a-list-item>
</template>

<style lang="less" scope>
@article-list-item: ~'@{app-prefix}-article-list-item';
.@{article-list-item} {
  padding-bottom: 0 !important;
  cursor: pointer;

  &:hover {
    background-color: @background-default-color;

    .@{app-prefix}-item-title-href {
      color: @primary-color !important;
    }
  }

  .arco-list-item-meta {
    padding-bottom: 0;
  }

  .arco-list-item-meta-content,
  .arco-list-item-main {
    overflow: hidden;
  }

  .arco-list-item-extra {
    display: flex;
    align-items: center;
  }

  &-img {
    width: 120px;
    height: 80px;
    margin-left: 16px;
    object-fit: cover;
    border-radius: 2px;
  }

  &-description {
    margin-bottom: 10px;
    color: @weak-text-color;
  }
}
</style>
