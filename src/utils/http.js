//axios封装
import axios from "axios"
import cookies from 'vue-cookies'
import qs from "qs"
export default {
    init() {
        window.$http = axios.create({
            //客户端发送的所有请求都会加到这里面
            baseURL: 'http://localhost:8888',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
            }
        });
        this.setInterceptor()
    },
    //请求拦截器
    setInterceptor() {
        $http.interceptors.request.use(
            config => {
                //config是一个对象，包含了前端发送请求的各种信息
                //在请求发送前拦截后可进行一定处理后再发送到后台，例如data，header


                // config.params = { 'token': cookies.get("token") }
                //返回到axios内部
                return config
            },
            err => {
                console.log(err)
                return Promise.reject(err)
            })

        $http.interceptors.response.use(
            response => {
                if (response.data.code) {
                    //一个道理，对后台返回的数据进行处理后再返回给前端
                    //例如后台判断token失效（状态码401），这里直接让前端跳转到登录界面
                    //如果没有这个的话，将需要在所有的发送请求的接口里进行判断，代码复杂度增加
                }
                return response
            },
            err => {
                console.log(err)
                return Promise.reject(err)
            }
        )
    },
    get(url, params) {
        if (!window.$http) {
            this.init()
        }
        console.log("33")
        return new Promise((resolve, reject) => {
            $http.get(url, {
                params: params
            }).then(res => { resolve(res.data) }).catch(err => { reject(err.data) })
        })
    },

    post(url, params) {
        if (!window.$http) {
            this.init()
        }
        console.log("33")
        return new Promise((resolve, reject) => {
            $http.post(url, qs.stringify(params)).then(res => {
                resolve(res.data)
            }).catch(err => {
                console.log(err)
                reject(err.data)
            })
        })
    }

}