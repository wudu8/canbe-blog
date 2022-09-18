<script lang="ts" setup>
import { useAppStore } from '@/store';
import { useClasses } from '@/hooks';

import Footer from '@/layouts/components/common/Footer.vue';
import Logo from '@/layouts/components/common/Logo.vue';
import LoginBanner from './components/Banner.vue';
import LoginForm from './components/LoginForm.vue';

const appStore = useAppStore();
const classes = useClasses('login-container');
</script>

<template>
  <div :class="{ [classes]: true, 'mobile-login-wrapper': appStore.isMobile }">
    <Logo :systemTitle="appStore.portalTitle" class="logo" />
    <LoginBanner />
    <div class="content">
      <div class="content-inner">
        <LoginForm :dark-theme="appStore.isMobile" />
      </div>
      <div class="footer">
        <Footer :systemTitle="appStore.portalTitle" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.@{app-prefix}-login-container {
  display: flex;
  height: 100vh;

  &.mobile-login-wrapper {
    position: relative;

    .banner {
      height: 100vh;
      width: 100%;

      :deep(.carousel) {
        .carousel-item {
          justify-content: start;
          margin-top: 76px;

          .carousel-image {
            width: 180px;
          }
        }
      }
    }

    .content {
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 1;
      margin-top: 84px;

      .login-form-wrapper {
        width: 280px;
      }
    }

    .footer {
      bottom: 94px;
      color: #c2d2ff;
    }
  }

  .banner {
    width: 550px;
    background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
  }

  .content {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
  }

  .footer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
  }
}

.logo {
  position: fixed;
  top: 24px;
  left: 22px;
  z-index: 1;
  color: var(--color-fill-1);
}
</style>
