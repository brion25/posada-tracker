<script src="../store.js"></script>
<template>
  <div class="map__content">
    <h3 class="font-weight-light py-3 text-xs-center white--text red darken-4">Ubicacion de las Posadas!</h3>
    <LMap ref="partiesMap" :zoom="map.zoom" :center="map.center">
      <LTileLayer :url="map.tileLayer"></LTileLayer>
      <template v-if="!$route.query.party">
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
    if (navigator.geolocation) {
      this.getPositions()
    }
  },
  methods: {
    getPositions: function() {
      const options = {
        timeout: 5000,
        maximumAge: 0
      }

      navigator.geolocation.getCurrentPosition(this.handlePosition, this.handleError, options)
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
      const {query: { party }} = this.$route

      if (party) {
        const map = this.$refs.partiesMap.mapObject
        const partyObj = this.parties.find(({id}) => id == Number(party))
        console.log(partyObj)

        L.Routing.control({
          waypoints: [
            L.latLng(coords.latitude, coords.longitude),
            L.latLng(partyObj.coords[0], partyObj.coords[1])
          ],
          routeWhileDragging: true,
          show: false
        }).addTo(map)
      }

      this.setCenter(coords)
    },
    ...mapActions({
      setCenter: 'setMapCenter'
    })
  },
  computed: {
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
</style>
