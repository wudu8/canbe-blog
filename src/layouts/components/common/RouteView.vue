<script lang="ts" setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useClasses } from '@/hooks';
import { pathEnum } from '@/router';

import Home from '@/views/portal/home/Index.vue';

const currentRouter = useRoute();
const contentClasses = useClasses('content');

const isHome = computed(() => currentRouter.fullPath === pathEnum.home);
</script>

<template>
  <div :class="contentClasses">
    <router-view v-if="!isHome" />
    <Home v-else />
  </div>
</template>
