import 'vuetify/src/stylus/app.styl'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify, {
  customProperties: true,
  iconfont: 'fa',
  icons: {
    map: 'fas fa-map-marked-alt',
    pin: 'fas fa-map-pin'
  }
})
