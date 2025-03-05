import App from './App.vue'
import { createApp } from 'vue'
import 'leaflet/dist/leaflet.css'
import '@arco-design/web-vue/dist/arco.less'
import '@/assets/styles/reset.scss'
import '@/assets/fonts/DincorosBlack/result.css'
import '@/assets/fonts/SarasaMonoSC/result.css'
import '@/assets/fonts/Furore/result.css'
import '@/assets/iconfont/iconfont.css'

const boostrap = async () => {
  const app = createApp(App)
  app.mount('#app')
}

boostrap()
