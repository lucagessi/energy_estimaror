<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/rechargable.svg"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <Laboratory></Laboratory>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Laboratory from './components/Laboratory.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Laboratory,
  },

  data: () => ({
    //
  }),
});
</script>
