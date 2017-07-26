const menu = [{
    name: '首页',
    url: '/index',
    icon: 'home',
    _id: '0'
}, {
    name: '列表页',
    icon: 'star',
    _id: '1',
    children: [{
        name: '列表',
        url: '/list',
        icon: 'heart',
        _id: '1_0',
    }, {
        name: '图表',
        url: '/chart',
        icon: 'checkmark',
        _id: '1_1'
    }, {
        name: '404',
        url: '/error404',
        icon: 'checkmark',
        _id: '1_2'
    }]
}]

export default menu