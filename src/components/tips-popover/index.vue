<!--
 * @Author: zkr
 * @Date: 2022-09-22 17:12:55
 * @LastEditors: zkr
 * @LastEditTime: 2022-09-26 14:52:16
 * @FilePath: \canbe-blog\src\components\tips-popover\index.vue
-->
<script lang="ts" setup>
import { useClasses } from '@/hooks';
import { useAppStore } from '@/store';

const classes = useClasses('icon-tips');
const appStore = useAppStore();

interface Props {
  position:
    | 'top'
    | 'tl'
    | 'tr'
    | 'bottom'
    | 'bl'
    | 'br'
    | 'left'
    | 'lt'
    | 'lb'
    | 'right'
    | 'rt'
    | 'rb';
  trigger:
    | 'hover'
    | 'click'
    | 'contextMenu'
    | 'focus'
    | ('hover' | 'click' | 'focus' | 'contextMenu')[];
  content: string;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'right',
  trigger: 'hover',
  content: 'Content'
});
</script>

<template>
  <a-popover
    :class="classes"
    :position="appStore.isMobile ? 'top' : 'right'"
    :trigger="appStore.isMobile ? 'click' : props.trigger"
  >
    <slot name="triggerElement">
      <icon-question-circle :class="`${classes}-icon`" />
    </slot>
    <template #content>
      <slot name="tipsContent">
        <p>{{ props.content }}</p>
      </slot>
    </template>
  </a-popover>
</template>

<style lang="less" scope>
.@{app-prefix}-home {
  width: 100%;
}
</style>
