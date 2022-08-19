<script setup lang="ts">
import type { SiderCardData } from '@/components/article-type';

import { ref, onMounted } from 'vue';
import { useClasses } from '@/hooks';
import { getArticleType } from '@/apis/article';

import SiderCard from '@/components/article-type';

const classes = useClasses('siderbar');

const dataSource = ref<SiderCardData[]>();
const loading = ref(false);

onMounted(() => {
  loading.value = true;
  getArticleType().then(res => {
    if (res.isSuccess) {
      dataSource.value = res.data;
    }
    loading.value = false;
  });
});
</script>

<template>
  <div :class="classes">
    <a-space direction="vertical" size="medium" fill>
      <SiderCard :dataSource="dataSource" :loading="loading" class="sds" />
      <SiderCard :dataSource="dataSource" :loading="loading" />
      <SiderCard :dataSource="dataSource" :loading="loading" />
    </a-space>
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-siderbar{
  flex-shrink: 0;
}
</style>
