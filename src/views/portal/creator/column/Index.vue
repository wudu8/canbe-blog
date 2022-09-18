<script setup lang="ts">
import { useClasses } from '@/hooks';

const classes = useClasses('creator-column');
</script>

<template>
  <div :class="classes"> 专栏管理 </div>
</template>

<style lang="less" scoped>
// .@{app-prefix}-creator-column {
// }
</style>
