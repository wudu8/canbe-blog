<script lang="ts">
import { Spin } from '@arco-design/web-vue';
import { useClasses } from '@/hooks';

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

    const classes = useClasses('spin');
    return { bindProps, showWrapper, classes };
  }
});
</script>

<template>
  <a-spin v-if="$slots.default" v-bind="bindProps" :class="classes">
    <slot></slot>
  </a-spin>
  <a-spin v-else-if="bindProps.loading" v-bind="bindProps" :class="classes" />
</template>

<style lang="less" scope>
.@{app-prefix}-spin {
  width: 100%;
}
</style>
