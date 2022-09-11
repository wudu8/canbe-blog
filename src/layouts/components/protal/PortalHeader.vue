<script lang="ts" setup>
import { useAppStore } from '@/store';
import { useClasses } from '@/hooks';

// import Menu from '@/components/menu/index.vue';
import TopMenu from './TopMenu.vue';
import Logo from '../common/Logo.vue';
import HeaderRight from './HeaderRight.vue';

interface Props {
  isCreator?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isCreator: false
});

const appStore = useAppStore();
const classes = useClasses('header');
</script>
<template>
  <a-layout-header :class="{ [classes]: true, 'header-shadow': true }">
    <div :class="{ mobile: appStore.isMobile }" class="header-content">
      <Logo :systemTitle="appStore.protalTitle" :showTitle="!appStore.isMobile" />
      <TopMenu v-if="!props.isCreator" />
      <div v-else class="creator-title">{{ $t('protal.creator.title') }}</div>
      <HeaderRight :is-creator="isCreator" />
    </div>
  </a-layout-header>
</template>

<style lang="less" scoped>
.@{app-prefix}-header{
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: @protal-header-height;
  line-height: @protal-header-height;
  background: @protal-header-background;
  transition: all 0.2s;

  .header-content {
    height: 100%;
    display: flex;
    justify-content: space-between;

    :deep(.logo-wrapper) {
      flex-shrink: 0;
    }

    &.mobile {
      padding: 0 8px;
    }

    .creator-title {
      color: @primary-color;
      font-size: 18px;
      width: 100%;
      padding-left: 24px;
    }
  }

  &.header-shadow {
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  }
}
</style>
