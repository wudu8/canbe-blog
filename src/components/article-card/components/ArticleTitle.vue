<script setup lang="ts">
import type { ArticleListContext } from '../token';

import { t } from '@/locale';
import { useClasses } from '@/hooks';
import { useAppStore } from '@/store';
import { ArticleDataSource } from '../types';
import { ArticleListToken } from '../token';

interface Props {
  item: ArticleDataSource;
  showTag?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showTag: true
});
const itemPushRef = ref<HTMLElement>();
const classes = useClasses('item-title');
const appStore = useAppStore();
const articleContext = inject<ArticleListContext>(ArticleListToken);

const title = computed(() => props.item.blogTitle ?? t('component.article.card.no_title'));
const articlePath = computed(
  () => articleContext?.itemConfig?.getHref?.(props.item) ?? '/article/details/' + props.item.id
);
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
    <a ref="itemPushRef" :href="`${articlePath}`" target="_blank" :class="`${classes}-href`">
      <a-tag v-if="beforeTag && showTag" :color="beforeTag.color" size="small" class="before-tag">
        {{ beforeTag.label }}
      </a-tag>
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
  &.mobile-title &-href {
    font-size: 14px;
  }

  &-href {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
    color: @title-text-color;

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
