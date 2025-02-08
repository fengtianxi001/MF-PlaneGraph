import { ref } from 'vue'
import { type DeviceItemType } from './devices'

export type SceneItemType = {
  label: string
  value: string
  devices: DeviceItemType[]
}

export const sceneList = ref<SceneItemType[]>([
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

export const sceneCurrent = ref(sceneList.value[0].value)
