import { createMemoryHistory, createRouter } from 'vue-router';
import Welcome from '@/components/Welcome.vue';
import MainPage from '../components/MainPage.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '@/components/RegisterPage.vue';
import CRDT_Method from '@/components/CRDT_Method.vue';
import LockingMethod from '@/components/LockingMethod.vue';
import NoMethod from '@/components/NoMethod.vue';


const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/CRDT',
    name: 'CRDT',
    component: CRDT_Method
  },
  {
    path: '/Locking',
    name: 'LockingMethod',
    component: LockingMethod
  },
  {
    path: '/NoMethod',
    name: 'NoMethod',
    component: NoMethod
  }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
