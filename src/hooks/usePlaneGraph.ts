import { ref, computed } from 'vue'

export type DeviceCategoryItemType = '温控' | '安全' | '娱乐' | '其他'

export type DeviceItemType = {
  name: string
  code: string
  image: string
  category: DeviceCategoryItemType
}

export type SceneItemType = {
  label: string
  value: string
  devices: DeviceItemType[]
}

export function usePlaneGraph() {
  const deviceList = ref<DeviceItemType[]>([
    {
      name: '空气加湿器',
      code: 'b64d86a19dc7',
      image: '/images/devices/1.png',
      category: '其他',
    },
    {
      name: '轻薄笔记本',
      code: '852b8717d009',
      image: '/images/devices/1.png',
      category: '娱乐',
    },
    {
      name: '智慧吸顶灯',
      code: '98317a6a586f',
      image: '/images/devices/3.png',
      category: '照明',
    },
    {
      name: '云台摄像头',
      code: '4f3be09a9e47',
      image: '/images/devices/4.png',
      category: '安全',
    },
    {
      name: '空气净化器',
      code: '6aa2d9c17cda',
      image: '/images/devices/5.png',
      category: '温控',
    },
    {
      name: '滚筒洗衣机',
      code: '8792dd8f989f',
      image: '/images/devices/6.png',
      category: '其他',
    },
    {
      name: '按摩椅',
      code: '1ccefe2be178',
      image: '/images/devices/7.png',
      category: '娱乐',
    },

    {
      name: '投影仪',
      code: 'b1c9ff86591a',
      image: '/images/devices/8.png',
      category: '娱乐',
    },
    {
      name: '电吹风',
      code: 'ad77e73280d3',
      image: '/images/devices/9.png',
      category: '其他',
    },
    {
      name: '温度传感器',
      code: 'd500b354a7fd',
      image: '/images/devices/10.png',
      category: '温控',
    },
    {
      name: '扫地机器人',
      code: 'f32638d152b8',
      image: '/images/devices/11.png',
      category: '安全',
    },
    {
      name: '智能音箱',
      code: '35ea0618149d',
      image: '/images/devices/12.png',
      category: '娱乐',
    },
    {
      name: '智能闹钟',
      code: 'c3e3f3a6213d',
      image: '/images/devices/13.png',
      category: '其他',
    },
    {
      name: '智能门锁',
      code: 'ccc5e7d2c7da',
      image: '/images/devices/14.png',
      category: '安全',
    },
    {
      name: '打印机',
      code: '2eb5772561a6',
      image: '/images/devices/15.png',
      category: '其他',
    },
    {
      name: '电风扇',
      code: 'cc805117dc5d',
      image: '/images/devices/16.png',
      category: '其他',
    },
    {
      name: '冰柜',
      code: 'e801626f006b',
      image: '/images/devices/17.png',
      category: '温控',
    },
  ])

  const deviceCategoryList = ref<Array<DeviceCategoryItemType | '全部'>>([
    '全部',
    '温控',
    '安全',
    '娱乐',
    '其他',
  ])

  const deviceCategoryCurrent = ref<DeviceCategoryItemType | '全部'>('全部')

  const deviceListByCategory = computed(() => {
    if (deviceCategoryCurrent.value === '全部') {
      return deviceList.value
    }
    return deviceList.value.filter(
      (item) => item.category === deviceCategoryCurrent.value
    )
  })

  const sceneList = ref<SceneItemType[]>([
    {
      label: '场景1',
      value: '场景1',
      devices: [],
    },
    {
      label: '场景2',
      value: '场景2',
      devices: [],
    },
    {
      label: '场景3',
      value: '场景3',
      devices: [],
    },
  ])

  const sceneCurrent = ref(sceneList.value[0].value)

  return {
    deviceList,
    sceneList,
    deviceCategoryCurrent,
    sceneCurrent,
    deviceCategoryList,
    deviceListByCategory,
  }
}

export default usePlaneGraph
