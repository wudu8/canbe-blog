<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useClasses } from '@/hooks';
import { useAppStore } from '@/store';

import SiderBar from './components/SiderBar.vue';
import ArticleList from '@/views/business/ArticleList.vue';

const listRef = ref<InstanceType<typeof ArticleList>>();

const classes = useClasses('home');
const appStore = useAppStore();

onMounted(() => {
  listRef.value?.loadData();
});
</script>

<template>
  <div :class="classes">
    <div :class="`${classes}-list-container`">
      <ArticleList ref="listRef" />
    </div>
    <SiderBar v-if="!appStore.isMobile" :class="`${classes}-siderbar`" />
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
