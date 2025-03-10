import { ref, computed, shallowRef, type Ref, onMounted, reactive } from 'vue'
import * as L from 'leaflet'
import { BaseDeviceMarker } from '@/components'
import { getImageInfo, instantiatedComponent, getAssetUrl } from '@/utils'

export type DeviceSortType = '温控' | '安全' | '娱乐' | '其他'

export type DeviceType = {
  name: string
  code: string
  image: string
  category: DeviceSortType
  position?: any
}

export type SceneType = {
  label: string
  value: string
  image: string
  devices: DeviceType[]
}

export function usePlaneGraph(config: {
  planeContainer: Ref<HTMLElement | null>
  deviceContainer: Ref<HTMLElement | null>
}) {
  const { devices, deviceSorts, currentDevices, currentDeviceSort } =
    useDevices()

  //场景列表
  const scenes = reactive<SceneType[]>([
    {
      label: '场景1',
      value: '场景1',
      image: './/images/scenes/1.png',
      devices: [
        {
          name: '空气加湿器',
          code: 'b64d86a19dc7',
          image: './/images/devices/1.png',
          category: '其他',
          position: {
            lat: -63.51433865701932,
            lng: 231,
          },
        },
        {
          name: '电吹风',
          code: 'ad77e73280d3',
          image: './/images/devices/9.png',
          category: '其他',
          position: {
            lat: -118.01213270978559,
            lng: 320.5,
          },
        },
        {
          name: '智能闹钟',
          code: 'c3e3f3a6213d',
          image: './/images/devices/13.png',
          category: '其他',
          position: {
            lat: -84.01323568340246,
            lng: 76,
          },
        },
        {
          name: '滚筒洗衣机',
          code: 'f792dd8f989f',
          image: './/images/devices/6.png',
          category: '其他',
          position: {
            lat: -202.96227830230302,
            lng: 317,
          },
        },
        {
          name: '电风扇',
          code: 'cc805117dc5d',
          image: './/images/devices/16.png',
          category: '其他',
          position: {
            lat: -163.97551398570548,
            lng: 149.5,
          },
        },
        {
          name: '投影仪',
          code: 'b1c9ff86591a',
          image: './/images/devices/8.png',
          category: '娱乐',
          position: {
            lat: -81.51257389923234,
            lng: 155.5,
          },
        },
        {
          name: '按摩椅',
          code: '1ccefe2be178',
          image: './/images/devices/7.png',
          category: '娱乐',
          position: {
            lat: -70.02338304067766,
            lng: 213,
          },
        },
        {
          name: '智能音箱',
          code: 'w5ea0618149d',
          image: './/images/devices/12.png',
          category: '娱乐',
          position: {
            lat: -103.0112503308921,
            lng: 220,
          },
        },
        {
          name: '云台摄像头',
          code: 'cf3be09a9e47',
          image: './/images/devices/4.png',
          category: '安全',
          position: {
            lat: -98.01169152033884,
            lng: 270.5,
          },
        },
        {
          name: '智能门锁',
          code: 'ccc5e7d2c7da',
          image: './/images/devices/14.png',
          category: '安全',
          position: {
            lat: -47.50727962587135,
            lng: 196.5,
          },
        },
        {
          name: '冰柜',
          code: 'e801626f006b',
          image: './/images/devices/17.png',
          category: '温控',
          position: {
            lat: -129.00022059472337,
            lng: 92,
          },
        },
      ],
    },
    {
      label: '场景2',
      value: '场景2',
      image: './/images/scenes/2.png',
      devices: [],
    },
  ])
  //当前场景
  const currentScene = ref(scenes[0].value)

  const map = shallowRef<L.Map>()

  const loading = ref(false)

  //初始化底图
  const onMapInit = () => {
    map.value = L.map(config.planeContainer.value!, {
      minZoom: 1,
      maxZoom: 4,
      crs: L.CRS.Simple,
      attributionControl: false,
    })
  }
  //生成拖拽的监听事件
  const onDragEventInit = () => {
    const deviceContainer = config.deviceContainer.value!
    const planeContainer = config.planeContainer.value!
    //开始拖拽时暂存当前设备编码
    deviceContainer.ondragstart = (event: any) => {
      const el = event.target as HTMLElement
      const code = el.getAttribute('data-code')
      event.dataTransfer!.setData('data-code', code)
    }
    //必要的
    planeContainer.ondragover = (event: any) => event.preventDefault()
    //拖拽结束后的操作逻辑
    planeContainer.ondrop = (event: any) => {
      const code = event.dataTransfer!.getData('data-code')!
      //1.获取当前设备信息
      const device = devices.find((item) => item.code === code)!

      //2.获取当前场景信息,并将当前设备信息添加到场景中
      const scene = scenes.find((item) => item.value === currentScene.value)!
      scene.devices.push(device)
      //3.拿到底图bbox西北的坐标
      // 获取地图当前可视区域的边界(经纬度)
      const bounds = map.value!.getBounds()
      const north = bounds.getNorth()
      const west = bounds.getWest()
      // 将左上角的经纬度转换为地图上的像素位置
      const zoom = map.value!.getZoom()
      const nw = map.value!.project([north, west], zoom)
      // 计算鼠标事件相对于地图容器右上角的像素差
      const rect = planeContainer.getBoundingClientRect()
      // 4.计算鼠标事件在地图上的像素位置
      // 通过将左上角的像素位置与鼠标事件的相对位置相加得到最终坐标
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      // 将鼠标事件的像素位置转换为地图上的经纬度
      const latlng = map.value!.unproject([x + nw.x, y + nw.y], zoom)
      device.position = latlng
      //5.生成设备图标
      generateMarker(device, latlng)
    }
  }
  //当场景切换
  const onSceneChange = async () => {
    loading.value = true
    // 1.首先先清除地图上的所有图层
    map.value!.eachLayer((layer: L.Layer) => {
      map.value!.removeLayer(layer)
    })
    //2.获取当前场景信息
    const scene = scenes.find((item) => item.value === currentScene.value)!
    //3.获取当前场景的图片信息
    const { width, height } = await getImageInfo(scene.image)
    //4.计算并设置底图的大小
    const zoom = map.value!.getMinZoom() + 1
    const southWest = map.value!.unproject([0, height], zoom)
    const northEast = map.value!.unproject([width, 0], zoom)
    const bounds = new L.LatLngBounds(southWest, northEast)
    L.imageOverlay(scene!.image, bounds).addTo(map.value!)
    map.value!.fitBounds(bounds)
    loading.value = false
    //5.获取当前场景的设备信息
    scene.devices.forEach((device) => {
      if (device.position) generateMarker(device, device.position)
    })
    //todo
  }
  //从当前场景中删除设备
  const onRemoveDevice = (code: string) => {
    const scene = scenes.find((item) => item.value === currentScene.value)!
    scene.devices = scene.devices.filter((item) => item.code !== code)

    // 从地图上移除对应的 marker
    map.value!.eachLayer((layer: L.Layer) => {
      if (layer instanceof L.Marker && layer.options.title === code) {
        map.value!.removeLayer(layer)
      }
    })
    Array.from(document.querySelectorAll('.arco-trigger-popup')).map((item) => {
      document.body.removeChild(item)
    })
  }
  //生成marker
  const generateMarker = (device: DeviceType, latlng: any) => {
    // console.log('latlng', latlng)
    const html = instantiatedComponent(BaseDeviceMarker, {
      data: device,
      onRemove: onRemoveDevice,
    })
    const icon = L.divIcon({
      html,
      iconSize: [2, 2],
      iconAnchor: [1, 1],
    })
    const marker = L.marker(latlng, { icon, draggable: true })
    marker.options.title = device.code

    marker.on('mouseover', () => {
      marker.getElement()!.style.zIndex = '1000'
    })
    marker.on('mouseout', () => {
      marker.getElement()!.style.zIndex = '256'
    })
    marker.on('moveend', () => {
      device.position = marker.getLatLng()
    })
    marker.addTo(map.value!)
  }
  //导出场景数据
  const onExportScenes = () => {
    // 将数据转换为 JSON 字符串
    const json = JSON.stringify(scenes, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'scenes.json'
    a.click()
  }
  // 导入场景数据
  const onImportScenes = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async () => {
      const file = input.files![0]
      const reader = new FileReader()
      reader.onload = (event) => {
        const json = event.target!.result as string
        const data: any[] = JSON.parse(json)
        scenes.length = 0
        data.forEach((item, index) => {
          scenes[index] = item
        })
        currentScene.value = scenes[0].value
        onSceneChange()
      }
      reader.readAsText(file)
    }
    input.click()
  }

  onMounted(() => {
    onMapInit()
    onDragEventInit()
    onSceneChange()
  })

  return {
    devices,
    deviceSorts,
    scenes,
    currentDevices,
    currentDeviceSort,
    currentScene,
    onSceneChange,
    onRemoveDevice,
    onExportScenes,
    onImportScenes,
  }
}

