import {
  ref,
  computed,
  shallowRef,
  type Ref,
  defineComponent,
  h,
  createVNode,
  render,
  onMounted,
} from 'vue'
import * as L from 'leaflet'
import { BaseDeviceMarker } from '@/components'

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
  image: string
  devices: DeviceItemType[]
}

type UsePlaneGraphConfigType = {
  planeContainer: Ref<HTMLElement | null>
  deviceContainer: Ref<HTMLElement | null>
}
export function usePlaneGraph(config: UsePlaneGraphConfigType) {
  //全部设备列表
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
  //设备的分类列表
  const deviceCategoryList = ref<Array<DeviceCategoryItemType | '全部'>>([
    '全部',
    '温控',
    '安全',
    '娱乐',
    '其他',
  ])
  //当前的设备分类
  const deviceCategoryCurrent = ref<DeviceCategoryItemType | '全部'>('全部')
  //当前设备分类下的设备列表
  const deviceListByCategory = computed(() => {
    if (deviceCategoryCurrent.value === '全部') {
      return deviceList.value
    }
    return deviceList.value.filter(
      (item) => item.category === deviceCategoryCurrent.value
    )
  })
  //场景列表
  const sceneList = ref<SceneItemType[]>([
    {
      label: '场景1',
      value: '场景1',
      image: '/images/scenes/1.png',
      devices: [],
    },
    {
      label: '场景2',
      value: '场景2',
      image: '/images/scenes/2.png',
      devices: [],
    },
  ])
  //当前的场景
  const sceneCurrent = ref(sceneList.value[0].value)

  const map = shallowRef()

  const loading = ref(false)

  //获取图片信息
  const getImageInfo = (url: string) => {
    return new Promise<[number, number]>((resolve, reject) => {
      const image = new Image()
      image.onload = () => resolve([image.width, image.height])
      image.src = url
    })
  }

  //生成场景
  const generateScene = async () => {
    loading.value = true

    // 清除地图上的所有图层
    map.value.eachLayer((layer: any) => {
      map.value.removeLayer(layer)
    })
    const current = sceneList.value.find(
      (item) => item.value === sceneCurrent.value
    )
    const [width, height] = await getImageInfo(current!.image)
    const southWest = map.value.unproject(
      [0, height],
      map.value.getMinZoom() + 1
    )
    const northEast = map.value.unproject(
      [width, 0],
      map.value.getMinZoom() + 1
    )
    const bounds = new L.LatLngBounds(southWest, northEast)
    L.imageOverlay(current!.image, bounds).addTo(map.value)

    map.value.fitBounds(bounds)
    loading.value = false
  }
  //生成监听事件
  const generateEvent = () => {
    // config.deviceContainer.value!.ondragstart = (event: any) => {
    //   event.dataTransfer!.setData('id', '123')
    // }
    // config.deviceContainer.value!.ondrag = () => {
    //   console.log('ondrap正在拖动')
    // }
    // config.deviceContainer.value!.ondragend = () => {
    //   console.log('ondragend拖动结束')
    // }

    // 在放置元素内移动
    config.planeContainer.value!.ondragover = (event: any) => {
      event.preventDefault()
    }

    config.planeContainer.value!.ondrop = (event: any) => {
      var bounds2 = map.value.getBounds()
      var north = bounds2.getNorth()
      var west = bounds2.getWest()
      var c2 = map.value.project([north, west], map.value.getZoom())
      const rect = config.planeContainer.value!.getBoundingClientRect()

      // 计算相对坐标
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const latlng = map.value.unproject(
        [x + c2.x, y + c2.y],
        map.value.getZoom()
      )
      const newComponent = defineComponent({
        render: () => h(BaseDeviceMarker, {}),
      })
      const instance = createVNode(newComponent)
      render(instance, document.createElement('div'))

      const icon = L.divIcon({
        html: instance.el as HTMLElement,
        iconSize: [2, 2],
        iconAnchor: [1, 1],
      })
      L.marker(latlng, { icon, draggable: true }).addTo(map.value)
    }
  }

  onMounted(() => {
    map.value = L.map(config.planeContainer.value!, {
      minZoom: 1,
      maxZoom: 4,
      crs: L.CRS.Simple,
      attributionControl: false,
    })
    generateScene()
    generateEvent()
  })
  return {
    deviceList,
    sceneList,
    deviceCategoryCurrent,
    sceneCurrent,
    deviceCategoryList,
    deviceListByCategory,
    generateScene,
  }
}

export default usePlaneGraph
