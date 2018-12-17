<template>
  <v-container grid-list-md>
    <v-layout row wrap justify-center class="parties__container">
      <v-flex xs12 md6 v-for="(party, index) in parties" :key="index">
        <PartyCard v-bind:party="party"></PartyCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import PartyCard from '@/components/PartyCard'

export default ({
  mounted: function () {
    window.setTimeout(() => {
      const element = this.$el.querySelector('.today')
      const rect = element.getBoundingClientRect()
      window.scrollTo(rect.left, rect.top)
    }, 500)
  },
  components: {
    PartyCard
  },
  computed: mapGetters({
    parties: 'getParties'
  })
})
</script>
