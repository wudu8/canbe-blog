<!--
 * @Author: zkr
 * @Date: 2022-09-26 16:16:52
 * @LastEditors: zkr
 * @LastEditTime: 2022-10-01 09:49:35
 * @FilePath: \canbe-blog\src\views\portal\personal\Index.vue
-->
<script lang="ts" setup>
import { useClasses } from '@/hooks';
import InfoPanel from './home/infoPanel.vue';
import Behaviour from './home/behaviour.vue';
import Sider from './home/sider.vue';
import { useAppStore } from '@/store';

const classes = useClasses('personal');
const appStore = useAppStore();
</script>

<template>
  <div :class="[classes, 'windi-flex windi-flex-auto windi-gap-x-4']">
    <div :class="[`${classes}-content${appStore.isMobile ? '-mobile' : ''}`]">
      <InfoPanel class="windi-mb-4"></InfoPanel>
      <Behaviour></Behaviour>
    </div>
    <div v-if="!appStore.isMobile" :class="[`${classes}-sider`, '!windi-p-4']">
      <Sider></Sider>
    </div>
  </div>
</template>

<style lang="less" scope>
@personal-sider-width: 300px;
@personal-content-width: calc(100% - @personal-sider-width);

.@{app-prefix}-personal {
  width: 100%;

  &-content {
    width: @personal-content-width;
  }

  &-content-mobile {
    width: 100vw;
  }

  &-sider {
    position: fixed;
    top: calc(@portal-header-height + @layout-space);
    right: calc((100% - 1380px) / 2 - 1rem);
    width: @personal-sider-width;
    height: 200px;
  }
}
</style>
