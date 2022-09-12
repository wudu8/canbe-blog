<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
  router.push('/');
}
</script>

<template>
  <div class="wrapper-box">
    <img src="@images/exception/404_bg.png" />
    <div class="error-box">
      <div class="error-text">{{ $t('portal.exception.404.title') }}</div>
      <a-button type="primary" size="large" class="back-btn" @click="goHome">{{
        $t('portal.exception.go_back.btn')
      }}</a-button>
    </div>
  </div>
</template>
<style lang="less" scoped>
.wrapper-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100%;

  .error-text {
    margin-bottom: 48px;
    font-size: 22px;
    color: #6f6f6f;
  }

  .back-btn {
    width: 150px;
  }
}

@media screen and (max-width: 900px) {
  .wrapper-box {
    .error-box {
      width: 100%;
      text-align: center;

      .back-btn {
        width: 200px;
      }
    }
  }
}
</style>
