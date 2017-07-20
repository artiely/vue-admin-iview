<template>
  <div class="index">
  
    <Row  :gutter="16">
      <Col span="8">
      <Row>
        <Col span="12" v-for="item in cardMessage" class="cardMessage">
        <Card>
          <Row>
            <Col span="8">
            <Icon :type="item.icon"></Icon>
            </Col>
            <Col span="16">
            <p class="subText">{{item.name}}</p>
            <h3>{{item.count}}</h3>
            </Col>
          </Row>
        </Card>
        </Col>
        
      </Row>

     </Col>
      <Col span="16">
      <Card>

      </Card>
      </Col>
    </Row>
  
  </div>
</template>
<script>
  import Box from '@/components/layout/base/Box.vue'
  import * as orderList from '@/api'
  export default {
    name: 'index',
    components: {Box},
    data () {
      return {
       
        params: {
          page: 1,
          limit: 10
        },
        cardMessage:[
          {
            icon:'ios-heart',
            name:'收藏',
            count:'344'
          },
           {
            icon:'ios-cart',
            name:'订单量',
            count:'2111'
          },
           {
            icon:'ios-email',
            name:'未读邮件',
            count:'23'
          },
           {
            icon:'filing',
            name:'归档',
            count:'12'
          }
        ],
        columns1: [
          {
            title: '创建日期',
            key: 'createdAt'
          },
          {
            title: '详情',
            key: 'desc'
          },
          {
            title: '发布日期',
            key: 'publishedAt'
          },
          {
            title: '作者',
            key: 'who'
          },
          {
            title: '平台',
            key: 'type'
          }
        ],

      }
    },
    computed: {},
    methods: {
      /**
       * 刷新页面请求
       * */
      refresh(){
        this.getData(this.params)
      },
      getData(params){
        let _this = this
        console.log(this.$api)
        this.$api.orderList(params).then(function (r) {
            console.log(r)
          _this.listData = r.results
        })
      }
    },
    created(){
      this.getData(this.params)
    }
  }
</script>
<style lang="less">
.cardMessage{
  .ivu-icon{
    font-size: 38px
  }
  .subText{
    color: #9ea7b4	
  }
}
</style>

