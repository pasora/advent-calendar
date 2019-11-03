<template>
  <div>
    ログアウトしています
  </div>
</template>

<script>
import firebase from '../firebase'
import router from '../router'

export default {
  name: "Logout",
  mounted() {
    firebase.logout();
    router.push('/')
  }
}
</script>

<style scoped>

</style>
