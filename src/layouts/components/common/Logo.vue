<script lang="ts" setup>
import { useAppStore } from '@/store';
import { useClasses } from '@/hooks';

interface LogoProps {
  systemTitle: string;
}
const props = withDefaults(defineProps<LogoProps>(), {});

const appStore = useAppStore();
const logoClasses = useClasses('logo');
const titleClasses = useClasses('title');
</script>
<template>
  <div class="logo-wrapper">
    <img :src="appStore.logo" alt="logo" :class="logoClasses" />
    <span :class="titleClasses">
      {{ props.systemTitle }}
    </span>
  </div>
</template>

<style lang="less" scoped>
.logo-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;

  .@{app-prefix}-logo {
    width: auto;
    height: 34px;
  }

  .@{app-prefix}-title {
    font-size: 22px;
  }
}
</style>
