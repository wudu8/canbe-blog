<script lang="ts" setup>
import { useAppStore } from '@/store';

interface LogoProps {
  systemTitle: string;
}
const props = withDefaults(defineProps<LogoProps>(), {});

const appStore = useAppStore();
</script>
<template>
  <div class="logo-wrapper">
    <a-space>
      <img :src="appStore.logo" alt="logo" class="canbe-logo" />
      <a-typography-title :style="{ margin: 0, fontSize: '18px' }" :heading="5">
        {{ props.systemTitle }}
      </a-typography-title>
    </a-space>
  </div>
</template>

<style lang="less" scoped>
.logo-wrapper {
  display: inline-block;

  .canbe-logo {
    width: auto;
    height: 34px;
  }
}
</style>
