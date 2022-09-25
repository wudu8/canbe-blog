<script lang="ts" setup>
import { useClasses } from '@/hooks';
import { useUserStore } from '@/store';
import { t } from '@/locale';
import { pathEnum } from '@/router/path';

const router = useRouter();
const userStore = useUserStore();
const classes = useClasses('notice');

const noticeMenu = [
  {
    key: 'comment',
    path: pathEnum.notFound,
    label: t('route.msg.comment')
  },
  {
    key: 'like_and_store',
    path: pathEnum.notFound,
    label: t('route.msg.like_and_store')
  },
  {
    key: 'system',
    path: pathEnum.notFound,
    label: t('route.msg.system')
  }
];

const notificationClick = (value: VKey) => {
  router.push(value as string);
};
</script>

<template>
  <a-dropdown position="br" class="notice-dropdown-popup" @select="notificationClick">
    <div :class="classes">
      <a-badge :count="9" v-if="userStore.isLogin" :class="`${classes}-badge`">
        <icon-notification :class="`${classes}-icon`" />
      </a-badge>
    </div>
    <template #content>
      <a-doption v-for="notice in noticeMenu" :key="notice.key" :value="notice.path">
        {{ notice.label }}
      </a-doption>
    </template>
  </a-dropdown>
</template>
<style lang="less" scoped>
.@{app-prefix}-notice {
  display: flex;
  align-items: center;
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
<style lang="less">
.notice-dropdown-popup {
  .arco-dropdown {
    .arco-dropdown-option {
      padding: 4px 0;
      width: 120px;
      justify-content: center;
    }
  }
}
</style>
