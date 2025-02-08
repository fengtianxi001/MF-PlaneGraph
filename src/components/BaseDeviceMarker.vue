<template>
  <div class="base-device-marker">
    <Popover position="rt" trigger="contextMenu">
      <div
        class="base-device-marker-image"
        :style="{ backgroundImage: `url(${data.image})` }"
      />
      <template #content>
        <BaseDeviceDetail :data="data" />
        <Button
          size="mini"
          long
          type="primary"
          status="danger"
          @click="() => onRemove(data.code)"
        >
          移除
        </Button>
      </template>
    </Popover>
    <div class="base-device-marker-dot"></div>
  </div>
</template>
<script setup lang="ts">
import BaseDeviceDetail from './BaseDeviceDetail.vue'
import { Button, Popover } from '@arco-design/web-vue'
import { type DeviceItemType } from '@/hooks'

interface PropsType {
  data: DeviceItemType
  onRemove: (code: string) => void
}
const props = defineProps<PropsType>()
</script>
<style lang="scss">
.base-device-marker {
  position: relative;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    background-color: var(--color-bg-2);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 24px;
    border-radius: 50%;
    &:hover {
      transition: all 0.2s ease-in-out;
      transform: scale(1.2);
    }
  }
  &-dot {
    width: 8px;
    height: 8px;
    margin-top: 4px;
    background: #2655ff;
    border: 1px solid #fff;
    border-radius: 50%;
  }
}
</style>
