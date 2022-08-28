<script setup lang="ts">
import { computed, ref } from 'vue';
import { useClasses } from '@/hooks';
import { useAppStore } from '@/store';
import { ArticleListData } from '../types';

interface Props {
  item: ArticleListData;
  showTag?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showTag: true
});
const itemPushRef = ref<HTMLElement>();
const classes = useClasses('item-title');
const appStore = useAppStore();

const title = computed(() => props.item.title);
const articlePath = computed(() => props.item.articlePath);
const beforeTag = computed(() => props.item.beforeTag);
const afterTag = computed(() => props.item.afterTag);

const handleClick = () => {
  itemPushRef.value?.click();
};

defineExpose({
  click: handleClick
});
</script>

<template>
  <div :class="{ [classes]: true, 'mobile-title': appStore.isMobile }">
    <a ref="itemPushRef" :href="`/${articlePath}`" target="_blank" :class="`${classes}-href`">
      <a-tag v-if="beforeTag && showTag" :color="beforeTag.color" size="small" class="before-tag">
        {{ beforeTag.label }} </a-tag
      >v
      <span :class="`${classes}-href-ellipsis`">
        {{ title }}
      </span>
      <a-tag v-if="afterTag && showTag" :color="afterTag.color" size="small" class="after-tag">
        {{ afterTag.label }}
      </a-tag>
    </a>
  </div>
</template>

<style lang="less" scope>
.@{app-prefix}-item-title {
  &.mobile-title .canbe-item-title-href {
    font-size: 14px;
  }

  &-href {
    display: flex;
    align-items: center;
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
    color: @base-text-color;

    &:visited {
      color: @visited-text-color;
    }
  }

  &-href-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .before-tag {
    margin-right: 8px;
  }

  .after-tag {
    margin-left: 8px;
  }

  .before-tag,
  .after-tag {
    flex-shrink: 0;
  }
}
</style>
