// 用于自适应屏幕尺寸的
function Rem() {
    var docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize', //移动端的两个方法，为了获取移动端屏幕是否翻转（手机重力感应等引起屏幕长宽变化之类的）
        recalc = function() {
            var clientWidth = docEl.clientWidth
            if (!clientWidth) return
            docEl.style.fontSize = 100 * (clientWidth / 320) + 'px'
        }
    console.log(window)
    if (!document.addEventListener) return
    window.addEventListener(resizeEvt, recalc, false)
    document.addEventListener('DOMContentLoaded', recalc, false)
}

export default Rem