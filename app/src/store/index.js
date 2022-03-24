import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jukeboxAddress: '0xD21D34753400a696C74a8Cd21d46e4190d7118eD',
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
