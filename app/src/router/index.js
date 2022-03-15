import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const auth = (to, from, next) => {
  (window.metamask.ready('rinkeby') || window.metamask.ready('hardhat'))
    ? next()
    : next('/');
}

const guest = (to, from, next) => {
  (window.metamask.ready('rinkeby') || window.metamask.ready('hardhat'))
    ? next('/jukebox')
    : next();
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: guest,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/jukebox',
    name: 'jukebox',
    component: () => import(/* webpackChunkName: "jukebox" */ '../views/JukeboxView.vue'),
    beforeEnter: auth,
  },
  {
    path: '/my-nfts',
    name: 'my-nfts',
    component: () => import(/* webpackChunkName: "my-nfts" */ '../views/MyNFTsView.vue'),
    beforeEnter: auth,
  },
  {
    path: '/artists',
    name: 'artists',
    component: () => import(/* webpackChunkName: "artists" */ '../views/ArtistsView.vue'),
    beforeEnter: auth,
  },
  {
    path: '/buy-song',
    name: 'buy-song',
    component: () => import(/* webpackChunkName: "buy-song" */ '../views/BuySONGView.vue'),
    beforeEnter: auth,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
