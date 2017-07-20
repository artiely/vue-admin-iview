const menu=[{
  name:'首页',
  url:'/index',
  icon:'home',
  _id:'0'
},{
  name:'列表页',
  icon:'star',
  _id:'1',
  children:[{
    name:'列表1',
    url:'/list/1',
    icon:'heart',
    _id:'1_0',
  },{
    name:'列表2',
    url:'/list/2',
    icon:'checkmark',
    _id:'1_1'
  }]
}]

export default menu
