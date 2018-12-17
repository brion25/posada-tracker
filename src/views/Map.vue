<script src="../store.js"></script>
<template>
  <div class="map__content">
    <div class="map__loader" v-if="loading">
      <v-progress-circular indeterminate="true" color="red darken-4" :size="50"></v-progress-circular>
    </div>
    <LMap ref="partiesMap" :zoom="map.zoom" :center="map.center">
      <LTileLayer :url="map.tileLayer"></LTileLayer>
      <template v-if="$route.query.party && party">
        <LMarker @add="markerAdd" :lat-lng="[party.coords.latitude, party.coords.longitude]">
          <LPopup>
            <h3>{{party.name}}</h3>
            <small>{{party.address}}</small>
            <p class="party__description">
              {{party.description}}
            </p>
            <router-link :to="{path: '/map', query: {location: party.id}}">
              Indicaciones hasta aqui
            </router-link>
          </LPopup>
        </LMarker>
      </template>
      <template v-if="!$route.query.location && !$route.query.party">
        <LMarker v-for="(party, index) in parties" :key="index" :lat-lng="party.coords">
          <LPopup>
            <h3>{{party.name}}</h3>
            <small>{{party.address}}</small>
            <p>
              {{party.description}}
            </p>
          </LPopup>
        </LMarker>
      </template>
    </LMap>
  </div>
</template>
<script>
import { L, LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import { mapGetters, mapActions } from 'vuex'

export default ({
  mounted: function () {
    this.getPositions()
  },
  watch: {
    $route: function(nextRoute, prevRoute) {
      const {query: { location: nextLocation }} = nextRoute
      const {query: { location: prevLocation }} = prevRoute
      if (Number(nextLocation) !== Number(prevLocation)) {
        this.getPositions()
      }
    }
  },
  methods: {
    markerAdd: function (event) {
      // Hack to open the popup once it is loaded
      window.setTimeout(() => {
        event.target.openPopup()
      }, 250)
    },
    getPositions: function() {
      this.loading = true
      const {query: { party }} = this.$route
      if (party) {
        this.setCenter(this.party.coords)
        this.loading = false
      }
      if (navigator.geolocation && !party) {
        const options = {
          timeout: 5000,
          maximumAge: 0
        }

        navigator.geolocation.getCurrentPosition(this.handlePosition, this.handleError, options)
      }
    },
    handleError: function(error) {
      const {message, code} = error
      console.error(`Error ${code}`, message)
      if (code === 3) {
        this.getPositions()
      }
    },
    handlePosition: function(position) {
      const { coords } = position
      const {query: { location }} = this.$route

      if (location) {
        const map = this.$refs.partiesMap.mapObject
        const partyObj = this.$store.getters.getParty(location)

        L.Routing.control({
          waypoints: [
            L.latLng(coords.latitude, coords.longitude),
            L.latLng(partyObj.coords.latitude, partyObj.coords.longitude)
          ],
          routeWhileDragging: true,
          show: false
        }).addTo(map)
      }

      this.setCenter(coords)
      this.loading = false
    },
    ...mapActions({
      setCenter: 'setMapCenter'
    })
  },
  computed: {
    party: function() {
      const {query: { party }} = this.$route
      if (!party) {
        return null
      }
      return this.$store.getters.getParty(party)
    },
    ...mapGetters({
      map: 'getMapData',
      parties: 'getMapParties'
    })
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  }
})
</script>
<style>
  .map__content {
    height: 100%;
  }
  .map__loader {
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    background-color: #FFCDD2;
  }

  .party__description {
    max-width: 250px;
  }
</style>
