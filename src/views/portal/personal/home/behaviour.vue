<!--
 * @Author: zkr
 * @Date: 2022-09-27 11:51:24
 * @LastEditors: zkr
 * @LastEditTime: 2022-10-01 10:04:23
 * @FilePath: \canbe-blog\src\views\portal\personal\home\behaviour.vue
-->
<script lang="ts" setup>
import { useClasses } from '@/hooks';
import { useAppStore } from '@/store';

const classes = useClasses('personal-behaviour');
const appStore = useAppStore();
const tabsList: string[] = ['动态', '文章', '专栏', '收藏集', '草稿箱', '关注'];
</script>

<template>
  <a-tabs
    :class="[`${classes}${appStore.isMobile ? '-mobile' : ''}`, 'windi-bg-white']"
    default-active-key="0"
  >
    <a-tab-pane v-for="(item, index) in tabsList" :key="index" :title="item">
      <a-empty />
    </a-tab-pane>
  </a-tabs>
</template>

<style lang="less" scope>
.@{app-prefix}-personal-behaviour {
  box-shadow: @box-base-shadow;
}
</style>
