<!--
 * @Author: zkr
 * @Date: 2022-09-19 14:16:36
 * @LastEditors: zkr
 * @LastEditTime: 2022-09-26 15:42:17
 * @FilePath: \canbe-blog\src\views\portal\creator\statistics\release.vue
-->
<script setup lang="ts">
import { useClasses } from '@/hooks';
import TipsPopover from '@/components/tips-popover/index.vue';
import { t } from '@/locale';

const classes = useClasses('creator-statistics-release');
</script>

<template>
  <a-card :class="classes" :bordered="false" hoverable>
    <template #title>
      <span :class="[`${classes}-title`, 'windi-mr-1']">{{
        t('portal.creator.statistics.release')
      }}</span>
      <TipsPopover :content="t('portal.creator.statistics.release.tips')"></TipsPopover>
    </template>
    <div :class="[`${classes}-body`]">
      <a-empty />
    </div>
  </a-card>
</template>

<style lang="less" scoped></style>
