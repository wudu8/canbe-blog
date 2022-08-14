<script setup lang="ts">
import type { ArticleListData } from '@/components/article-card';

import { ref } from 'vue';
import { useClasses } from '@/hooks';

import ArticleList from '@/components/article-card';
import Spin from '@/components/box-spin/Spin.vue';
import Logo from '@images/logo.png';

const articleLoading = ref(true);
const initLoading = ref(true);

const classes = useClasses('article-list');

const dataSource = ref<ArticleListData[]>([]);

setTimeout(() => {
  dataSource.value = [
    {
      id: 1,
      title: '前端',
      articlePath: 'sdads',
      description: '啊实打实大苏打实打实大苏打实打实的',
      thumb: Logo,
      viewNum: 215,
      likeNum: 354,
      commentNum: 183,
      author: '字节猿',
      dateTime: '2022-05-12',
      tags: ['前端', 'js']
    },
    {
      id: 2,
      title:
        '啊实打实大苏打实打实大苏打实打实的啊实打实大苏打实打实大苏打实打实的啊实打实大苏打实打实大苏打实打实的啊实打实大苏打实打实大苏打实打实的啊实打实大苏打实打实大苏打实打实的实大苏打实打实大苏打实打实的',
      articlePath: 'qweqdsz',
      description: '啊实打实大苏打实打实大苏打实打实的',
      thumb: Logo,
      viewNum: 215,
      likeNum: 354,
      commentNum: 183,
      author: '字节猿',
      dateTime: '2022-05-12',
      tags: ['前端', 'js'],
      beforeTag: {
        color: 'red',
        label: '原力计划'
      },
      afterTag: {
        color: 'red',
        label: '千次阅读'
      }
    },
    {
      id: 3,
      title: 'Java',
      articlePath: 'afgdfds',
      description: '啊实打实大苏打实打实大苏打实打实的',
      thumb: Logo,
      viewNum: 215,
      likeNum: 354,
      commentNum: 183,
      author: '字节猿',
      dateTime: '2022-05-12',
      tags: ['前端', 'js']
    }
  ];
}, 0);
</script>

<template>
  <div :class="classes">
    <ArticleList :dataSource="dataSource" :loading="initLoading" />
    <Spin :loading="articleLoading" dot class="spin-wrap" />
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-article-list{
  padding: 0 16px 12px;
  background-color: #fff;
  border-radius: 2px;

  .spin-wrap {
    margin: 24px 0;
  }
}
</style>
