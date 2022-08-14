<script setup lang="ts">
import { useClasses } from '@/hooks';

import ActionItem from '@/components/icon-item/ActionItem.vue';

interface Props {
  viewLabel: CKey;
  likeLabel: CKey;
  commentLabel: CKey;
}
const props = withDefaults(defineProps<Props>(), {});

const classes = useClasses('view-actions-list');
const handleLike = () => {};
</script>

<template>
  <div :class="classes">
    <a-space size="large">
      <ActionItem
        :label="props.viewLabel"
        :title="$t('component.article.action.view')"
        :disabled="true"
      >
        <icon-eye />
      </ActionItem>
      <ActionItem
        :label="props.likeLabel"
        :title="$t('component.article.action.like')"
        @click.stop="handleLike"
      >
        <icon-thumb-up />
      </ActionItem>
      <ActionItem
        :label="props.commentLabel"
        :title="$t('component.article.action.comment')"
        :disabled="true"
      >
        <icon-message />
      </ActionItem>
    </a-space>
  </div>
</template>

<style lang="less" scope>
.@{app-prefix}-view-actions-list {
  height: 32px;
  line-height: 32px;
}
</style>
