import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import drag from "v-drag"

import './assets/main.scss'

// const sass = require('sass');
// const result = sass.compile(main.scss);

const app = createApp(App)

app.use(router)

app.use(drag)

app.mount('#app')
