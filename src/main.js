import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import mixins from '@/mixins/v-mixin'
import UIComps from '@/components/UI'
import UIIcons from '@/components/UI/UI-Icons'
import filters from '@/filters'

import '@/styles/styles.scss'

const ui = [...UIComps, ...UIIcons]

Vue.config.productionTip = false
Vue.mixin(mixins)

ui.forEach(UIcomp => Vue.component(UIcomp.name, UIcomp))

filters.forEach(fltr => { Vue.filter(fltr.name, fltr.prop) })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
