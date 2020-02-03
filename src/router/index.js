import Vue from 'vue';
import Router from 'vue-router';

import NewUser from '@/views/NewUser';
import NewUserIndex from '@/views/NewUser/Index';
import NewUserBindPhone from '@/views/NewUser/BindPhone';
import NewUserStudent from '@/views/NewUser/Student';
import NewUserCompany from '@/views/NewUser/Company';
import NewUserClub from '@/views/NewUser/Club';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/NewUser',
      name: 'NewUser',
      component: NewUser,
      redirect: '/NewUser/Index',
      children: [
        {
          path: '/NewUser/Index',
          name: 'NewUserIndex',
          component: NewUserIndex
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
