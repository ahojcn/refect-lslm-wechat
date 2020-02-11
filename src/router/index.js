import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/views/Index';

import NewUser from '@/views/NewUser';
import NewUserIndex from '@/views/NewUser/Index';
import NewUserBindPhone from '@/views/NewUser/BindPhone';
import NewUserStudent from '@/views/NewUser/Student';
import NewUserCompany from '@/views/NewUser/Company';
import NewUserClub from '@/views/NewUser/Club';
import NewUserResume from '@/views/NewUser/Resume';

import PartTimeJob from '@/views/PartTimeJob';

import Home from '@/views/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/PartTimeJob',
      children: [
        {path: '/PartTimeJob', name: 'PartTimeJob', component: PartTimeJob,},
        {path: '/Home', name: 'Home', component: Home,},
      ]
    },
    {
      path: '/NewUser', name: 'NewUser', component: NewUser, redirect: '/NewUser/Index',
      children: [
        {
          path: '/NewUser/Index',
          name: 'NewUserIndex',
          component: NewUserIndex
        },
        {
          path: '/NewUser/Resume',
          name: 'NewUserResume',
          component: NewUserResume
        },
        {
          path: '/NewUser/Student',
          name: 'NewUserStudent',
          component: NewUserStudent
        },
        {
          path: '/NewUser/Company',
          name: 'NewUserCompany',
          component: NewUserCompany
        },
        {
          path: '/NewUser/Club',
          name: 'NewUserClub',
          component: NewUserClub
        },
        {
          path: '/NewUser/BindPhone',
          name: 'NewUserBindPhone',
          component: NewUserBindPhone
        },
      ]
    }
  ]
})
