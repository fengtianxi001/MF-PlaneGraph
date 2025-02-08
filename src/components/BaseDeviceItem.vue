<template>
  <div class="base-device-item" draggable="true">
    <div
      class="base-device-item-image"
      :style="{ backgroundImage: `url(${data.image})` }"
    />
    <div>
      <div class="base-device-item-name">{{ data.name }}</div>
      <div class="base-device-item-code">{{ data.code }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type DeviceItemType } from '@/hooks'

interface PropsType {
  data: DeviceItemType
}
const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.base-device-item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 10px;
  cursor: move;
  user-select: none;
  background-color: var(--color-neutral-1);
  border: 1px solid var(--color-neutral-3);
  &-image {
    width: 40px;
    height: 40px;
    margin-right: 8px;
    font-size: 40px;
    background-size: contain;
  }
  &-name {
    font-weight: bold;
  }
  &-code {
    margin-top: 4px;
    font-size: 10px;
    color: var(--color-neutral-5);
  }
}
</style>
