/**
 *
 * @authors guo
 * @date    2017-03-17 15:15:35
 * @description 路由配置
 */

'use strict'

export default function (router) {
    router.map({
        '/': {
            component: function (resolve) {
                require(['./App.vue'], resolve)
            }
        }
    })
}
