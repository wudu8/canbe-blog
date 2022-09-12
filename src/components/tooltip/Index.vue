<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useClasses } from '@/hooks';

import { Spin } from '@arco-design/web-vue';

export default defineComponent({
  name: 'BTooltip',
  extends: Spin,
  setup(props, { attrs }) {
    const bindProps = computed(() => {
      return {
        ...props,
        ...attrs
      };
    });
    const classes = useClasses('tooltip');
    return { bindProps, classes };
  }
});
</script>

<template>
  <a-tooltip
    v-bind="bindProps"
    background-color="#fff"
    :content-class="classes"
    :arrow-class="`${classes}-arrow`"
  >
    <slot></slot>
  </a-tooltip>
</template>

<style lang="less" scope>
.@{app-prefix}-tooltip {
  color: @text-base-color;
  box-shadow: 0 0 6px 1px rgb(0 0 0 / 10%);

  &-arrow {
    z-index: 1;
    box-shadow: -2px -2px 3px 0 rgb(0 0 0 / 6%);
  }
}
</style>
