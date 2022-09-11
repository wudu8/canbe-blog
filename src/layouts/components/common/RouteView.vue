<script lang="ts" setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useClasses } from '@/hooks';
import { pathEnum } from '@/router';

import Home from '@/views/portal/home/Index.vue';

interface Props {
  haveClass?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  haveClass: true
});

const currentRouter = useRoute();
const contentClasses = useClasses('blog-layout-content');

const isHome = computed(() => currentRouter.fullPath === pathEnum.home);
</script>

<template>
  <div :class="{ [contentClasses]: props.haveClass }">
    <router-view v-if="!isHome" />
    <Home v-else />
  </div>
</template>
