<script setup lang="ts">
import type { ArticleData } from '@/apis/article/types';
import type { ArticleItemConfig } from '@/components/article-card';

import { useUserStore } from '@/store';
import { useClasses } from '@/hooks';
import { creatorLayoutToken } from '@/layouts/const';

import ArticleList from '@/views/business/ArticleList.vue';

const listRef = ref<InstanceType<typeof ArticleList>>();
const params = reactive({} as ArticleData);
const searchValue = ref<string>();
const itemConfig = reactive<ArticleItemConfig>({
  hiddenExtra: true,
  hiddenInfo: true,
  hiddenStoreNum: false,
  hiddenActions: false,
  hiddenActionTime: false,
  disabledFavour: true
});

const userStore = useUserStore();
const classes = useClasses('creator-article-list');

const loadData = () => {
  if (userStore.userInfo.id) {
    listRef.value?.loadData();
  }
};

const queryData = () => {
  searchValue.value && (params.blogTitle = searchValue.value);
  loadData();
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
        v-model="searchValue"
        :style="{ width: '320px' }"
        :placeholder="$t('portal.creator.article_list.search')"
        @press-enter="queryData"
        @search="queryData"
      />
    </div>
    <ArticleList
      ref="listRef"
      :params="params"
      :layoutToken="creatorLayoutToken"
      :itemConfig="itemConfig"
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
