import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import store from './store'
import secret from './firebaseSecret'
import router from './router'

export default {
  db() {
    return firebase.firestore();
  },
  init() {
    firebase.initializeApp(secret.config);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  },
  emailLogin(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
      store.commit('onInfo', result);
      router.push('/');
    }).catch(error => {
      store.commit('onError', error);
    })
  },
  logout() {
    firebase.auth().signOut()
  },
  onAuth() {
    firebase.auth().onAuthStateChanged(user => {
      user = user ? user : {};
      store.commit('onAuthStateChanged', user);
      store.commit('onUserStatusChanged', !!user.uid);
    });
  },
  updateProfile(user, displayName) {
    user.updateProfile({
      displayName: displayName
    }).then(result => {
      store.commit('onInfo', result);
      router.push('/');
    }).catch(error => {
      store.commit('onError', error);
    })
  }
};
