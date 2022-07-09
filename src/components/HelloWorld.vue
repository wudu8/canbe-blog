<script>
import { defineComponent, computed } from 'vue';
import useDemo from '@/store/hooks/useDemo';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  setup() {
    const store = useDemo(),
      count = computed(() => store.count);

    return {
      count,
      inCrement: () => store.inCrement()
    };
  }
});
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="inCrement">count is:</button>
  <p>{{ count }}</p>
</template>

<style lang="less" scoped></style>
