<template>
  <div class="filter">
    <Row>
      <i-col>
        <Card>
          <h2>最常见过滤器</h2>
          <h4>隐藏敏感信息</h4>
          <p>姓名:{{name}} => {{ name | star}}</p>
          <p>手机号：{{phone}} =>{{phone | star}}</p>
          <p>身份证：{{idCard}} =>{{idCard | star}}</p>
          <p>银行卡号：{{bankNum}} =>{{bankNum | star}}</p>
          <h4>格式化发布时间</h4>
          <p>{{itme.one}} => {{itme.one | timeAgo}}</p>
          <p>{{itme.now}} => {{itme.now | timeAgo}}</p>
          <p>{{itme.now1}} => {{itme.now1 | timeAgo}}</p>
          <p>{{itme.now3}} => {{itme.now3 | timeAgo}}</p>
          <p>{{itme.now2}} => {{itme.now2 | timeAgo}}</p>
          <h4>格式化货币</h4>
          <p>{{currency.money}} =>{{currency.money | currency}}</p>
          <p>{{currency.money}} =>{{currency.money | currency('￥')}}</p>
          <p>{{currency.money}} =>{{currency.money | currency('€', 3)}}</p>
          <h4>时间格式化</h4>
          <p>时间对象默认转换</p>
          <p>{{itme.now}} =>{{itme.now | timeFormat}}</p>
          <p>时间戳默认转换</p>
          <p>{{itme.now1}} =>{{itme.now1 | timeFormat}}</p>
          <p>时间格式改变</p>
          <p>{{itme.now2}} =>{{itme.now2 | timeFormat('YY/MM/DD HH:mm')}}</p>
          <h6 class="Button--primary Button--blue">欢迎分享</h6>
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
  export default {
    name: 'filter',
    data () {
      return {
        name: '谭杰',
        phone: 15988880460,
        idCard: 420528199012208888,
        bankNum: 591626554586339999,
        itme: {
          one: '2017-8-29 13:54',
          now: new Date(),
          now1: new Date() - 60 * 1000,
          now3: new Date() - 60 * 60 * 1000,
          now2: '2017-7-29 13:54'
        },
        currency: {
          money: 100000
        }

      }
    }
  }
</script>
<style scoped>
  .Button--primary.Button--blue {
    color: #fff;
    padding: 10px;
    background: -webkit-gradient(linear,left top,right top,from(#15b982),to(#01d18b));
    background: linear-gradient(90deg,#15b982,#01d18b);
    -webkit-box-shadow: 0 3px 6px rgba(0,0,0,.16);
    box-shadow: 0 3px 6px rgba(0,0,0,.16);
  }
</style>

