<template>
  <div class="list">
    <!-- 搜索 v-show="state.searchState.show"-->
    <Row  class="search-filter" :class="{'active':state.searchState.show}">
      <Col>
      <Card>
        <Form :label-width="80" inline>
          <Form-item label="输入框">
            <Input v-model="formItem.input" placeholder="请输入" style="width:187px"></Input>
          </Form-item>
          <Form-item label="选择器">
            <Select v-model="formItem.select" placeholder="请选择" style="width:187px">
              <Option value="beijing">北京市</Option>
              <Option value="shanghai">上海市</Option>
              <Option value="shenzhen">深圳市</Option>
            </Select>
          </Form-item>
          <Form-item label="日期控件">
            <Row>
              <Col span="11">
              <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"></Date-picker>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
              <Time-picker type="time" placeholder="选择时间" v-model="formItem.time"></Time-picker>
              </Col>
            </Row>
          </Form-item>
          <Form-item label="单选框">
            <Radio-group v-model="formItem.radio">
              <Radio label="male">男</Radio>
              <Radio label="female">女</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="多选框">
            <Checkbox-group v-model="formItem.checkbox">
              <Checkbox label="吃饭"></Checkbox>
              <Checkbox label="睡觉"></Checkbox>
              <Checkbox label="跑步"></Checkbox>
              <Checkbox label="看电影"></Checkbox>
            </Checkbox-group>
          </Form-item>
          <Form-item label="开关">
            <i-switch v-model="formItem.switch" size="large">
              <span slot="open">开启</span>
              <span slot="close">关闭</span>
            </i-switch>
          </Form-item>
          <div class="clearfix" style="border-top:1px solid #eee;margin-top:-15px;padding-top:10px">
            <span class="pull-right">
 <Button type="primary" icon="ios-search" shape="circle">查询</Button>
            <Button type="primary" icon="ios-close-empty" shape="circle">清楚条件</Button>
            <Button type="primary" icon="ios-download-outline" shape="circle">导出结果</Button>
            </span>
           
          </div>
        </Form>
      </Card>
      </Col>
    </Row>
    <!-- 搜索 /-->
    <Row>
      <Col>
      <Card>
        <div slot="title">
          <Icon type="ios-film-outline"></Icon>
          干货集中营
           <Button type="dashed">
            <Icon type="pin" @click.native="fixedHeader=!fixedHeader"></Icon>
          </Button>
        </div>
       
        <a href="#" slot="extra" @click.prevent="refresh">
          <Icon type="ios-loop-strong"></Icon>
        </a>
        <Table :show-header="showHeader" :height="fixedHeader ? 300 : ''" :size="tableSize" :data="listData" :columns="columns1"></Table>
        <Page :total="100" show-sizer show-elevator @on-change="pageChange" style="margin-top: 10px" @on-page-size-change="PageSizeChange"></Page>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import * as orderList from '@/api'
import { mapState } from 'vuex'
export default {
  name: 'list',
  components: {},
  computed: {
    state() {
      return this.$store.state.app
    }
  },
  data() {
    return {
      formItem: {
        input: '',
        select: '',
        date: '',
        time: '',
        radio: '',
        checkbox: [],
        switch: ''
      },
      showHeader: true,//是否显示表头 @:show-header
      fixedHeader: false,//是否固定表头 @:height
      tableSize: 'small', //@:size
      params: {
        page: 1,
        limit: 10
      },
      listData: [],//@:data
      columns1: [{ //@:columns
        type: 'selection', //开启checkbox
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
      ],

    }
  },
  watch: {
    /**
     * @params 监听参数变化重新获取数据
     * */
    params: {
      handler(val) {
        this.getData(val)
      },
      deep: true
    }
  },
  methods: {
    /**
     * 刷新页面请求
     * */
    refresh() {
      this.getData(this.params)
    },
    /**
     * @params:category 分类 page：页码 limit:条数
     * */
    getData(params) {
      let _this = this
      console.log(this.$api)
      this.$api.orderList(params).then(function (r) {
        _this.listData = r.results
      })
    },
    /**
     * @on-change 页码改变的回调，返回改变后的页码
     * */
    pageChange(page) {
      this.params.page = page
    },
    /**
     * @on-page-size-change 切换每页条数时的回调，返回切换后的每页条数
     * */
    PageSizeChange(limit) {
      console.log(limit)
      this.params.limit = limit
    }
  },
  created() {
    this.getData(this.params)
  }
}
</script>
<style lang="less" scoped>
.search-filter{
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all .28s ease-out;
  &.active{
    height: 200px;
    opacity: 1
  }
}
</style>

