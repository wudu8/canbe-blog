<script lang="ts" setup>
import { useClasses } from '@/hooks';
import { useAppStore, useUserStore } from '@/store';
import { pathEnum } from '@/router/path';

import UserMenu from '../common/UserMenu.vue';

interface Props {
  isCreator?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isCreator: false
});

const appStore = useAppStore();
const userStore = useUserStore();
const router = useRouter();
const classes = useClasses('header-right');
const dropdownStatus = ref(false);
const size = computed(() => (!appStore.isMobile ? 'large' : 'small'));

const gotoPath = (path: VKey) => {
  router.push(path as string);
};
const popupVisibleChange = (visible: boolean) => {
  dropdownStatus.value = visible;
};
</script>
<template>
  <div :class="classes">
    <a-space :size="size" class="full-height-space">
      <template v-if="!props.isCreator">
        <a-input-search
          :class="{ 'header-search': true, mobile: appStore.isMobile }"
          :placeholder="$t('portal.header.right.search')"
          search-button
        />
      </template>
      <a-button-group
        v-if="!appStore.isMobile && !props.isCreator && userStore.isLogin"
        type="primary"
      >
        <a-button @click="gotoPath(pathEnum.creator)">{{ $t('portal.creator.title') }}</a-button>

        <a-dropdown
          v-model="dropdownStatus"
          position="br"
          @popup-visible-change="popupVisibleChange"
          @select="gotoPath"
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
              {{ $t('portal.header.right.write_article') }}
            </a-doption>
            <a-doption :value="pathEnum.drafts">
              <template #icon>
                <icon-archive />
              </template>
              {{ $t('portal.drafts.title') }}
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
  height: @portal-header-height;
  line-height: @portal-header-height;
  background: @portal-header-background;
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
