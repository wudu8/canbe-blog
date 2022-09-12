<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useClasses } from '@/hooks';
import { useUserStore } from '@/store';
import { pathEnum } from '@/router/path';

import UserAvatar from './UserAvatar.vue';

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
      <UserAvatar @click="userClick" />
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
</style>
