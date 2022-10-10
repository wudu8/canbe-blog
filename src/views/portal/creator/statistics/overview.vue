<!--
 * @Author: zkr
 * @Date: 2022-09-19 14:16:36
 * @LastEditors: zkr
 * @LastEditTime: 2022-09-26 16:23:20
 * @FilePath: \canbe-blog\src\views\portal\creator\statistics\overview.vue
-->
<script setup lang="ts">
import { useClasses } from '@/hooks';
import { Message } from '@arco-design/web-vue';
import TipsPopover from '@/components/tips-popover/index.vue';
import StatisticPanel from './components/statistic-panel/StatisticPanel.vue';
import { StatisticPanelPublicProps } from './components/statistic-panel/types';
import { t } from '@/locale';

const classes = useClasses('creator-statistics-overview');

const statisticData: StatisticPanelPublicProps[] = [
  {
    title: t('portal.creator.statistics.followers'),
    dataSource: {
      total: 10,
      lastday: 10
    }
  },
  {
    title: t('portal.creator.statistics.recommended'),
    dataSource: {
      total: 10,
      lastday: 10
    }
  },
  {
    title: t('portal.creator.statistics.readnumber'),
    dataSource: {
      total: 10,
      lastday: 10
    }
  },
  {
    title: t('portal.creator.statistics.likenumber'),
    dataSource: {
      total: 10,
      lastday: 10
    }
  },
  {
    title: t('portal.creator.statistics.commentsnumber'),
    dataSource: {
      total: 10,
      lastday: 10
    }
  },
  {
    title: t('portal.creator.statistics.collectnumber'),
    dataSource: {
      total: 10,
      lastday: 10
    }
  }
];

const loadMore = () => {
  Message.warning('统计功能正在开发中，敬请期待！');
};
</script>

<template>
  <a-card :class="classes" :bordered="false" hoverable>
    <template #title>
      <span :class="[`${classes}-title`, 'windi-mr-1']">{{
        t('portal.creator.statistics.overview')
      }}</span>
      <TipsPopover>
        <template #tipsContent>
          <p class="windi-font-bold">{{ t('portal.creator.statistics.overview.tips') }}</p>
          <p>文章展现数：文章卡片曝光给用户的次数</p>
        </template>
      </TipsPopover>
    </template>
    <template #extra>
      <a-link :hoverable="false" @click="loadMore">
        {{ t('global.loaded.more') }}
        <icon-right />
      </a-link>
    </template>
    <div :class="[`${classes}-body`, 'windi-flex windi-flex-wrap windi-gap-4']">
      <StatisticPanel
        v-for="(item, index) in statisticData"
        :key="index"
        :title="item.title"
        :isFooter="true"
        :dataSource="item.dataSource"
      >
      </StatisticPanel>
    </div>
  </a-card>
</template>

<style lang="less" scoped></style>
