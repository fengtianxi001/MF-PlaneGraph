<template>
  <div class="base-device-item" draggable="true">
    <div class="item-left">
      <img :src="data.image" alt="" style="width: 100%; height: 100%" />
    </div>
    <div class="item-main">
      <div>
        <span class="item-name">{{ data.name }}</span>
      </div>
      <div style="margin-top: 4px">
        <span class="item-badge item-badge-code">{{ data.code }}</span>
        <span class="item-badge item-badge-category">{{ data.category }}</span>
        <span class="item-badge item-badge-bind">已绑定-客厅</span>
        <span class="item-badge item-badge-state">在线</span>
      </div>
    </div>
    <!-- <div class="item-right">
      <Switch />
    </div> -->
  </div>
</template>
<script setup lang="ts">
// import { Switch } from '@arco-design/web-vue'
import { type DeviceItemType } from '@/hooks'

interface PropsType {
  data: DeviceItemType
}
const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.base-device-item {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: move;
  user-select: none;
  background-color: var(--color-fill-1);
  border: 1px solid var(--color-neutral-3);
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  .item-left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 8px;
    font-size: 40px;
  }
  .item-main {
    flex: 1;
    .item-name {
      margin-right: 4px;
      font-size: 14px;
      font-weight: bold;
    }
    .item-badge {
      display: inline-block;
      padding: 2px 6px;
      margin-right: 4px;
      font-size: 10px;
      background-color: var(--color-neutral-4);
      border-radius: 2px;
      &.item-badge-code {
        color: #fff;

        // background-color: rgb(var(--warning-6));
      }
      &.item-badge-category {
        color: #fff;

        // background-color: rgb(var(--primary-6));
      }
      &.item-badge-bind {
        color: #fff;

        // background-color: rgb(var(--success-6));
      }
      &.item-badge-state {
        color: #fff;

        // background-color: rgb(var(--success-3));
      }
    }
  }
  .item-right {
    // margin-right: 10px;
  }
}
</style>
