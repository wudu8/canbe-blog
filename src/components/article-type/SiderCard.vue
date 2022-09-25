<script lang="ts">
import { siderCardProps } from './types';
import Spin from '../box-spin/Spin.vue';

export default defineComponent({
  name: 'SiderCard',
  props: siderCardProps,
  components: { Spin }
});
</script>

<template>
  <a-card :bordered="false" size="small" class="article-type-card" title="Small size card">
    <template #title>
      <icon-book />
      <span class="article-title">{{ title }}</span>
    </template>
    <template #extra>
      <slot name="extra"></slot>
    </template>
    <Spin :loading="loading">
      <div class="article-type-list">
        <div v-for="item in dataSource" :key="item.id" class="article-type-item">
          <div class="article-type-name">{{ item.name }}</div>
          <div class="article-type-num">{{ item.num }}</div>
          <icon-right />
        </div>
      </div>
    </Spin>
  </a-card>
</template>

<style lang="less" scope>
.article-type-card {
  border-radius: 2px;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 5%);

  .arco-card-header {
    padding-right: 12px;
    padding-left: 12px;
  }

  .arco-card-header-title {
    font-size: 14px;
    font-weight: bold;
    color: @color-base-title;

    .article-title {
      margin-left: 4px;
    }
  }

  .arco-card-body {
    padding: 16px 8px;
  }

  .article-type-list {
    .article-type-item {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 8px;
      cursor: pointer;
      border-radius: 2px;

      &:hover {
        background-color: @background-primary-color;

        .article-type-name {
          padding-left: 14px;

          &::before {
            width: 10px;
          }
        }

        &,
        .article-type-num {
          color: @color-text-hover;
        }
      }

      .article-type-name {
        position: relative;
        flex: 1;
        transition: padding 0.3s ease-in-out;

        &::before {
          position: absolute;
          bottom: 50%;
          left: 0;
          width: 0;
          height: 1px;
          content: '';
          background-color: @color-text-hover;
          border-radius: 50%;
          transition: width 0.3s ease-in-out;
        }
      }

      .article-type-num {
        font-size: 12px;
        color: #7c7b80;
      }
    }
  }
}
</style>
