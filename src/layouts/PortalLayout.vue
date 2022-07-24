<script lang="ts" setup>
import useResponsive from '@/hooks/useResponsive';

import RouteView from './components/common/RouteView.vue';
import Footer from './components/common/Footer.vue';
import PortalHeader from './components/protal/PortalHeader.vue';

useResponsive(true);
</script>
<template>
  <a-layout theme="light">
    <PortalHeader />
    <a-layout-content>
      <route-view />
    </a-layout-content>
    <Footer />
  </a-layout>
</template>

<style></style>
