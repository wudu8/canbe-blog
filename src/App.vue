<script setup lang="ts">
import { RouterView } from 'vue-router';
import { computed } from 'vue';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import { useLocale, changeLocaleByUrl } from '@/hooks';
import { LocaleEnum } from '@/locale';

changeLocaleByUrl();

const { currentLocale } = useLocale();

const locale = computed(() => {
  switch (currentLocale.value) {
    case LocaleEnum.zhCN:
      return zhCN;
    case LocaleEnum.enUS:
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
  overflow: hidden;
  background: @background-base;
}
</style>
