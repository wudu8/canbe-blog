<script setup lang="ts">
// import { useTabBarStore } from '@/store';

// const tabBarStore = useTabBarStore();

// const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition name="fade" mode="out-in" appear>
        <!-- <keep-alive v-if="route.meta.keepAlive" :include="cacheList"> -->
        <keep-alive v-if="route.meta.keepAlive">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </router-view>
</template>
