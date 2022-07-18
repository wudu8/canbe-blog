<script setup lang="ts">
import { RouterView } from 'vue-router';
import { computed } from 'vue';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import { useLocale } from '@/hooks';

const { currentLocale } = useLocale();
const locale = computed(() => {
  switch (currentLocale.value) {
    case 'zh-CN':
      return zhCN;
    case 'en-US':
      return enUS;
    default:
      return enUS;
  }
});
</script>

<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<style lang="less">
#app {
  height: 100vh;
  background: @background-base;
}
</style>
