<template>
  <div id="app">
    <nav-bar/>
    <b-alert :show="this.$store.state.onError" variant="danger">{{ this.$store.state.errorMessage }}</b-alert>
    <b-alert :show="this.$store.state.onWarning" variant="warning">{{ this.$store.state.warningMessage }}</b-alert>
    <router-view class="p-3"/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  components: {NavBar}
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
