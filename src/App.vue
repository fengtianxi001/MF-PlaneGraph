<template>
  <Layout>
    <BasePanel title="房间平面图" tip="右击图标查看设备详情">
      <template #extra>
        <Button type="primary" size="small" @click="onExportScenes">
          导出场景
        </Button>
        <Button type="primary" size="small" @click="onImportScenes">
          导入场景
        </Button>
      </template>
      <template #filter>
        <RadioGroup
          v-model="currentScene"
          :options="scenes"
          type="button"
          @change="onSceneChange"
        />
      </template>
      <template #body>
        <div class="plane-container" ref="planeContainer"></div>
      </template>
    </BasePanel>
    <BasePanel title="智能设备" tip="拖拽设备至左侧进行放置">
      <template #filter>
        <RadioGroup
          v-model="currentDeviceSort"
          :options="deviceSorts"
          type="button"
        />
      </template>
      <template #body>
        <div class="device-container" ref="deviceContainer">
          <BaseDeviceItem
            v-for="item in currentDevices"
            :data-code="item.code"
            :data="item"
          />
        </div>
      </template>
    </BasePanel>
  </Layout>
</template>
<script setup lang="ts">
import { BasePanel, BaseDeviceItem } from '@/components'
import { RadioGroup, Button } from '@arco-design/web-vue'
import { Layout } from '@/layout'
import { ref } from 'vue'
import { usePlaneGraph } from '@/hooks'

const planeContainer = ref<HTMLElement | null>(null)
const deviceContainer = ref<HTMLElement | null>(null)

const {
  devices,
  deviceSorts,
  scenes,
  currentDevices,
  currentDeviceSort,
  currentScene,
  onSceneChange,
  onExportScenes,
  onImportScenes,
} = usePlaneGraph({ planeContainer, deviceContainer })
</script>

<style lang="scss" scoped>
.device-container {
  display: grid;
  grid-template-rows: auto;
  grid-template-rows: repeat(auto-fill, 60px);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  height: 100%;
}
.plane-container {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: var(--color-fill-1);
  border: 1px solid var(--color-neutral-3);
}
</style>
