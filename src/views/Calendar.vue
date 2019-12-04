<template>
  <div>
    <b-row>
      <b-col cols="2">Date</b-col>
      <b-col>Title</b-col>
      <b-col cols="2">Name</b-col>
      <b-col cols="2"></b-col>
    </b-row>
    <b-row class="mt-1" v-for="post in this.posts" :key="post.id">
      <b-col cols="2">12/{{zeroPadding(post.date)}}</b-col>
      <b-col v-if="showConfidential(post.confidential)">
        <router-link to="/login">Login to show confidential post</router-link>
      </b-col>
      <b-col v-else>
        <a v-if="canShow(post.date)" :href="post.url">
          <b-badge variant="danger" v-if="post.confidential">CONFIDENTIAL</b-badge>
          {{post.title}}
        </a>
        <div v-else>
          <b-badge variant="danger" v-if="post.confidential">CONFIDENTIAL</b-badge>
          {{post.title}}
        </div>
      </b-col>
      <b-col cols="2">{{post.author}}</b-col>
      <b-col cols="2" v-if="isMine(post.uid)">
        <b-button size="sm" v-b-modal.edit-post @click="openModal(post)">Edit</b-button>
      </b-col>
      <b-col cols="2" v-else-if="canInput(post.uid)">
        <b-button size="sm" v-b-modal.edit-post @click="openModal(post)">Entry</b-button>
      </b-col>
      <b-col cols="2" v-else-if="canLike(post.uid)">
        <b-button variant="primary" size="sm" @click="like(post)">
          Like<b-badge>{{post.like}}</b-badge>
        </b-button>
      </b-col>
    </b-row>
    <b-modal
      id="edit-post"
      :title='"Edit post for 12/" + zeroPadding(this.form.date)'
      centered
      hide-footer
    >
      <form @submit="update">
        <b-form-group
                label="Author"
                label-for="author-input"
        >
          <b-form-input
                  id="author-input"
                  v-model="form.author"
                  type="text"
                  :placeholder="this.$store.state.user.displayName"
          ></b-form-input>
        </b-form-group>
        <b-form-group
                label="Title"
                label-for="title-input"
        >
          <b-form-input
                  id="title-input"
                  v-model="form.title"
                  type="text"
                  required
                  :placeholder="this.form.title"
          ></b-form-input>
        </b-form-group>
        <b-form-group
                label="URL"
                label-for="author-input"
        >
          <b-form-input
                  id="author-input"
                  v-model="form.url"
                  type="url"
                  required
                  :placeholder="this.form.url"
          ></b-form-input>
        </b-form-group>
        <b-form-group
                label="Confidential"
                label-for="confidential-checkbox"
        >
          <b-form-checkbox
                  id="confidential-checkbox"
                  v-model="form.confidential"
                  switch
                  :placeholder="this.form.confidential"
            ></b-form-checkbox>
        </b-form-group>
        <b-button class="m-1" type="submit" variant="primary">Submit</b-button>
        <b-button class="m-1" @click="closeModal">Cancel</b-button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import store from '../store';
import firebase from '../firebase'

export default {
  name: "Calendar",
  data: () => ({
    db: Object,
    posts: [],
    form: Object,
    date: new Date()
  }),
  mounted() {
    store.commit('onResetAlert')
  },
  created() {
    this.db = firebase.db().collection(this.$route.params.id);
    this.db.get().then((querySnapshot) => {
      let rawData = [];
      querySnapshot.forEach((doc) => {
        let data = {
          'id': doc.id,
          'date': doc.data().date,
          'author': doc.data().author,
          'title': doc.data().title,
          'url': doc.data().url,
          'like': doc.data().like,
          'confidential': doc.data().confidential,
          'uid': doc.data().uid
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
      return postedDate <= date;
    },
    openModal(post) {
      this.form = Object.assign({}, post);
      this.$bvModal.show("edit-post");
    },
    closeModal() {
      this.$bvModal.hide("edit-post");
      this.form = Object.assign({}, {});
    },
    isMine(uid){
      return null != uid && uid === this.$store.getters.user.uid;
    },
    canShow(date){
      let postDate = new Date(this.$route.params.id, 11, date, 0, 0);
      return postDate <= this.date;
    },
    canInput(uid){
      return null == uid && this.$store.getters.isSignedIn;
    },
    canLike(uid){
      return null != uid
    },
    showConfidential(confidential) {
      return confidential && !this.$store.getters.isSignedIn;
    },
    update(evt) {
      evt.preventDefault();
      if (!this.canInput(this.db.doc(this.form.id).get().uid)) {
        store.commit('onError', "Error occurred, please retry");
        this.closeModal()
      }
      this.form.uid = this.$store.getters.user.uid;
      this.form.like = 0;
      if (this.form.author == null) this.form.author = this.$store.state.user.displayName;
      if (this.form.confidential == null) this.form.confidential = false;
      this.db.doc(this.form.id).set(this.form).then(function() {
        alert('Your post was successfully registered.\nPlease reload to show your new post');
      }).catch(function(error) {
        store.commit('onError', error);
      });
    },
    like(post){
      post.like += 1;
      this.db.doc(post.id).set(post);
    }
  }
}
</script>

<style scoped>

</style>
