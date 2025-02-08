<template>
  <Layout>
    <BasePanel title="房间平面图">
      <template #filter>
        <RadioGroup v-model="cscene" :options="scenes" type="button" />
      </template>
      <template #body>
        <div class="plane-container">
          <BaseDeviceMarker />
        </div>
      </template>
    </BasePanel>
    <BasePanel title="智能设备">
      <template #filter>
        <RadioGroup
          v-model="deviceCategoryCurrent"
          :options="deviceCategoryList"
          type="button"
        />
      </template>
      <template #body>
        <div class="device-list">
          <BaseDeviceItem v-for="item in deviceListByCategory" :data="item" />
        </div>
      </template>
    </BasePanel>
  </Layout>
</template>
<script setup lang="ts">
import { BasePanel, BaseDeviceItem, BaseDeviceMarker } from '@/components'
import { RadioGroup, Radio } from '@arco-design/web-vue'
import { Layout } from '@/layout'
import { ref } from 'vue'
import {
  deviceListByCategory,
  deviceCategoryList,
  deviceCategoryCurrent,
} from '@/stores'

const scenes = [
  {
    value: 'scene01',
    label: '客厅',
    img: './assets/scene01.png',
  },
  {
    value: 'scene02',
    label: '卧室',
    img: './assets/scene02.png',
  },
  {
    value: 'scene03',
    label: '厨房',
    img: './assets/scene03.png',
  },
  {
    value: 'scene04',
    label: '浴室',
    img: './assets/scene04.png',
  },
  {
    value: 'scene05',
    label: '书房',
    img: './assets/scene05.png',
  },
]
const cscene = ref(scenes[0].value)
</script>

<style lang="scss" scoped>
.device-list {
  height: 100%;
}
.plane-container {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: var(--color-fill-1);
  border: 1px solid var(--color-border);
}
</style>
