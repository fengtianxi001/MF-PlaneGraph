<template>
  <Layout>
    <BasePanel title="房间平面图">
      <template #filter>
        <RadioGroup v-model="sceneCurrent" :options="sceneList" type="button" />
      </template>
      <template #body>
        <div class="plane-container" ref="planeContainer"></div>
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
        <div class="device-container" ref="deviceContainer">
          <BaseDeviceItem v-for="item in deviceListByCategory" :data="item" />
        </div>
      </template>
    </BasePanel>
  </Layout>
</template>
<script setup lang="ts">
import * as L from 'leaflet'
import { BasePanel, BaseDeviceItem, BaseDeviceMarker } from '@/components'
import { RadioGroup, Radio } from '@arco-design/web-vue'
import { Layout } from '@/layout'
import { ref, onMounted, defineComponent, h, createVNode, render } from 'vue'
import {
  deviceListByCategory,
  deviceCategoryList,
  deviceCategoryCurrent,
  sceneList,
  sceneCurrent,
} from '@/stores'

const planeContainer = ref<HTMLElement>()
const deviceContainer = ref<HTMLElement>()

onMounted(() => {
  const map = L.map(planeContainer.value, {
    minZoom: 1,
    maxZoom: 4,
    crs: L.CRS.Simple,
    attributionControl: false,
  })

  // 定义图片的宽度和高度，以及图片的路径
  const config = {
    width: 1103,
    height: 1025,
    url: '/images/scenes/1.png',
  }

  const southWest = map.unproject([0, config.height], map.getMinZoom() + 1)
  const northEast = map.unproject([config.width, 0], map.getMinZoom() + 1)
  const bounds = new L.LatLngBounds(southWest, northEast)
  L.imageOverlay(config.url, bounds).addTo(map)

  map.fitBounds(bounds)

  //

  const de = deviceContainer.value!
  const pe = planeContainer.value!

  de.ondragstart = (event: any) => {
    // console.log('event.dataTransfer',event.dataTransfer.setData)
    event.dataTransfer!.setData('id', '123')
  }
  // 正在拖动
  de.ondrag = function () {
    // console.log('ondrap正在拖动')
  }
  // 拖动结束
  de.ondragend = function () {
    console.log('ondragend拖动结束')
  }

  // pe.ondragenter = function () {
  //   console.log('ondragenter进入到放置元素')
  // }
  // 在放置元素内移动
  pe.ondragover = function (event: any) {
    event.preventDefault()
  }
  // 将拖动元素放置到放置元素
  pe.ondrop = function (event: any) {
    // const a = map.project({lat:10,lng:10},map.getZoom())
    // console.log('a',a)
    // console.log('event', event)
    var bounds2 = map.getBounds()
    var north = bounds2.getNorth()
    var west = bounds2.getWest()
    var c2 = map.project([north, west], map.getZoom())
    // console.log('c1',c1)
    // console.log("c2", c2);
    // const { clientX,clientY } = event;

    const rect = pe.getBoundingClientRect()

    // 计算相对坐标
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const latlng = map.unproject([x + c2.x, y + c2.y], map.getZoom())

    const newComponent = defineComponent({
      render: () => h(BaseDeviceMarker, {}),
    })
    const instance = createVNode(newComponent)
    render(instance, document.createElement('div'))

    const icon = L.divIcon({
      html: instance.el,
      iconSize: [2, 2],
      iconAnchor: [1, 1],
    })
    L.marker(latlng, { icon, draggable: true }).addTo(map)
  }
})
</script>

<style lang="scss" scoped>
.device-container {
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
