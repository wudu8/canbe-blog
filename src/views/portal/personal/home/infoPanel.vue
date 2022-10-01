<script lang="ts" setup>
import { useClasses } from '@/hooks';
import { useAppStore } from '@/store';
import { useRouter } from 'vue-router';
import { pathEnum } from '@/router/path';

const classes = useClasses('personal-info');
const appStore = useAppStore();
const router = useRouter();
</script>

<template>
  <div :class="[classes, 'windi-px-6 windi-py-6 windi-bg-white']">
    <div
      :class="[
        `${classes}-content${appStore.isMobile ? '-mobile' : ''}`,
        'windi-flex windi-items-center',
        `${appStore.isMobile ? 'windi-flex-col windi-gap-y-4' : ''}`
      ]"
    >
      <div :class="[`${classes}-content-portrait`, `${appStore.isMobile ? '' : 'windi-mr-6'}`]">
        <a-avatar :size="100">
          <img
            alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          />
        </a-avatar>
      </div>
      <div
        :class="[
          `${classes}-content-details`,
          'windi-w-full',
          `${appStore.isMobile ? 'windi-text-center' : ''}`
        ]"
      >
        <div :class="['nickname', 'windi-text-2xl windi-mb-3']">
          <span class="windi-mr-2">okkkkkr</span>
          <icon-man class="windi-text-blue-500" />
          <icon-woman class="windi-text-pink-500" />
        </div>
        <div :class="['work', 'windi-text-base windi-mb-1']">
          <icon-idcard class="windi-mr-2" />
          <span>前端开发</span>
        </div>
        <div :class="['motto', 'windi-text-base']">
          <icon-message class="windi-mr-2" />
          <span>临溪羡鱼，不如退而结网</span>
        </div>
      </div>
      <div
        :class="[
          `${classes}-content-operation`,
          'windi-h-full windi-flex windi-flex-col windi-justify-between'
        ]"
      >
        <a-button
          @click="router.push(pathEnum.personalSetting)"
          type="outline"
          :class="`${appStore.isMobile ? 'windi-mb-4 windi-mt-2' : ''}`"
        >
          编辑个人信息
        </a-button>
        <div
          :class="[
            'authorization windi-text-xl',
            `${appStore.isMobile ? 'windi-text-center' : 'windi-text-right'}`
          ]"
        >
          <icon-weibo class="windi-cursor-pointer" />
          <icon-github class="windi-mx-4 windi-cursor-pointer" />
          <icon-mobile
            v-if="appStore.isMobile"
            :class="{ 'windi-text-blue-600': appStore.isMobile, 'windi-cursor-pointer': true }"
          />
          <icon-desktop
            v-else
            :class="{ 'windi-text-blue-600': !appStore.isMobile, 'windi-cursor-pointer': true }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scope>
.@{app-prefix}-personal-info {
  width: 100%;
  box-shadow: @box-base-shadow;

  &-content {
    height: 100px;
  }

  &-content-portrait {
    width: 100px;
    height: 100px;
    border-radius: 60%;
    background: linear-gradient(225deg, #f0f0f0, #cacaca);
    box-shadow: -10px 10px 20px #bebebe, 10px -10px 20px #fff;
  }

  &-content-details {
    .work,
    .motto {
      color: @sub-text-color;
    }
  }
}
</style>
