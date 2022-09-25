<script lang="ts" setup>
import { useUserStore } from '@/store';
import { pathEnum } from '@/router/path';

import UserAvatar from '../common/UserAvatar.vue';
import CreatorMenu from './CreatorMenu.vue';

interface Props {
  isMobile?: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const userStore = useUserStore();
const router = useRouter();
const mode = computed(() => (props.isMobile ? 'pop' : 'vertical'));

const popupVisible = ref(false);

const gotoPath = (path: VKey) => {
  router.push(path as string);
};
</script>
<template>
  <div :class="['creator-sider-wrap', { 'mobile-sider': props.isMobile }]">
    <div v-if="!props.isMobile" :class="['creator-sider']">
      <div class="sider-header">
        <div class="windi-flex windi-items-center windi-flex-col">
          <UserAvatar
            class="sider-user-avater"
            @click="gotoPath(`${pathEnum.userhomepage}/${userStore.userInfo.id}`)"
          />
          <div class="sider-user-name">{{ userStore.userInfo.realname }}</div>
        </div>
        <div class="edit-article-btn">
          <a-button type="primary" long @click="gotoPath(pathEnum.editArticle)">
            <template #icon>
              <icon-edit />
            </template>
            {{ $t('portal.header.right.write_article') }}
          </a-button>
        </div>
        <creator-menu :mode="mode" class="content-left-menu" />
      </div>
    </div>
    <a-trigger
      v-else
      v-model:popupVisible="popupVisible"
      :popup-translate="[0, 20]"
      trigger="click"
      clickToClose
      position="bottom"
    >
      <div :class="`button-trigger ${popupVisible ? 'button-trigger-active' : ''}`">
        <icon-menu />
      </div>
      <template #content>
        <creator-menu :mode="mode" class="content-left-menu pop-menu" />
      </template>
    </a-trigger>
  </div>
</template>

<style lang="less" scoped>
@left-menu-width: 240px;

.creator-sider-wrap {
  .creator-sider {
    width: @left-menu-width;
    background: #fff;
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    height: 100%;

    .sider-header {
      padding-bottom: 24px;

      .sider-user-avater {
        width: 60px;
        height: 60px;
      }

      .sider-user-name {
        font-size: 16px;
        margin-top: 16px;
      }

      .edit-article-btn {
        padding: 24px 8px;
      }
    }

    .content-left-menu {
      flex-grow: 1;
      flex-shrink: 1;
      overflow: hidden;
      // height: calc(100% - 48px - 100px);
    }
  }

  &.mobile-sider {
    display: flex;
    align-items: center;
    margin: 0 12px;
  }

  .button-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.1s;
  }

  .button-trigger.button-trigger-active {
    color: @primary-color;
  }
}

.content-left-menu.pop-menu {
  border: 1px solid var(--color-fill-3);
  box-shadow: 0 4px 10px rgb(0 0 0 / 10%);
  background: #fff;
  padding: 4px 0;
}
</style>
