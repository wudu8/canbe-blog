<script setup lang="ts">
import { ref, computed } from 'vue';
import { t } from '@/locale';
import { useControlledPropByEmit } from '@/hooks';
import { useAppStore } from '@/store';

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
</script>

<template>
  <div :class="{ 'mobile-editor-header': appStore.isMobile }" class="editor-header">
    <a-input
      :model-value="titleValue"
      :placeholder="props.placeholder"
      class="editor-title-input"
      @update:model-value="handleChange"
    />
    <div class="right-suffix">
      <div v-if="props.tip && !appStore.isMobile" class="tip-text">{{ props.tip }}</div>
      <a-button type="outline" class="windi-ml-2 windi-mr-2" @click="handleDrafts">{{
        $t('portal.drafts.title')
      }}</a-button>
      <a-button type="primary" class="windi-ml-2 windi-mr-2" @click="handlePublish">{{
        $t('portal.editor.header.publish')
      }}</a-button>
      <b-tooltip :content="switchTip" position="br">
        <a-button type="text" status="normal" @click="handleSwitch">
          <icon-swap />
        </a-button>
      </b-tooltip>
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
  background-color: #fff;

  &.mobile-editor-header {
    flex-direction: column;
    height: calc(@title-input-height + @actions-wrapper-height + 8px);
    padding: 0;
    padding-bottom: 8px;
  }

  .editor-title-input {
    height: @title-input-height;
    background-color: #fff;

    &.arco-input-focus {
      border-color: transparent;
      box-shadow: none;
    }

    & .arco-input {
      font-size: 24px;
    }
  }

  .right-suffix {
    display: flex;
    align-items: center;

    .tip-text {
      color: @weak-text-color;
      white-space: nowrap;
    }
  }
}
</style>
