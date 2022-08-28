<script lang="ts" setup>
import type { LoginData } from '@/apis/user/types';

import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { t } from '@/locale';
import { useStorage } from '@vueuse/core';
import { useUserStore } from '@/store';
import { useLoading } from '@/hooks';
import { useAppStore } from '@/store';

interface Props {
  darkTheme?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  darkTheme: false
});

const router = useRouter();
const errorMessage = ref('');
const { loading, setLoading } = useLoading();
const userStore = useUserStore();
const appStore = useAppStore();

const loginConfig = useStorage('login-config', {
  rememberPassword: true,
  username: '',
  password: ''
});
const userInfo = reactive({
  username: loginConfig.value.username,
  password: loginConfig.value.password
});

const handleSubmit = async ({
  errors,
  values
}: {
  errors: Record<string, ValidatedError> | undefined;
  values: Record<string, SafeAny>;
}) => {
  if (!errors) {
    setLoading(true);
    try {
      await userStore.login(values as LoginData);
      const { redirect, ...othersQuery } = router.currentRoute.value.query;
      router.push({
        name: (redirect as string) || 'home',
        query: {
          ...othersQuery
        }
      });
      Message.success(t('login.form.login.success'));
      const { rememberPassword } = loginConfig.value;
      const { username, password } = values;
      // 实际生产环境需要进行加密存储。
      // The actual production environment requires encrypted storage.
      loginConfig.value.username = rememberPassword ? username : '';
      loginConfig.value.password = rememberPassword ? password : '';
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  }
};
const setRememberPassword = (value: boolean) => {
  loginConfig.value.rememberPassword = value;
};
</script>

<template>
  <div :class="{ dark: props.darkTheme }" class="login-form-wrapper">
    <div class="login-form-title">{{
      $t('login.form.title', { systemName: appStore.protalTitle })
    }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: $t('login.form.userName.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="userInfo.username" :placeholder="$t('login.form.userName.placeholder')">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          autocomplete="false"
          :placeholder="$t('login.form.password.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword as any"
          >
            {{ $t('login.form.rememberPassword') }}
          </a-checkbox>
          <a-link>{{ $t('login.form.forgetPassword') }}</a-link>
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('login.form.login') }}
        </a-button>
        <!-- <div class="login-form-register-box">
          <a-link class="login-form-register-btn">
            {{ $t('login.form.register') }}
          </a-link>
        </div> -->
      </a-space>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-box {
    text-align: center;
  }

  &-register-btn {
    color: var(--color-text-3);
  }
}

.login-form-wrapper.dark {
  .login-form {
    &-title {
      color: #fff;
    }

    &-password-actions {
      :deep(.arco-checkbox-label) {
        color: #c2d2ff;
      }
    }

    .arco-link {
      color: #c2d2ff;

      &:hover {
        color: #fff;
      }

      &:hover,
      &:active {
        background: none;
      }
    }
  }
}
</style>
