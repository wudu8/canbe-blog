<!--
 * @Author: zkr
 * @Date: 2022-09-17 18:42:00
 * @LastEditors: zkr
 * @LastEditTime: 2022-09-26 16:48:59
 * @FilePath: \canbe-blog\src\layouts\components\common\UserMenu.vue
-->
<script lang="ts" setup>
import { useClasses } from '@/hooks';
import { useUserStore } from '@/store';
import { pathEnum } from '@/router/path';

import UserAvatar from './UserAvatar.vue';
import Notice from './Notice.vue';

interface Props {
  size?: UISize;
}
const props = withDefaults(defineProps<Props>(), {});

const router = useRouter();
const userStore = useUserStore();
const classes = useClasses('user-menu');

const userClick = () => {
  if (!userStore.isLogin) {
    router.push(pathEnum.login);
  } else {
    // 打开用户下拉框
    router.push(pathEnum.personal);
  }
};
</script>

<template>
  <div :class="classes">
    <a-space :size="props.size" class="full-height-space">
      <Notice />
      <UserAvatar @click="userClick" />
    </a-space>
  </div>
</template>
<style lang="less" scoped>
.@{app-prefix}-user-menu {
  height: 100%;
}
</style>
