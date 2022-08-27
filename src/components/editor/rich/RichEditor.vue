<script setup lang="ts">
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';

import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { onBeforeUnmount, computed, shallowRef, watch } from 'vue';
import { merge } from 'lodash-es';
import { i18nChangeLanguage } from '@wangeditor/editor';
import { useControlledPropByEmit } from '@/hooks/props/useControlledProp';
import { useLocale } from '@/hooks/design/useLocale';
import { t, LocaleEnum } from '@/locale';
import { ModeType, ModeEnum } from './types';
import { getEditorConfig, geToolbarConfig } from './config';

import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

interface Props {
  placeholder?: string;
  toolbarConfig?: IToolbarConfig;
  editorConfig?: IEditorConfig;
  modelValue?: string;
  mode?: ModeType;
}
const props = withDefaults(defineProps<Props>(), {
  mode: ModeEnum.simple
});

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef<IDomEditor>();

// 切换语言 - 'en' 或者 'zh-CN'
const wangeditorLocale = {
  [LocaleEnum.enUS]: 'en',
  [LocaleEnum.zhCN]: 'zh-CN'
};

// 内容 HTML
const [content, setContent] = useControlledPropByEmit(props, 'modelValue', '');
const { currentLocale } = useLocale();

// 切换语言 - 'en' 或者 'zh-CN'
watch(currentLocale, lang => i18nChangeLanguage(wangeditorLocale[lang]), { immediate: true });

const toolbarConfig = computed(() => {
  return merge(geToolbarConfig(), props.toolbarConfig);
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
};
const handleChange = (editor: IDomEditor) => {
  setContent(editor.getHtml());
};
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
