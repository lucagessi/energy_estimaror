<template>
  <div id="app">
    <img alt="Lab logo" src="https://i1.sndcdn.com/avatars-000309127489-j2rdxs-t500x500.jpg">
    <Laboratory msg="We were joking ;)"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Laboratory from './components/Laboratory.vue';

@Component({
  components: {
    Laboratory,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
