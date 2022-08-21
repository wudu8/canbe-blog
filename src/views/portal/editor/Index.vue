<script setup lang="ts">
import { computed, ref } from 'vue';
import { useClasses } from '@/hooks';
import { t } from '@/locale';

import RichEditor from '@/components/editor/rich/RichEditor.vue';
import MdEditor from '@/components/editor/md/MdEditor.vue';
import EditorHeader from '@/components/editor/header/EditorHeader.vue';

const classes = useClasses('md-wrapper');

const saveingBackup = ref<boolean>();
const currentEditMode = ref<boolean>(true);
const articleTitle = ref<string>('');
const mdContent = ref<string>('');
const richContent = ref<string>('');

const headerTip = computed(() => {
  if (saveingBackup.value === undefined) {
    return t('protal.editor.header.auto_save_backup');
  } else {
    return saveingBackup.value
      ? t('protal.editor.header.auto_saveing')
      : t('protal.editor.header.auto_saved');
  }
});

const handleSwitch = (isMd: boolean) => {
  currentEditMode.value = isMd;
};
const handlePublish = () => {};
const handleDrafts = () => {};
</script>

<template>
  <div :class="classes">
    <EditorHeader
      :is-md="currentEditMode"
      v-model:title="articleTitle"
      :tip="headerTip"
      :placeholder="$t('protal.editor.header.placeholder')"
      class="editor-header-flex"
      @switch="handleSwitch"
      @publish="handlePublish"
      @drafts="handleDrafts"
    />
    <div class="editor-body">
      <MdEditor v-if="currentEditMode" v-model="mdContent" class="md-editor" />
      <RichEditor v-else v-model="richContent" class="rich-editor" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-md-wrapper {
  height: 100%;

  .editor-header-flex {
    flex-shrink: 0;
  }

  .editor-body {
    flex: 1;
    height: calc(100vh - 64px);
  }

  .rich-editor {
    height: 100%;
  }

  .md-editor {
    &,
    & > :deep(.bytemd) {
      height: 100%;
    }
  }
}
</style>
