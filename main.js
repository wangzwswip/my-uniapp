import Vue from 'vue'
import App from './App'
import store from './store'

import * as http from './services'
import * as project from './services/project.js'

Vue.prototype.$http = http
Vue.prototype.$projectHttp = project

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
