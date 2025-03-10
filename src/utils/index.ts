import { createVNode, defineComponent, h, render } from 'vue'

export function getImageInfo(url: string) {
  return new Promise<{
    width: number
    height: number
  }>((resolve, reject) => {
    const image = new Image()
    image.onload = () =>
      resolve({
        width: image.width,
        height: image.height,
      })
    image.src = url
  })
}

export function instantiatedComponent(component: any, props: any) {
  const newComponent = defineComponent({
    render() {
      return h(component, props)
    },
  })
  const instance = createVNode(newComponent)
  render(instance, document.createElement('div'))
  return instance.el as HTMLElement
}

export function getAssetUrl(url: string) {
  return `${import.meta.env.VITE_API_DOMAIN}/${url}`
}
