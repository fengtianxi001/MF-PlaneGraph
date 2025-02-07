<template>
  <Layout>
    <BasePanel title="房间平面图">
      <template #filter>
        <RadioGroup v-model="cscene" :options="scenes" type="button" />
      </template>
      <template #body>
        <div>123</div>
      </template>
    </BasePanel>
    <BasePanel title="智能设备">
      <template #filter>
        <RadioGroup v-model="ccategory" :options="categories" type="button" />
      </template>
      <template #body>
        <div class="device-list">
          <BaseDeviceItem v-for="item in 20" />
        </div>
      </template>
    </BasePanel>
  </Layout>
</template>
<script setup lang="ts">
import { BasePanel, BaseDeviceItem } from '@/components'
import { RadioGroup, Radio } from '@arco-design/web-vue'
import { Layout } from '@/layout'
import { ref } from 'vue'

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

const categories = [
  {
    value: 'all',
    label: '全部',
  },
  {
    value: 'light',
    label: '照明',
  },
  {
    value: 'temperature',
    label: '温控',
  },
  {
    value: 'security',
    label: '安全',
  },
  {
    value: 'entertainment',
    label: '娱乐',
  },
]
const ccategory = ref(categories[0].value)
</script>

<style lang="scss" scoped>
.device-list {
  // box-sizing: border-box;
  height: 100%;

  // padding: 0 20px 20px;
  // overflow-y: auto;
}
</style>
