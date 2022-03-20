import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jukeboxAddress: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
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
