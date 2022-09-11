<script setup lang="ts">
import type { ArticleListData } from '@/components/article-card';

import type { PortalLayoutProvide } from '@/layouts/const';

import { ref, onMounted, watch, nextTick } from 'vue';
import { useClasses } from '@/hooks';
import { getArticleList } from '@/apis/article';
import { useLayoutScroll } from '@/layouts/hooks/useScroll';
import { portalLayoutToken } from '@/layouts/const';

import ArticleList from '@/components/article-card';
import Spin from '@/components/box-spin/Spin.vue';

const articleLoading = ref(false);
const initLoading = ref(false);

const classes = useClasses('article-list');

const dataSource = ref<ArticleListData[]>([]);

const { toBottom, isScrolling } = useLayoutScroll<PortalLayoutProvide>(portalLayoutToken);

const loadArticleList = async (cb: Fn) => {
  getArticleList().then(res => {
    if (res.success) {
      dataSource.value.push(...res.result);
      nextTick(cb);
    }
  });
};

watch(isScrolling, value => {
  if (!value && toBottom.value < 500 && !initLoading.value && !articleLoading.value) {
    !articleLoading.value && (articleLoading.value = true);
    loadArticleList(() => {
      articleLoading.value = false;
    });
  }
});

onMounted(async () => {
  initLoading.value = true;
  await loadArticleList(() => {
    initLoading.value = false;
  });
});
</script>

<template>
  <div :class="classes">
    <ArticleList :dataSource="dataSource" :loading="initLoading" />
    <div class="spin-wrap">
      <Spin :loading="articleLoading" dot :tip="$t('global.loadding.title')"></Spin>
    </div>
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-article-list{
  padding: 0 16px 12px;
  background-color: #fff;
  border-radius: 2px;

  .spin-wrap {
    padding-top: 24px;
    height: 100px;
  }
}
</style>
