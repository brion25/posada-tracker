<template>
  <v-card color="green lighten-3" class="green--text text--darken-4" v-bind:class="{today: party.isToday}">
    <v-card-title primary-title class="py-2 party__header">
      <h4 class="headline">{{party.dateFormatted}}</h4>
    </v-card-title>
    <v-divider light></v-divider>
    <v-card-text class="party__content">
      <h5 class="title">{{party.name}}</h5>
      <p class="my-2">{{party.description}}</p>
    </v-card-text>
    <v-card-text class="party__content pt-0">
      <div>
        <v-icon v-text="'$vuetify.icons.pin'"></v-icon>
        <span class="ml-2">{{party.address}}</span>
      </div>
    </v-card-text>
    <v-divider light></v-divider>
    <v-card-actions class="party__actions">
      <v-btn :to="{path: 'map', query: {party: party.id}}" flat dark color="green darken-4">Direccion!</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default ({
  props: {
    party: Object
  }
})
</script>
<style>
  .today .party__header,
  .today .party__actions {
    background-color: #81C784;
  }

  .today .party__content {
    background-color: #A5D6A7;
  }

  .party__header,
  .party__actions {
    background-color: #C8E6C9;
  }
  .party__content {
    background-color: #E8F5E9;
  }
</style>
