<script setup lang="ts">
interface Props {
  emptyNum: number;
}
const props = withDefaults(defineProps<Props>(), {
  emptyNum: 5
});
</script>

<template>
  <div class="skeleton-wrapper">
    <a-list :bordered="false">
      <a-list-item v-for="num in props.emptyNum" :key="num">
        <a-skeleton :animation="true">
          <a-space direction="vertical" :style="{ width: '100%' }" size="large">
            <a-skeleton-shape />
            <a-skeleton-line :rows="3" />
          </a-space>
        </a-skeleton>
      </a-list-item>
    </a-list>
  </div>
</template>

<style lang="less" scope>
.skeleton-wrapper {
  padding: 12px 0;
}
</style>
