<template>
  <b-container>
    <b-form class="my-2">
      <b-form-group id="input-group-displayName" label="Name" label-cols="2" label-for="input-displayName">
        <b-form-input required id="input-displayName" v-model="displayName" type="text" :placeholder="this.$store.state.user.displayName"/>
      </b-form-group>
      <b-button block @click="updateProfile">Update</b-button>
    </b-form>
  </b-container>
</template>

<script>
import firebase from '../firebase'
import store from '../store';

export default {
  name: 'login',
  data() {
    return {
      displayName: ''
    }
  },
  mounted() {
    store.commit('onResetAlert')
  },
  created: function() {
    firebase.onAuth()
  },
  methods: {
    updateProfile() {
      firebase.updateProfile(this.$store.state.user, this.displayName)
    }
  }
};
</script>

<style>
  .mt-2 {
    margin-top: 2px;
  }
</style>
