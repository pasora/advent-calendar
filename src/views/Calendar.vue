<template>
  <div>
    <b-row>
      <b-col cols="2">Date</b-col>
      <b-col>Title</b-col>
      <b-col>URL</b-col>
      <b-col cols="2">Name</b-col>
      <b-col cols="2"></b-col>
    </b-row>
    <b-row v-for="post in this.posts" :key="post.id">
      <b-col cols="2">{{post.year}}年12月{{post.day}}日</b-col>
      <b-col>{{post.title}}</b-col>
      <b-col href="post.url">{{post.url}}</b-col>
      <b-col cols="2">{{post.name}}</b-col>
      <b-col cols="2"></b-col>
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
    db.collection('posts').get().then((querySnapshot) => {
      this.loading = false;
      let rawData = [];
      querySnapshot.forEach((doc) => {
        let data = {
          'id': doc.id,
          'year': doc.data().year,
          'day': doc.data().day,
          'name': doc.data().name,
          'passphrase': doc.data().passphrase,
          'title': doc.data().title,
          'url': doc.data().url
        };
        rawData.push(data);
        let byDay = rawData.slice(0);
        this.posts = byDay.sort(function (a, b) {
          return a.day - b.day;
        });
      });
    })
  },
  methods: {
    zeroPadding(day) {
      return ('0' + day).slice(-2)
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
