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
          <BaseDeviceItem v-for="item in devices" :data="item" />
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
import production01 from '@/assets/images/production01.png'
import production02 from '@/assets/images/production02.png'
import production03 from '@/assets/images/production03.png'
import production04 from '@/assets/images/production04.png'
import production05 from '@/assets/images/production05.png'
import production06 from '@/assets/images/production06.png'
import production07 from '@/assets/images/production07.png'
import production08 from '@/assets/images/production08.png'
import production09 from '@/assets/images/production09.png'
import production10 from '@/assets/images/production10.png'
import production11 from '@/assets/images/production11.png'
import production12 from '@/assets/images/production12.png'
import production13 from '@/assets/images/production13.png'
import production14 from '@/assets/images/production14.png'
import production15 from '@/assets/images/production15.png'
import production16 from '@/assets/images/production16.png'
import production17 from '@/assets/images/production17.png'
import production18 from '@/assets/images/production18.png'

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

const devices = [
  {
    name: '加湿器',
    code: '1',
    icon: production01,
  },
  {
    name: '轻薄本',
    code: '2',
    icon: production02,
  },
  {
    name: '吸顶灯',
    code: '3',
    icon: production03,
  },
  {
    name: '摄像头',
    code: '4',
    icon: production04,
  },
  {
    name: '空气净化器',
    code: '5',
    icon: production05,
  },
  {
    name: '挂式空调',
    code: '6',
    icon: production06,
  },
  {
    name: '按摩椅',
    code: '7',
    icon: production07,
  },
  {
    name: '冰柜',
    code: '8',
    icon: production17,
  },
  {
    name: '投影仪',
    code: '9',
    icon: production09,
  },
  {
    name: '温度传感器',
    code: '10',
    icon: production10,
  },
  {
    name: '扫地机器人',
    code: '11',
    icon: production11,
  },
  {
    name: '音响',
    code: '12',
    icon: production12,
  },
  {
    name: '闹钟',
    code: '13',
    icon: production13,
  },
  {
    name: '门锁',
    code: '14',
    icon: production14,
  },
  {
    name: '洗衣机',
    code: '15',
    icon: production18,
  },
  // {
  //   name: '智能灯',
  //   code: '16',
  //   icon: production16,
  // },
]
</script>

<style lang="scss" scoped>
.device-list {
  // box-sizing: border-box;
  height: 100%;

  // padding: 0 20px 20px;
  // overflow-y: auto;
}
</style>
