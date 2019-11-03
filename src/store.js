import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    status: false,
    onInfo: false,
    infoMessage: '',
    onWarning: false,
    warningMessage: '',
    onError: false,
    errorMessage: ''
  },
  mutations: {
    onAuthStateChanged(state, user) {
      state.user = user;
    },
    onUserStatusChanged(state, status) {
      state.status = status;
    },
    onInfo(state, message) {
      state.onInfo = true;
      state.infoMessage = message;
    },
    onWarning(state, message) {
      state.onWarning = true;
      state.warningMessage = message;
    },
    onError(state, message) {
      state.onError = true;
      state.errorMessage = message;
    },
    onResetAlert(state) {
      state.onInfo = false;
      state.infoMessage = '';
      state.onWarning = false;
      state.warningMessage = '';
      state.onError = false;
      state.errorMessage = '';
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isSignedIn(state) {
      return state.status;
    },
    infoMessage(state) {
      return state.infoMessage;
    },
    onInfo(state) {
      return state.onInfo;
    },
    warningMessage(state) {
      return state.warningMessage;
    },
    onWarning(state) {
      return state.onWarning;
    },
    errorMessage(state) {
      return state.errorMessage;
    },
    onError(state) {
      return state.onError;
    }
  }
});
