import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      components: { full: () => import('./full') },
      children: [
        { name: 'log', path: '/log', component: () => import('@/view/log') },
        { name: 'refresh', path: '/refresh', component: () => import('@/view/refresh') },
        { name: 'login', path: '/', component: () => import('@/view/login') },
      ],
    },
    {
      path: '/chat',
      components: { full: () => import('./admin') },
      children: [
        { name: 'personRoomRelateList', path: '/personRoomRelate', component: () => import('@/view/personRoomRelate/list') },
        { name: 'friendList', path: '/friend', component: () => import('@/view/friend/list') },
        { name: 'room', path: '/room/:id', component: () => import('@/view/room') },
      ],
    },
  ],
})
