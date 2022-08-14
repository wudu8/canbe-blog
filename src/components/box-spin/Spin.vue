<script lang="ts">
import { defineComponent, computed } from 'vue';

import { Spin } from '@arco-design/web-vue';

export default defineComponent({
  name: 'BoxSpin',
  extends: Spin,
  props: {
    dot: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs }) {
    const bindProps = computed(() => {
      return {
        ...props,
        ...attrs
      };
    });
    return { bindProps };
  }
});
</script>

<template>
  <div class="box-wrapper">
    <a-spin v-if="$slots.default" v-bind="bindProps">
      <slot></slot>
    </a-spin>
    <a-spin v-else v-bind="bindProps" />
  </div>
</template>

<style lang="less" scope>
.box-wrapper {
  width: 100%;
  text-align: center;
}
</style>
