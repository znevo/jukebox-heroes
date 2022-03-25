import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jukeboxAddress: '0x7F24375EAD61d880F6376ABFc16b1A22936f907a',
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
