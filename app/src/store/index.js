import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jukeboxAddress: '0xFd88165152376B250F212eA5500af158123a2c21',
    catalog: [],
  },
  getters: {
  },
  mutations: {
    setCatalog(state, catalog) {
      state.catalog = catalog;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    vuexLocal.plugin
  ],
})
