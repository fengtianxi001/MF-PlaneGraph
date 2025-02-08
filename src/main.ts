import { createApp } from 'vue'
import App from './App.vue'
import Arco from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.less'
import '@/assets/styles/reset.scss'
import 'leaflet/dist/leaflet.css'

const boostrap = async () => {
  const app = createApp(App)
  app.use(Arco)
  app.mount('#app')
}

boostrap()