function useDevices() {
  //全部设备
  const devices = reactive<DeviceType[]>([
    {
      name: '空气加湿器',
      code: 'b64d86a19dc7',
      image: getAssetUrl('/images/devices/1.png'),
      category: '其他',
    },
    {
      name: '轻薄笔记本',
      code: 'k52b8717d009',
      image: getAssetUrl('/images/devices/1.png'),
      category: '娱乐',
    },
    {
      name: '智慧吸顶灯',
      code: 'c8317a6a586f',
      image: getAssetUrl('/images/devices/3.png'),
      category: '其他',
    },
    {
      name: '云台摄像头',
      code: 'cf3be09a9e47',
      image: getAssetUrl('/images/devices/4.png'),
      category: '安全',
    },
    {
      name: '空气净化器',
      code: 'qaa2d9c17cda',
      image: getAssetUrl('/images/devices/5.png'),
      category: '温控',
    },
    {
      name: '滚筒洗衣机',
      code: 'f792dd8f989f',
      image: getAssetUrl('/images/devices/6.png'),
      category: '其他',
    },
    {
      name: '按摩椅',
      code: '1ccefe2be178',
      image: getAssetUrl('/images/devices/7.png'),
      category: '娱乐',
    },

    {
      name: '投影仪',
      code: 'b1c9ff86591a',
      image: getAssetUrl('/images/devices/8.png'),
      category: '娱乐',
    },
    {
      name: '电吹风',
      code: 'ad77e73280d3',
      image: getAssetUrl('/images/devices/9.png'),
      category: '其他',
    },
    {
      name: '温度传感器',
      code: 'd500b354a7fd',
      image: getAssetUrl('/images/devices/10.png'),
      category: '温控',
    },
    {
      name: '扫地机器人',
      code: 'f32638d152b8',
      image: getAssetUrl('/images/devices/11.png'),
      category: '安全',
    },
    {
      name: '智能音箱',
      code: 'w5ea0618149d',
      image: getAssetUrl('/images/devices/12.png'),
      category: '娱乐',
    },
    {
      name: '智能闹钟',
      code: 'c3e3f3a6213d',
      image: getAssetUrl('/images/devices/13.png'),
      category: '其他',
    },
    {
      name: '智能门锁',
      code: 'ccc5e7d2c7da',
      image: getAssetUrl('/images/devices/14.png'),
      category: '安全',
    },
    {
      name: '打印机',
      code: 'eeb5772561a6',
      image: getAssetUrl('/images/devices/15.png'),
      category: '其他',
    },
    {
      name: '电风扇',
      code: 'cc805117dc5d',
      image: getAssetUrl('/images/devices/16.png'),
      category: '其他',
    },
    {
      name: '冰柜',
      code: 'e801626f006b',
      image: getAssetUrl('/images/devices/17.png'),
      category: '温控',
    },
  ])
  //分类列表
  const deviceSorts = reactive<DeviceSortType[]>([
    '其他',
    '娱乐',
    '安全',
    '温控',
  ])
  //当前分类
  const currentDeviceSort = ref<DeviceSortType>(deviceSorts[0])
  //当前分类下的设备
  const currentDevices = computed(() =>
    devices.filter((item) => item.category === currentDeviceSort.value)
  )

  return {
    devices,
    deviceSorts,
    currentDevices,
    currentDeviceSort,
  }
}

export default usePlaneGraph
