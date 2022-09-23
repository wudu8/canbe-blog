<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store';
import { useClasses } from '@/hooks';
import { pathEnum } from '@/router/path';

interface LogoProps {
  systemTitle: string;
  showTitle?: boolean;
}
const props = withDefaults(defineProps<LogoProps>(), {
  showTitle: true
});

const router = useRouter();
const appStore = useAppStore();
const logoClasses = useClasses('logo');
// const titleClasses = useClasses('title');

const handleLogoClick = () => {
  router.push(pathEnum.home);
};
</script>
<template>
  <div class="logo-wrapper" @click="handleLogoClick">
    <img
      :src="props.showTitle ? appStore.logoTitle : appStore.logo"
      alt="logo"
      :class="logoClasses"
    />
    <!-- <span v-if="showTitle" :class="titleClasses">
      {{ props.systemTitle }}
    </span> -->
  </div>
</template>

<style lang="less" scoped>
.logo-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;

  .@{app-prefix}-logo {
    width: auto;
    height: 34px;
  }

  .@{app-prefix}-title {
    font-size: 22px;
  }
}
</style>
