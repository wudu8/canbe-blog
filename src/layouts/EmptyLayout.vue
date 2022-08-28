<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { useResponsive, useClasses, useLocale } from '@/hooks';
import { useAppStore } from '@/store';

useResponsive(true);
const appStore = useAppStore();
const { currentLocale } = useLocale();
const contentClasses = useClasses('default-layout');
</script>

<template>
  <div :class="{ [contentClasses]: true, [appStore.device]: true, [currentLocale]: true }">
    <router-view />
  </div>
</template>
