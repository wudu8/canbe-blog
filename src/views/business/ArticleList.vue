<script setup lang="ts">
import type { ArticleData } from '@/apis/article/types';
import type { ArticleItemConfig } from '@/components/article-card';

import type { PortalLayoutProvide } from '@/layouts/const';

import { ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { pathEnum } from '@/router/path';
import { useClasses } from '@/hooks';
import { getArticleList, deleteArticle } from '@/apis/article';
import { useLayoutScroll } from '@/layouts/hooks/useScroll';
import { portalLayoutToken } from '@/layouts/const';
import { getAllImage } from '@/components/editor/utils';
import { ArticleMode } from '@/apis/article';

import ArticleList from '@/components/article-card';
import Spin from '@/components/box-spin/Spin.vue';

interface Props {
  params?: ArticleData;
  layoutToken?: symbol;
  itemConfig?: ArticleItemConfig;
}
const props = withDefaults(defineProps<Props>(), {
  params: () => {
    return {} as ArticleData;
  },
  layoutToken: portalLayoutToken,
  itemConfig: () => {
    return {
      hiddenActions: true
    };
  }
});

const articleLoading = ref(false);
const initLoading = ref(false);

const classes = useClasses('article-list');
const router = useRouter();

const dataSource = ref<ArticleData[]>([]);

const { toBottom, isScrolling } = useLayoutScroll<PortalLayoutProvide>(props.layoutToken);

const loadArticleList = async (cb?: Fn) => {
  getArticleList(props.params).then(res => {
    if (res.success) {
      dataSource.value.push(...res.result);
      cb && nextTick(cb);
    }
  });
};

const handleupdateItem = (record: ArticleData) => {
  dataSource.value.forEach((item, index) => {
    if (item.id === record.id) {
      dataSource.value[index] = record;
    }
  });
};

const handleDelete = (record: ArticleData) => {
  // 先删除图片
  const deletedImages = getAllImage(record.contetnt, record.blogEditType === ArticleMode.md);
  console.log('deletedImages: ', deletedImages);
  // 再删除文章
  deleteArticle(record.id).then(res => {
    if (res.success && res.result) {
      const index = dataSource.value.findIndex(item => item.id === record.id);
      index !== -1 && dataSource.value.splice(index, 1);
    }
  });
};

const handleEdit = (record: ArticleData) => {
  router.push({
    path: pathEnum.editArticle,
    query: {
      articleId: record.id
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

defineExpose({
  loadData: loadArticleList
});
</script>

<template>
  <div :class="classes">
    <ArticleList
      :dataSource="dataSource"
      :loading="initLoading"
      :itemConfig="itemConfig"
      @updateItem="handleupdateItem"
    >
      <template #actions="{ row }" v-if="!props.itemConfig?.hiddenActions">
        <div class="actions-wrap">
          <a-button type="text" @click.stop="handleEdit(row)"><icon-edit /></a-button>
          <a-button type="text" @click.stop="handleDelete(row)"><icon-delete /></a-button>
        </div>
      </template>
    </ArticleList>
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

  .actions-wrap {
    display: flex;

    .arco-btn {
      padding: 0 8px;
      font-size: 16px;
    }
  }
}
</style>
