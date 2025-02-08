<template>
  <div class="base-device-detail">
    <div class="detail-banner">
      <img src="/public/images/devices/2.png" alt="" />
    </div>
    <div class="detail-name">小米电视盒子</div>
    <!-- <div class="detail-code">xasdxsasdas</div> -->

    <div class="detail-items">
      <div class="detail-item">
        <div class="item-label">品牌</div>
        <div class="item-value">小米公司</div>
      </div>
      <div class="detail-item">
        <div class="item-label">分类</div>
        <div class="item-value">照明</div>
      </div>
      <div class="detail-item">
        <div class="item-label">状态</div>
        <div class="item-value">在线</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// interface PropsType {}
// const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.base-device-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .detail-banner {
    img {
      width: 80px;
    }
  }
  .detail-name {
    font-weight: bold;
  }
  .detail-code {
    padding: 4px 8px;
    margin-top: 10px;
    font-size: 10px;
    color: rgb(var(--gray-6));
    border: 1px solid var(--color-neutral-3);
    border-radius: 4px;
  }
  .detail-items {
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    border-top: 1px solid var(--color-neutral-3);
    border-bottom: 1px solid var(--color-neutral-3);
    .detail-item {
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 80px;
      padding: 10px;
      &:not(:last-child)::after {
        position: absolute;
        right: 0;
        width: 1px;
        height: 20px;
        content: '';
        background-color: var(--color-neutral-3);
      }
      .item-label {
        font-size: 10px;
        color: rgb(var(--gray-6));
      }
      .item-value {
        margin-top: 2px;
        font-size: 13px;
      }
    }
  }
}
</style>
