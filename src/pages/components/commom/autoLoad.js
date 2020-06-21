import Vue from 'vue'
export default {
    startLoad() {
        let requireContext = require.context('../global', true, /\w.(vue|js)/) //获取文件对象,文件名和文件配置的键值对
        requireContext.keys().forEach(fileName => {
            const compomemtConfig = requireContext(fileName)
            console.log(compomemtConfig)
            console.log(compomemtConfig.default)
            const componentName = fileName.split('/').pop().replace(/\.\w+$/, '')
            Vue.component(
                //注册为全局组件
                componentName,
                compomemtConfig.default || compomemtConfig
            )
        })
    }
}