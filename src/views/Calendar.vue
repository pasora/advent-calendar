<template>
  <div>
    <b-row>
      <b-col cols="2">Date</b-col>
      <b-col>Title</b-col>
      <b-col cols="2">Name</b-col>
      <b-col cols="2"></b-col>
    </b-row>
    <b-row v-for="post in this.posts" :key="post.id">
      <b-col cols="2">{{$route.params.id}}年12月{{post.date}}日</b-col>
      <b-col v-if="post.confidential"><router-link to="/login">Login to show confidential post</router-link></b-col>
      <b-col v-else><a :href="post.url">{{post.title}}</a></b-col>
      <b-col cols="2">{{post.author}}</b-col>
      <b-col cols="2" v-if="post.isMine">Edit</b-col>
      <b-col cols="2" v-else-if="!post.author">Entry</b-col>
      <b-col cols="2" v-else></b-col>
    </b-row>
  </div>
</template>

<script>
import store from '../store';
import firebase from '../firebase'

export default {
  name: "Calendar",
  data: () => ({
    posts: [],
    loading: true
  }),
  mounted() {
    store.commit('onResetAlert')
  },
  created() {
    const db = firebase.db();
    db.collection(this.$route.params.id).get().then((querySnapshot) => {
      this.loading = false;
      let rawData = [];
      querySnapshot.forEach((doc) => {
        let data = {
          'id': doc.id,
          'date': doc.data().date,
          'author': doc.data().author,
          'title': doc.data().title,
          'url': doc.data().url,
          'confidential': doc.data().confidential && !this.$store.getters.isSignedIn,
          'isMine': doc.data().uid === this.$store.getters.user.uid
        };
        rawData.push(data);
        let byDay = rawData.slice(0);
        this.posts = byDay.sort(function (a, b) {
          return a.date - b.date;
        });
      });
    })
  },
  methods: {
    zeroPadding(date) {
      return ('0' + date).slice(-2)
    },
    isAvailable(postedYear, postedDay) {
      let today = new Date();
      let date = today.getFullYear().toString() + (today.getMonth() + 1).toString() + this.zeroPadding(today.getDate()).toString();
      let postedDate = postedYear + "12" + postedDay;
      return postedDate <= date
    }
  }
}
</script>

<style scoped>

</style>
