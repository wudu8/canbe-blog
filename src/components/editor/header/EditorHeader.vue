<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { t } from '@/locale';
import { useControlledPropByEmit } from '@/hooks';
import { useAppStore } from '@/store';
import UserAvatar from '@/layouts/components/common/UserAvatar.vue';
import { pathEnum } from '@/router/path';

interface Props {
  placeholder?: string;
  title?: string;
  tip?: string;
  isMd: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const emits = defineEmits<{
  (event: 'switch', isMd: boolean): void;
  (event: 'publish'): void;
  (event: 'drafts'): void;
}>();

const modalVisible = ref(false);
const [titleValue, setTitle] = useControlledPropByEmit(props, 'title', '');
const appStore = useAppStore();
const router = useRouter();

const switchTip = computed(() =>
  props.isMd ? t('portal.editor.header.switch.rich') : t('portal.editor.header.switch.md')
);

const handleChange = (value: string) => {
  setTitle(value);
};

const handleSwitch = () => {
  handleModalStatus(true);
};

const handlePublish = () => {
  emits('publish');
};

const handleDrafts = () => {
  emits('drafts');
};
const handleModalStatus = (status = false) => {
  modalVisible.value = status;
};
const comfirmSwitch = () => {
  handleModalStatus(false);
  emits('switch', !props.isMd);
};
const backArticle = () => {
  router.push(pathEnum.creatorArticle);
};
</script>

<template>
  <div :class="{ 'mobile-editor-header': appStore.isMobile }" class="editor-header">
    <div class="editor-title-input-wrap">
      <div class="back-wrap" @click="backArticle">
        <icon-undo class="back-icon" />
        <div class="back-text">
          {{ $t('portal.creator_article.title') }}
        </div>
      </div>
      <a-input
        :model-value="titleValue"
        :placeholder="props.placeholder"
        class="editor-title-input"
        @update:model-value="handleChange"
      />
    </div>
    <div :class="['right-suffix', { mobile: appStore.isMobile }]">
      <div v-if="props.tip && !appStore.isMobile" class="tip-text">{{ props.tip }}</div>
      <a-button type="outline" @click="handleDrafts">{{ $t('portal.drafts.title') }}</a-button>
      <a-button type="primary" @click="handlePublish">{{
        $t('portal.editor.header.publish')
      }}</a-button>
      <b-tooltip :content="switchTip" position="br">
        <a-button type="text" status="normal" @click="handleSwitch">
          <icon-swap />
        </a-button>
      </b-tooltip>
      <UserAvatar />
    </div>
    <a-modal :visible="modalVisible" @ok="comfirmSwitch" @cancel="handleModalStatus" simple>
      <template #title>
        {{ switchTip }}
      </template>
      <div>{{ $t('portal.editor.header.switch.warning') }}</div>
    </a-modal>
  </div>
</template>

<style lang="less" scope>
@actions-wrapper-height: 32px;
@title-input-height: 64px;

.editor-header {
  display: flex;
  height: @title-input-height;
  padding: 0 12px;
  background-color: @background-base;
  gap: 12px;

  &.mobile-editor-header {
    flex-direction: column;
    height: calc(@title-input-height + @actions-wrapper-height + 8px);
    padding: 0;
    padding-bottom: 8px;
    gap: 0;

    .editor-title-input-wrap {
      padding: 8px;

      .editor-title-input {
        & .arco-input {
          font-size: 16px;
        }
      }
    }
  }

  .editor-title-input-wrap {
    display: flex;
    flex-grow: 1;
    gap: 12px;
    align-items: center;

    .back-wrap {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: @weak-text-color;
      gap: 4px;
      transition: color 0.2s;
      flex-shrink: 0;

      &:hover {
        color: @text-base-color;
      }

      .back-icon {
        font-size: 24px;
        flex-shrink: 0;
      }

      .back-text {
        font-size: 18px;
        flex-shrink: 0;
      }
    }

    .editor-title-input {
      height: 40px;
      background-color: #fff;
      flex-grow: 1;
      flex-shrink: 1;
      border: 1px solid @border-base-color !important;
      border-radius: 20px;

      &.arco-input-focus {
        border-color: transparent;
        box-shadow: none;
      }

      & .arco-input {
        font-size: 20px;
      }
    }
  }

  .right-suffix {
    display: flex;
    align-items: center;
    gap: 12px;

    &.mobile {
      justify-content: end;
      padding: 4px 12px;
      border-top: 1px solid @border-base-color;
    }

    .tip-text {
      color: @weak-text-color;
      white-space: nowrap;
    }
  }
}
</style>
