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
    {{ props.systemTitle }} ©{{ appStore.year }}
  </a-layout-footer>
</template>

<style lang="less" scoped>
.@{app-prefix}-footer{
  height: @protal-footer-height;
  line-height: @protal-footer-height;
  text-align: center;
  background: @protal-footer-background;
}
</style>
