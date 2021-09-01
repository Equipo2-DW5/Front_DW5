import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import BalmUI from 'balm-ui';
import 'balm-ui/dist/balm-ui.css';
import store from './store'
createApp(App).use(BalmUI).use(store).use(router).mount('#app')
