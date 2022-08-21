<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useControlledPropByEmit } from '@/hooks/props/useControlledProp';
import getLocales from './lang';

import { Editor } from '@bytemd/vue-next';

import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import mermaid from '@bytemd/plugin-mermaid';
import gemoji from '@bytemd/plugin-gemoji';

import 'bytemd/dist/index.css';
import 'highlight.js/styles/vs.css';
import 'github-markdown-css/github-markdown-light.css'; // placed after highlight styles to override `code` padding
import 'katex/dist/katex.css';

interface Props {
  placeholder?: string;
  modelValue?: string;
}
const props = withDefaults(defineProps<Props>(), {});

const locales = getLocales();

const [content, setContent] = useControlledPropByEmit(props, 'modelValue', '');

const enabled = reactive({
  breaks: true,
  frontmatter: true,
  gemoji: true,
  gfm: true,
  highlight: true,
  math: true,
  'medium-zoom': true,
  mermaid: true
});

const plugins = computed(() => {
  return [
    enabled.breaks && breaks(),
    enabled.frontmatter && frontmatter(),
    enabled.gemoji && gemoji(),
    enabled.gfm &&
      gfm({
        locale: locales.gfm
      }),
    enabled.highlight && highlight(),
    enabled.math &&
      math({
        locale: locales.math,
        katexOptions: { output: 'html' }
      }),
    enabled['medium-zoom'] && mediumZoom(),
    enabled.mermaid &&
      mermaid({
        locale: locales.mermaid
      })
  ].filter(x => x);
});
const handleChange = (v: string) => {
  setContent(v);
};
const uploadImages = (files: File[]) => {
  console.log('files: ', files);
  return Promise.all(
    files.map(_file => {
      // TODO:
      return {
        url: 'https://picsum.photos/300'
      };
    })
  );
};
</script>

<template>
  <Editor
    :value="content"
    :plugins="plugins"
    :locale="locales.bytemd"
    :placeholder="props.placeholder"
    :uploadImages="uploadImages"
    @change="handleChange"
  />
</template>
