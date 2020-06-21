import http from '../utils/http'
export default {
    saveComment(params) {
        return http.post('/comment/saveComment', params)
    },
    getCommentList(params) {
        return http.post('comment/getCommentList', params)
    }
}