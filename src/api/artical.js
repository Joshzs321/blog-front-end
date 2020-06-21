import http from "../utils/http"
export default {
    getAllArticalList(params) {
        return http.post("/artical/getAllArticalList", params)
    },
    getAllArticalDetail(params) {
        return http.post("/artical/getArticalDetail", params)
    },
    getArticalDetail(params) {
        return http.post("/artical/getArticalDetail", params)
    }
}