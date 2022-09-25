<script setup lang="ts">
import { useClasses } from '@/hooks';
import { getArticle, ArticleMode } from '@/apis/article';
import { setDocumentTitle } from '@/utils/document';

const isMdMode = ref<boolean>(true);
const loading = ref<boolean>(true);
const currentArticleId = ref<string>();
const articleTitle = ref<string>('');
const articleContent = ref<string>('');

const currentRouter = useRoute();
const classes = useClasses('article');

onMounted(() => {
  const articleId = currentRouter.params.id as string;
  if (articleId) {
    getArticle(articleId).then(res => {
      if (res.success) {
        const article = res.result;
        currentArticleId.value = article.id;
        articleTitle.value = article.blogTitle;
        isMdMode.value = article.blogEditType === ArticleMode.md;
        articleContent.value = article.blogContent;

        setDocumentTitle(article.blogTitle);
      }
      loading.value = false;
    });
  } else {
    loading.value = false;
  }
});
</script>

<template>
  <div :class="`${classes}-wrapper`">
    <div :class="`${classes}`"> </div>
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-home {
  display: flex;

  &-list-container {
    flex: 1;
    overflow: hidden;
  }

  &-siderbar {
    width: 300px;
    margin-left: @layout-space;
  }
}
</style>
