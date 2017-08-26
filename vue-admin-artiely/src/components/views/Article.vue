<template>
  <div class="list">
    <Row>
      <Col>
      <Card>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          干货集中营
          <Icon type="pin" @click.native="fixedHeader=!fixedHeader"></Icon>
        </p>
        <a href="#" slot="extra" @click.prevent="refresh">
          <Icon type="ios-loop-strong"></Icon>
        </a>
        <Table :show-header="showHeader" :height="fixedHeader ? 300 : ''" :size="tableSize" :data="listData"
               :columns="columns1"></Table>
        <Page :total="100" show-sizer show-elevator @on-change="pageChange" style="margin-top: 10px"
              @on-page-size-change="PageSizeChange"></Page>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    name: 'list',
    components: {},
    data () {
      return {
        showHeader: true, // 是否显示表头 @:show-header
        fixedHeader: false, // 是否固定表头 @:height
        tableSize: 'small', // @:size
        params: {
          page: 1,
          limit: 10
        },
        listData: [], // @:data
        columns1: [
          { // @:columns
            type: 'selection', // 开启checkbox
            width: 60,
            align: 'center'
          },
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
        ]
      }
    },
    watch: {
      /**
       * @params 监听参数变化重新获取数据
       * */
      params: {
        handler (val) {
          this.getData(val)
        },
        deep: true
      }
    },
    computed: {},
    methods: {
      /**
       * 刷新页面请求
       * */
      refresh () {
        this.getData(this.params)
      },
      /**
       * @params:category 分类 page：页码 limit:条数
       * */
      getData (params) {
        let _this = this
        this.$api.orderList(params).then(function (r) {
          _this.listData = r.results
        })
      },
      /**
       * @on-change 页码改变的回调，返回改变后的页码
       * */
      pageChange (page) {
        this.params.page = page
      },
      /**
       * @on-page-size-change 切换每页条数时的回调，返回切换后的每页条数
       * */
      PageSizeChange (limit) {
        this.params.limit = limit
      }
    },
    created () {
      this.getData(this.params)
    }
  }
</script>
