<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/">Advent Calendar</b-navbar-brand>

    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown v-if="userStatus" :text="user.email">
        <b-dropdown-item to="/logout">Log out</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item v-else to="/login">Log in</b-nav-item>
    </b-navbar-nav>

  </b-navbar>
</template>

<script>
import firebase from '../firebase'

export default {
  name: "NavBar",
  created: function() {
    firebase.onAuth();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userStatus() {
      return this.$store.getters.isSignedIn;
    }
  },
}
</script>

<style scoped>

</style>
