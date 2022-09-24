<script setup lang="ts">
import type { ArticleDataSource } from '../types';
import type { ArticleListContext } from '../token';

import { ref, inject } from 'vue';
import { useClasses } from '@/hooks';
import { useAppStore } from '@/store';
import { ArticleListToken } from '../token';

import ViewAction from './ViewAction.vue';
import ArticleInfo from './ArticleInfo.vue';
import ArticleTitle from './ArticleTitle.vue';

interface Props {
  item: ArticleDataSource;
}
const props = withDefaults(defineProps<Props>(), {});

const ArticleTitleRef = ref<InstanceType<typeof ArticleTitle>>();
const appStore = useAppStore();
const { itemConfig } = inject<ArticleListContext>(ArticleListToken) ?? {};

const handleClick = () => {
  ArticleTitleRef.value?.click();
};
const classes = useClasses('article-list-item');
</script>

<template>
  <a-list-item :class="classes" @click="handleClick">
    <a-list-item-meta>
      <template #title>
        <div :class="{ [`${classes}-title`]: true, reverse: appStore.isMobile }">
          <template v-if="!itemConfig?.hiddenInfo">
            <ArticleInfo :item="props.item" />
          </template>
          <ArticleTitle ref="ArticleTitleRef" :item="props.item" />
        </div>
      </template>
      <template #description>
        <div
          v-if="props.item.description"
          :class="[`${classes}-description`, 'single-row-ellipsis']"
        >
          {{ props.item.description }}
        </div>
        <ViewAction :item="props.item" />
      </template>
    </a-list-item-meta>
    <template #extra v-if="props.item.thumb && !itemConfig?.hiddenExtra">
      <img :class="`${classes}-img`" :src="props.item.thumb" />
    </template>
    <template #actions v-if="$slots.actions">
      <slot name="actions"></slot>
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

  &-title {
    display: flex;
    flex-direction: column;

    &.reverse {
      flex-direction: column-reverse;
    }
  }
}
</style>
