<script lang="ts" setup>
import { useAppStore } from '@/store';
import { useClasses } from '@/hooks';

interface LogoProps {
  systemTitle: string;
}
const props = withDefaults(defineProps<LogoProps>(), {});

const appStore = useAppStore();
const footerClasses = useClasses('footer');
</script>
<template>
  <a-layout-footer :class="footerClasses">
    Copyright © {{ appStore.year }} - By {{ props.systemTitle }}
  </a-layout-footer>
</template>

<style lang="less" scoped>
.@{app-prefix}-footer{
  height: @protal-footer-height;
  padding-top: 48px;
  line-height: calc(@protal-footer-height - 48px);
  text-align: center;
  background: @protal-footer-background;
}
</style>
