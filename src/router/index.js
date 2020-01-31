import Vue from 'vue';
import Router from 'vue-router';

import NewUserIndex from '../views/NewUser';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/NewUserIndex',
      name: 'NewUserIndex',
      component: NewUserIndex
    }
  ]
})
