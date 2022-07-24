<script lang="ts" setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <a-breadcrumb :style="{ margin: '16px 0' }">
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item>List</a-breadcrumb-item>
    <a-breadcrumb-item>App</a-breadcrumb-item>
  </a-breadcrumb>
  <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
    <router-view />
  </div>
</template>

<style></style>
