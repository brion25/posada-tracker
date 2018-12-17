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
      <router-link :to="{path: 'map', query: {party: party.id}}" class="party__address green--text text--darken-4">
        <v-icon v-text="'$vuetify.icons.pin'"></v-icon>
        <span class="ml-2 party__address--text">{{party.address}}</span>
      </router-link>
    </v-card-text>
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

  .party__address {
    text-decoration: none;
  }
  .party__address--text {
    text-decoration: underline;
  }
</style>
