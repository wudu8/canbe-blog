<script setup lang="ts">
import type { ArticleData } from '@/apis/article/types';

import { ref, onMounted, reactive } from 'vue';
import { useUserStore } from '@/store';
import { useClasses } from '@/hooks';
import { creatorLayoutToken } from '@/layouts/const';

import ArticleList from '@/views/business/ArticleList.vue';

const listRef = ref<InstanceType<typeof ArticleList>>();
const params = reactive({} as ArticleData);

const userStore = useUserStore();
const classes = useClasses('creator-article-list');

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
    <div :class="`${classes}-search`">
      <a-input-search
        :style="{ width: '320px' }"
        :placeholder="$t('portal.creator.article_list.search')"
      />
    </div>
    <ArticleList
      ref="listRef"
      :params="params"
      :layoutToken="creatorLayoutToken"
      :hiddenExtra="true"
      :hiddenInfo="true"
      :hiddenStoreNum="false"
      :hiddenActions="false"
      :disabledFavour="true"
    />
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-creator-article-list {
  display: flex;
  flex-direction: column;
  background: #fff;

  &-search {
    display: flex;
    justify-content: flex-end;
    padding: 12px 16px;
    border-bottom: 1px solid #e5e6eb;
  }
}
</style>
