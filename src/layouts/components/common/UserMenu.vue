<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useClasses } from '@/hooks';
import { useUserStore } from '@/store';
import { pathEnum } from '@/router/path';

interface Props {
  size?: UISize;
}
const props = withDefaults(defineProps<Props>(), {});

const router = useRouter();
const userStore = useUserStore();
const classes = useClasses('user-menu');

const notificationClick = () => {};
const userClick = () => {
  if (!userStore.isLogin) {
    router.push(pathEnum.login);
  } else {
    // 打开用户下拉框
  }
};
</script>

<template>
  <div :class="classes">
    <a-space :size="props.size" class="full-height-space">
      <a-badge
        :count="9"
        v-if="userStore.isLogin"
        :class="`${classes}-badge`"
        @click="notificationClick"
      >
        <icon-notification :class="`${classes}-icon`" />
      </a-badge>
      <a-avatar
        :auto-fix-font-size="false"
        :class="[{ 'avatar-hover': !userStore.isLogin }, 'user-avatar-wrap']"
        @click="userClick"
      >
        <img
          v-if="userStore.isLogin && userStore.user.avatar"
          alt="avatar"
          :src="userStore.user.avatar"
        />
        <template v-else-if="userStore.isLogin && userStore.user.name">
          {{ userStore.user.name }}
        </template>
        <template v-else>{{ $t('login.user_menu.go_login') }}</template>
      </a-avatar>
    </a-space>
  </div>
</template>
<style lang="less" scoped>
.@{app-prefix}-user-menu {
  height: 100%;

  &-badge {
    cursor: pointer;
    user-select: none;

    &:hover {
      .@{app-prefix}-user-menu-icon {
        color: @hover-text-color;
      }
    }
  }

  &-icon {
    font-size: 24px;

    &:hover {
      color: @hover-text-color;
      cursor: pointer;
    }
  }
}

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
