<script setup lang="ts">
import type { InnerImageElement } from './types';

import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { onBeforeUnmount, computed, shallowRef } from 'vue';
import { merge, isEmpty } from 'lodash-es';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { useControlledPropByEmit } from '@/hooks/props/useControlledProp';
import { t } from '@/locale';
import { ModeType, ModeEnum } from './types';
import { getEditorConfig } from './config';

interface Props {
  placeholder?: string;
  toolbarConfig?: IToolbarConfig;
  editorConfig?: IEditorConfig;
  modelValue?: string;
  mode?: ModeType;
}
const props = withDefaults(defineProps<Props>(), {
  mode: ModeEnum.default
});

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef<IDomEditor>();
let initImages: SafeAny[] = [];

// 内容 HTML
const [content, setContent] = useControlledPropByEmit(props, 'modelValue', '');

const toolbarConfig = computed(() => {
  return merge({}, props.toolbarConfig);
});

const editorConfig = computed(() => {
  return merge(getEditorConfig(), props.editorConfig);
});

const placeholder = computed(() => {
  return props.placeholder ?? t('protal.editor.content.placeholder');
});

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  editorRef.value?.destroy();
});

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor; // 记录 editor 实例
  initImages = editorRef.value?.getElemsByType('image');
};
const handleChange = (editor: IDomEditor) => {
  setContent(editor.getHtml());
};

const getDeletedImage = () => {
  const newImages = editorRef.value?.getElemsByType('image');
  const deletedImages: InnerImageElement[] = [];
  if (isEmpty(initImages) && newImages) {
    initImages.forEach(item => {
      const matched = newImages.find(newItem => newItem.id === item.id) as
        | InnerImageElement
        | undefined;
      if (matched) {
        deletedImages.push(matched);
      }
    });
  }
  return deletedImages;
};

defineExpose({
  getDeletedImage
});
</script>

<template>
  <div class="rich-editor">
    <Toolbar
      :mode="mode"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      class="rich-editor-toolbar"
    />
    <Editor
      :mode="mode"
      :placeholder="placeholder"
      :modelValue="content"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<style lang="less" scope>
.rich-editor {
  border-top: 1px solid @border-base-color;

  .rich-editor-toolbar {
    border-bottom: 1px solid @border-base-color;
  }
}
</style>
