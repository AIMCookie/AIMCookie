import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Store from 'vuex'


createApp(App).use(Router).use(Store).use(ElementPlus).mount('#app')
