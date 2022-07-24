<script lang="ts" setup>
import { useAppStore } from '@/store';

// import Menu from '@/components/menu/index.vue';
import Logo from '../common/Logo.vue';

const appStore = useAppStore();
</script>
<template>
  <a-layout-header>
    <Logo :systemTitle="appStore.protalTitle" />
    <div class="menu-wrapper inline-block">
      <!-- <Menu /> -->
    </div>
  </a-layout-header>
</template>

<style></style>
