<template>
  <b-container>
    <b-form class="my-2">
      <b-form-group id="input-group-email" label="Email Address" label-cols="3" label-for="input-email">
        <b-form-input required id="input-email" v-model="email" type="email" placeholder="Enter email"/>
      </b-form-group>
      <b-form-group id="input-group-password" label="Password" label-cols="3" label-for="input-password">
        <b-form-input required id="input-password" v-model="password" type="password" placeholder="Enter password"/>
      </b-form-group>
      <b-button block @click="emailLogin">Log in</b-button>
    </b-form>
    <b-form class="my-2">
      <b-button block @click="googleLogin">Log in with Google</b-button>
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
      email: '',
      password: ''
    }
  },
  mounted() {
    store.commit('onResetAlert')
  },
  created: function() {
    firebase.onAuth()
  },
  methods: {
    emailLogin() {
      firebase.emailLogin(this.email, this.password)
    },
    googleLogin() {
      firebase.googleLogin()
    }
  }
};
</script>

<style>
  .mt-2 {
    margin-top: 2px;
  }
</style>
