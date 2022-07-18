<script setup lang="ts"></script>

<template>
  <div class="home-wrapper">
    <div class="entry-list-container"></div>
    <div class="sidebar"></div>
  </div>
</template>

<style lang="less" scoped>
.home-wrapper {
  display: flex;

  .entry-list-container {
    flex: 1;
  }

  .sidebar {
    width: 300px;
    margin-left: 12px;
  }
}
</style>
