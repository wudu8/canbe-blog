<script setup lang="ts">
import type { ArticleData } from '@/apis/article/types';

import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useClasses } from '@/hooks';
import { t } from '@/locale';
import { compareDeletedImage } from '@/components/editor/utils';
import { getArticle, updateArticle, insertArticle, ArticleMode } from '@/apis/article';

import RichEditor from '@/components/editor/rich/RichEditor.vue';
import MdEditor from '@/components/editor/md/MdEditor.vue';
import EditorHeader from '@/components/editor/header/EditorHeader.vue';
import Spin from '@/components/box-spin/Spin.vue';

const currentRouter = useRoute();
const classes = useClasses('md-wrapper');

const saveingBackup = ref<boolean>();
const isMdMode = ref<boolean>(true);
const loading = ref<boolean>(true);
const currentArticleId = ref<string>();
const articleTitle = ref<string>('');
const mdContent = ref<string>('');
const richContent = ref<string>('');
let initContent = '';

const headerTip = computed(() => {
  if (saveingBackup.value === undefined) {
    return t('portal.editor.header.auto_save_backup');
  } else {
    return saveingBackup.value
      ? t('portal.editor.header.auto_saveing')
      : t('portal.editor.header.auto_saved');
  }
});

const handleSwitch = (isMd: boolean) => {
  isMdMode.value = isMd;
};

const saveData = (contetnt: string) => {
  const data = {
    blogContent: contetnt
  } as ArticleData;
  if (currentArticleId.value) {
    return updateArticle(data);
  } else {
    return insertArticle(data);
  }
};

const handlePublish = () => {
  const contetnt = isMdMode.value ? mdContent.value : richContent.value;
  const deletedImages = compareDeletedImage(contetnt, initContent, isMdMode.value);
  console.log('deletedImages: ', deletedImages);
  saveData(contetnt).then(_res => {
    // if (res.success) {
    // }
  });
};
const handleDrafts = () => {};

onMounted(() => {
  const articleId = currentRouter.query.articleId as string;
  if (articleId) {
    getArticle(articleId).then(res => {
      if (res.success) {
        const article = res.result;
        currentArticleId.value = article.id;
        articleTitle.value = article.blogTitle;
        if (article.blogEditType === ArticleMode.md) {
          isMdMode.value = true;
          mdContent.value = article.blogContent;
        } else {
          isMdMode.value = false;
          richContent.value = article.blogContent;
        }
        initContent = article.blogContent;
      }
      loading.value = false;
    });
  } else {
    loading.value = false;
  }
});
</script>

<template>
  <div :class="classes">
    <Spin :loading="loading">
      <EditorHeader
        :is-md="isMdMode"
        v-model:title="articleTitle"
        :tip="headerTip"
        :placeholder="$t('portal.editor.header.placeholder')"
        class="editor-header-flex"
        @switch="handleSwitch"
        @publish="handlePublish"
        @drafts="handleDrafts"
      />
      <div class="editor-body">
        <MdEditor v-if="isMdMode" v-model="mdContent" class="md-editor" />
        <RichEditor v-else v-model="richContent" class="rich-editor" />
      </div>
    </Spin>
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-md-wrapper {
  height: 100%;

  .editor-header-flex {
    flex-shrink: 0;
  }

  .editor-body {
    flex: 1;
    height: calc(100vh - 64px);
  }

  .rich-editor {
    height: 100%;
  }

  .md-editor {
    &,
    & > :deep(.bytemd) {
      height: 100%;
    }
  }
}
</style>
