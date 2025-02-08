<template>
  <Layout>
    <BasePanel title="房间平面图">
      <template #filter>
        <RadioGroup
          v-model="sceneCurrent"
          :options="sceneList"
          type="button"
          @change="generateScene"
        />
      </template>
      <template #body>
        <div class="plane-container" ref="planeContainer"></div>
      </template>
    </BasePanel>
    <BasePanel title="智能设备" tip="拖拽设备至左侧进行放置">
      <template #filter>
        <RadioGroup
          v-model="deviceCategoryCurrent"
          :options="deviceCategoryList"
          type="button"
        />
      </template>
      <template #body>
        <div class="device-container" ref="deviceContainer">
          <BaseDeviceItem
            v-for="item in deviceListByCategory"
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
import { RadioGroup } from '@arco-design/web-vue'
import { Layout } from '@/layout'
import { ref } from 'vue'
import { usePlaneGraph } from '@/hooks'

const planeContainer = ref<HTMLElement | null>(null)
const deviceContainer = ref<HTMLElement | null>(null)

const {
  deviceListByCategory,
  deviceCategoryList,
  deviceCategoryCurrent,
  sceneList,
  sceneCurrent,
  generateScene,
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
