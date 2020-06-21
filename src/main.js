// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './pages/index/index'
import router from './router'
import Rem from './pages/components/commom/rem'
import autoLoad from './pages/components/commom/autoLoad'
import "./pages/components/commom/reset.css"
import "./pages/components/commom/global.css"
Vue.config.productionTip = false
Rem()
autoLoad.startLoad()
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    // components: { App },
    // template: '<App/>'
})