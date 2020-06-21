import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '../pages/index/index'
import About from '../pages/about/about'
import Detail from '../pages/detail/detail'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/about',
            name: 'About',
            component: About
        }, {
            path: '/detail',
            name: 'Detail',
            component: Detail
        }
    ]
})