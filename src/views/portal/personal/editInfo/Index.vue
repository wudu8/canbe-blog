<!--
 * @Author: zkr
 * @Date: 2022-09-29 15:58:48
 * @LastEditors: zkr
 * @LastEditTime: 2022-09-30 11:41:50
 * @FilePath: \canbe-blog\src\views\portal\personal\editInfo\Index.vue
-->
<script lang="ts" setup>
import { useClasses } from '@/hooks';
// import { useAppStore } from '@/store';

// const appStore = useAppStore();

const classes = useClasses('personal-setting');
</script>

<template>
  <div
    :class="[
      `${classes}-goback`,
      'windi-w-full windi-h-11 windi-leading-10 windi-px-4 windi-bg-white'
    ]"
  >
    <a-link status="danger" :class="['link']" :hoverable="false">
      <icon-left />
      返回个人主页
    </a-link>
  </div>
  <div :class="[`${classes}-details`, 'windi-mt-4 windi-p-4 windi-bg-white']">123</div>
</template>
<style lang="less" scope>
.@{app-prefix}-personal-setting {
  width: 100%;

  &-goback {
    box-shadow: @box-base-shadow;

    .link {
      color: gray;
    }
  }

  &-details {
    box-shadow: @box-base-shadow;
  }
}
</style>
