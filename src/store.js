import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import _orderBy from 'lodash/orderBy'

import data from './assets/data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    map: {
      zoom: 16,
      center: [21.347414, -101.9295052],
      tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    },
    parties: data.parties
  },
  getters: {
    getParties: state => _orderBy(state.parties, 'date', 'asc').map(party => ({
      ...party,
      dateFormatted: moment(party.date).format('Do MMM YY'),
      isToday: moment(party.date).isSame(moment(), 'day')
    })),
    getMapParties: state => state.parties.map((party) => ({
      ...party,
      coords: [party.coords.latitude, party.coords.longitude]
    })),
    getMapData: state => state.map
  },
  mutations: {
    setMapCenter (state, coords) {
      state.map.center = [coords.latitude, coords.longitude]
    }
  },
  actions: {
    setMapCenter (context, coords) {
      context.commit('setMapCenter', coords)
    }
  }
})
