<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useClasses } from '@/hooks';
import { useAppStore } from '@/store';
import { pathEnum } from '@/router/path';

import UserMenu from '../common/UserMenu.vue';

const appStore = useAppStore();
const router = useRouter();
const classes = useClasses('header-right');
const dropdownStatus = ref(false);

const handleSelect = (path: VKey) => {
  router.push(path as string);
};
const popupVisibleChange = (visible: boolean) => {
  dropdownStatus.value = visible;
};
</script>
<template>
  <div :class="classes">
    <a-space size="large" class="full-height-space">
      <a-input-search
        :class="{ 'header-search': true, mobile: appStore.isMobile }"
        :placeholder="$t('protal.header.right.search')"
        search-button
      />
      <a-button-group v-if="!appStore.isMobile" type="primary">
        <a-button>创作中心</a-button>

        <a-dropdown
          v-model="dropdownStatus"
          position="br"
          @popup-visible-change="popupVisibleChange"
          @select="handleSelect"
        >
          <a-button>
            <template #icon>
              <icon-down v-if="!dropdownStatus" />
              <icon-up v-else />
            </template>
          </a-button>
          <template #content>
            <a-doption :value="pathEnum.editArticle">
              <template #icon>
                <icon-edit />
              </template>
              {{ $t('protal.header.right.write_article') }}
            </a-doption>
            <a-doption :value="pathEnum.drafts">
              <template #icon>
                <icon-archive />
              </template>
              {{ $t('protal.header.right.drafts') }}
            </a-doption>
          </template>
        </a-dropdown>
      </a-button-group>
      <UserMenu size="large" />
    </a-space>
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-header{
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: @protal-header-height;
  line-height: @protal-header-height;
  background: @protal-header-background;
  transition: all 0.2s;

  .header-search {
    width: 320px;

    &.mobile {
      width: 150px;
    }
  }

  &.header-shadow {
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  }
}
</style>
