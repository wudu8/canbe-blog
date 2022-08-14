<script setup lang="ts">
import { useClasses } from '@/hooks';

interface Props {
  data: string[];
}
const props = withDefaults(defineProps<Props>(), {});

const classes = useClasses('iot');
</script>

<template>
  <span>
    <span v-for="(item, index) in props.data" :key="index" :class="classes">
      <span class="divider" v-if="index !== 0">·</span>
      {{ item }}
    </span>
  </span>
</template>

<style lang="less" scope>
.@{app-prefix}-iot {
  .divider {
    padding: 0 8px;
  }
}
</style>
