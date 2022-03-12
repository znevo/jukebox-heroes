import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/jukebox',
    name: 'jukebox',
    component: () => import(/* webpackChunkName: "jukebox" */ '../views/JukeboxView.vue')
  },
  {
    path: '/my-nfts',
    name: 'my-nfts',
    component: () => import(/* webpackChunkName: "my-nfts" */ '../views/MyNFTsView.vue')
  },
  {
    path: '/artists',
    name: 'artists',
    component: () => import(/* webpackChunkName: "artists" */ '../views/ArtistsView.vue')
  },
  {
    path: '/buy-song',
    name: 'buy-song',
    component: () => import(/* webpackChunkName: "buy-song" */ '../views/BuySONGView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
