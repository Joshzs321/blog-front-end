//设置触底加载
export default {
    isScrollBottom() {
        var htmlEl = document.documentElement
        var bodyEL = document.body
        let scrollTop = Math.ceil(htmlEl.scrollTop || bodyEL.scrollTop)
        let scrollHeight = htmlEl.scrollHeight || bodyEL.scrollHeight
        let clientHeight = htmlEl.clientHeight || bodyEL.clientHeight
        if (clientHeight + scrollTop == scrollHeight)
            return true
        else
            return false
    }
}