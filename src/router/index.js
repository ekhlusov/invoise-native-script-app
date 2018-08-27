import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../components/Home';
import MagPage from '../components/MagPage';

const router = new VueRouter({
    pageRouting: true,
    routes: [
        {
            path: '/home',
            component: Home,
            meta: {
                title: 'Home',
            },
        },
        {
            path: '/mag',
            component: MagPage,
            meta: {
                title: 'MagPage',
            },
        },
        {path: '*', redirect: '/home'},
    ],
});

router.replace('/home');

module.exports = router;
