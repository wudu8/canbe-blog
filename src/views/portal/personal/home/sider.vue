<!--
 * @Author: zkr
 * @Date: 2022-09-27 20:57:29
 * @LastEditors: zkr
 * @LastEditTime: 2022-09-28 15:19:13
 * @FilePath: \canbe-blog\src\views\portal\personal\sider.vue
-->
<script lang="ts" setup>
import { useClasses } from '@/hooks';

const classes = useClasses('personal-sider');

interface ILabelItems {
  label: string;
  value: number | string;
}

const focusItems: ILabelItems[] = [
  {
    label: '已关注',
    value: 10
  },
  {
    label: '关注者',
    value: 5
  }
];

const othersItems: ILabelItems[] = [
  {
    label: '收藏文章',
    value: 30
  },
  {
    label: '关注标签',
    value: 10
  },
  {
    label: '加入时间',
    value: '2022-9-28'
  }
];
</script>

<template>
  <div :class="classes">
    <div :class="[`${classes}-grade`, 'windi-bg-white windi-mb-4']">
      <div :class="[`${classes}-grade-title`, 'windi-p-4 windi-text-base windi-font-bold']">
        个人成就
      </div>
      <div :class="[`${classes}-grade-details`, 'windi-p-4']">
        <div :class="['description', 'windi-text-sm']">创作篇数：15</div>
        <div :class="['description', 'windi-text-sm windi-my-2']">
          创作等级：
          <icon-bytedance-color /> 7
        </div>
        <div :class="['description', 'windi-text-sm']">
          获得勋章：
          <icon-tiktok-color />
        </div>
      </div>
    </div>
    <div :class="[`${classes}-focus`, 'windi-bg-white windi-my-4 windi-py-4 windi-flex']">
      <div
        v-for="(item, index) in focusItems"
        :key="index"
        :class="[`${classes}-focus-items`, 'windi-w-1/2 windi-text-center windi-text-base']"
      >
        <div class="windi-mb-1 windi-font-bold">{{ item.label }}</div>
        <div class="numbers">{{ item.value }}</div>
      </div>
    </div>
    <div :class="[`${classes}-others`]">
      <div
        v-for="(item, index) in othersItems"
        :key="index"
        :class="[
          `${classes}-others-items`,
          'windi-text-base windi-flex windi-items-center windi-justify-between windi-font-medium'
        ]"
      >
        <span>{{ item.label }}</span>
        <span>{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scope>
.@{app-prefix}-personal-sider {
  width: 300px;

  &-grade,
  &-focus {
    box-shadow: @box-base-shadow;
  }

  &-grade {
    &-title {
      border-bottom: 1px solid @box-underline-color;
    }

    &-details {
      .description {
        color: @sub-text-color;
      }
    }
  }

  &-focus-items {
    &:first-child {
      border-right: 1px solid @box-underline-color;
    }

    .numbers {
      color: @sub-text-color;
    }
  }

  &-others {
    border-top: 1px solid @box-underline-color;

    &-items {
      height: 50px;
      border-bottom: 1px solid @box-underline-color;
    }
  }
}
</style>
