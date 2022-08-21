<script setup lang="ts">
import type { ArticleListData } from '@/components/article-card';

import { ref, onMounted } from 'vue';
import { useClasses } from '@/hooks';
import { getArticleList } from '@/apis/article';

import ArticleList from '@/components/article-card';
import Spin from '@/components/box-spin/Spin.vue';

const articleLoading = ref(false);
const initLoading = ref(false);

const classes = useClasses('article-list');

const dataSource = ref<ArticleListData[]>([]);

onMounted(() => {
  initLoading.value = true;
  getArticleList().then(res => {
    if (res.success) {
      dataSource.value = res.result;
    }
    initLoading.value = false;
  });
});
</script>

<template>
  <div :class="classes">
    <ArticleList :dataSource="dataSource" :loading="initLoading" />
    <Spin :loading="articleLoading" dot class="spin-wrap" />
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-article-list{
  padding: 0 16px 12px;
  background-color: #fff;
  border-radius: 2px;

  .spin-wrap {
    margin: 24px 0;
  }
}
</style>
