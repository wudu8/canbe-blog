<script lang="ts" setup>
import { useUserStore } from '@/store';

const userStore = useUserStore();
</script>

<template>
  <a-avatar
    :auto-fix-font-size="false"
    :class="[
      {
        'avatar-hover': !userStore.isLogin
      },
      'user-avatar-wrap'
    ]"
  >
    <img
      v-if="userStore.isLogin && userStore.user.avatar"
      alt="avatar"
      :src="userStore.user.avatar"
    />
    <icon-user class="windi-text-size-[22px]" v-else-if="userStore.isLogin" />
    <template v-else>{{ $t('login.user_menu.go_login') }}</template>
  </a-avatar>
</template>
<style lang="less" scoped>
.user-avatar-wrap {
  cursor: pointer;

  &.avatar-hover:hover {
    background-color: #999;
    transition: all 0.3s;
  }

  :deep(.arco-avatar-text) {
    font-size: 12px;
  }
}
</style>
