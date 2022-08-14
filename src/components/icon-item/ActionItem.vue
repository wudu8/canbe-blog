<script setup lang="ts">
import { useClasses } from '@/hooks';

interface Props {
  label: CKey;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const classes = useClasses('actions-item');
</script>

<template>
  <div :class="{ [classes]: true, 'primary-color-hover': !props.disabled }">
    <span class="item-icon">
      <slot></slot>
    </span>
    <span class="item-label">
      {{ props.label }}
    </span>
  </div>
</template>

<style lang="less" scope>
.@{app-prefix}-actions-item {
  display: inline-block;
  color: @sub-text-color;
  cursor: pointer;

  .item-icon {
    font-size: 16px;
  }

  .item-label {
    padding-left: 4px;
    font-size: 14px;
  }
}
</style>
