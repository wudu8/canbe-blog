<script setup lang="ts">
import type { ArticleData } from '@/apis/article/types';

import { ref, onMounted, reactive } from 'vue';
import { useUserStore } from '@/store';
import { useClasses } from '@/hooks';

import ArticleList from '@/views/business/ArticleList.vue';

const listRef = ref<InstanceType<typeof ArticleList>>();
const params = reactive({} as ArticleData);

const userStore = useUserStore();
const classes = useClasses('creator-article-drafts');

const loadData = () => {
  if (userStore.userInfo.id) {
    listRef.value?.loadData();
  }
};

onMounted(() => {
  params.blogAuthor = userStore.userInfo.id!;
  loadData();
});
</script>

<template>
  <div :class="classes">
    <ArticleList ref="listRef" :params="params" />
  </div>
</template>

<style lang="less" scoped></style>
