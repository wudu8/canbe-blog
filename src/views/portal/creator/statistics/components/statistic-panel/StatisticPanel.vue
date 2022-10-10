<!--
 * @Author: zkr
 * @Date: 2022-09-19 19:00:10
 * @LastEditors: zkr
 * @LastEditTime: 2022-09-26 16:21:27
 * @FilePath: \canbe-blog\src\views\portal\creator\statistics\components\statistic-panel\StatisticPanel.vue
-->
<script lang="ts">
import { useClasses } from '../../../../../../hooks';
import { defineComponent } from 'vue';
import { useAppStore } from '../../../../../../store';
import { statisticPanelProps } from './types';

export default defineComponent({
  name: 'StatisticCard',
  props: statisticPanelProps,
  setup(props) {
    const classes = useClasses('statistic-item');
    const appStore = useAppStore();
    return {
      classes,
      props,
      appStore
    };
  }
});
</script>

<template>
  <div
    :class="[
      classes,
      `windi-h-full ${appStore.isMobile ? 'windi-p-3' : 'windi-p-4'} windi-flex-auto`
    ]"
  >
    <div
      :class="[
        `${classes}-header`,
        'windi-flex windi-flex-none windi-flex-nowrap windi-items-center'
      ]"
    >
      <div v-if="props.title" :class="[`${classes}-header-title`, 'windi-mr-1']">
        {{ props.title }}
      </div>
    </div>
    <div :class="[`${classes}-content`, 'windi-font-black windi-text-4xl']">
      {{ props.dataSource.total }}
    </div>
    <div :class="[`${classes}-footer`, 'windi-flex windi-text-xs']" v-if="props.isFooter">
      <slot name="footer" :dataSource="props.dataSource" v-if="props.isFooter">
        <div :class="`${classes}-footer-label`">
          {{ $t('portal.creator.statistics.components.statisticpanel.lastday') }}
        </div>
        <div
          :class="[
            `${classes}-footer-value`,
            'windi-ml-2',
            props.dataSource.lastday > 0 ? 'windi-text-red-600' : 'windi-text-green-400'
          ]"
        >
          {{ props.dataSource.lastday || ' --' }}
        </div>
      </slot>
    </div>
  </div>
</template>
<style lang="less" scope>
.@{app-prefix}-statistic-item {
  background-color: #f7f8fa;
  width: calc((100% - 2rem) / 3);

  &-content {
    line-height: 3.5rem;
  }
}
</style>
