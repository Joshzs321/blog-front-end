import http from '../utils/http'
export default {
    addThumbs(params) {
        //返回一个promise
        return http.post('/thumbsUp/addThumbs', params)
    }
}