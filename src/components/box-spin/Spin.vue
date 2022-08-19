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
  setup(props, { attrs, slots }) {
    const bindProps = computed(() => {
      return {
        ...props,
        ...attrs
      };
    });
    const showWrapper = computed(() => {
      return (!slots.default && bindProps.value.loading) || slots.default;
    });
    return { bindProps, showWrapper };
  }
});
</script>

<template>
  <div class="box-wrapper" v-if="showWrapper">
    <a-spin v-if="$slots.default" v-bind="bindProps">
      <slot></slot>
    </a-spin>
    <a-spin v-else-if="bindProps.loading" v-bind="bindProps" />
  </div>
</template>

<style lang="less" scope>
.box-wrapper {
  width: 100%;

  .arco-spin {
    width: 100%;
  }
}
</style>
