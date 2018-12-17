<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer>
      <v-bottom-nav
        :active.sync="bottomNav"
        :value="true"
        absolute
        color="red darken-4"
      >
        <v-btn
          color="white"
          flat
          value="home"
          to="/"
        >
          <span>Inicio</span>
          <v-icon>home</v-icon>
        </v-btn>
        <v-btn
          color="white"
          flat
          value="map"
          to="/map"
        >
          <span>Mapa</span>
          <v-icon v-text="'$vuetify.icons.map'"></v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      bottomNav: 'home'
    }
  }
}
</script>
<style>
  footer {
    z-index: 999;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
