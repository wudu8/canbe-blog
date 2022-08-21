<script setup lang="ts">
import { ref, computed } from 'vue';
import { t } from '@/locale';
import { useControlledPropByEmit } from '@/hooks/props/useControlledProp';

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

const switchTip = computed(() =>
  props.isMd ? t('protal.editor.header.switch.rich') : t('protal.editor.header.switch.md')
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
  <div class="editor-header">
    <a-input
      :model-value="titleValue"
      :placeholder="props.placeholder"
      class="editor-title-input"
      @update:model-value="handleChange"
    />
    <div class="right-suffix">
      <div v-if="props.tip" class="tip-text">{{ props.tip }}</div>
      <a-button type="outline" class="windi-ml-2 windi-mr-2" @click="handleDrafts">{{
        $t('protal.editor.header.drafts')
      }}</a-button>
      <a-button type="primary" class="windi-ml-2 windi-mr-2" @click="handlePublish">{{
        $t('protal.editor.header.publish')
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
      <div>{{ $t('protal.editor.header.switch.warning') }}</div>
    </a-modal>
  </div>
</template>

<style lang="less" scope>
.editor-header {
  display: flex;
  height: 64px;
  padding: 0 12px;
  background-color: #fff;

  .editor-title-input {
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
