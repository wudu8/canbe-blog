<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useClasses } from '@/hooks';
import { t } from '@/locale';
import { getDeletedImage } from '@/components/editor/utils';
import { getArticleById, ArticleMode } from '@/apis/article';

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
    return t('protal.editor.header.auto_save_backup');
  } else {
    return saveingBackup.value
      ? t('protal.editor.header.auto_saveing')
      : t('protal.editor.header.auto_saved');
  }
});

const handleSwitch = (isMd: boolean) => {
  isMdMode.value = isMd;
};
const handlePublish = () => {
  const contetnt = isMdMode.value ? mdContent.value : richContent.value;
  const deletedImages = getDeletedImage(contetnt, initContent, isMdMode.value);
  console.log('deletedImages: ', deletedImages);
};
const handleDrafts = () => {};

onMounted(() => {
  const articleId = currentRouter.query.articleId as string;
  if (articleId) {
    currentArticleId.value = articleId;
    getArticleById(articleId).then(res => {
      if (res.success) {
        const article = res.result;
        articleTitle.value = article.title;
        if (article.mode === ArticleMode.md) {
          isMdMode.value = true;
          mdContent.value = article.content;
        } else {
          isMdMode.value = false;
          richContent.value = article.content;
        }
        initContent = article.content;
      }
      loading.value = false;
    });
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
        :placeholder="$t('protal.editor.header.placeholder')"
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
