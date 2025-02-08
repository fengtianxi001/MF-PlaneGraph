<template>
  <div class="base-device-detail">
    <img class="base-device-detail-banner" :src="data.image" alt="" />
    <div class="base-device-detail-name">{{ data.name }}</div>
    <div class="base-device-detail-items">
      <div class="detail-item">
        <div class="item-label">品牌</div>
        <div class="item-value">小米公司</div>
      </div>
      <div class="detail-item">
        <div class="item-label">分类</div>
        <div class="item-value">{{ data.category }}</div>
      </div>
      <div class="detail-item">
        <div class="item-label">状态</div>
        <div class="item-value">在线</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type DeviceType } from '@/hooks'
interface PropsType {
  data: DeviceType
}
const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.base-device-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &-banner {
    width: 80px;
  }
  &-name {
    font-weight: bold;
  }
  &-items {
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    border-top: 1px solid var(--color-neutral-2);
    border-bottom: 1px solid var(--color-neutral-2);
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
        background-color: var(--color-neutral-2);
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
