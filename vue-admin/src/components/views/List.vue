<template>
  <div class="list">
    <!-- 搜索 v-show="state.searchState.show"-->
    <Row class="search-filter" :class="{'active':searchState}">
      <Col>
      <Card>
        <Form :label-width="80" inline>
          <Form-item label="输入框">
            <Input v-model="formItem.input" placeholder="请输入" style="width:187px"></Input>
          </Form-item>
          <Form-item label="选择平台">
            <Select v-model="params.category" placeholder="请选择" style="width:187px">
              <Option value="Android">Android</Option>
              <Option value="iOS">iOS</Option>
              <Option value="休息视频">休息视频</Option>
              <Option value="福利">福利</Option>
              <Option value="拓展资源">拓展资源</Option>
              <Option value="前端">前端</Option>
              <Option value="App">App</Option>
            </Select>
          </Form-item>
          <div class="clearfix" style="border-top:1px solid #eee;margin-top:-15px;padding-top:10px">
          <span class="pull-right">
              <Button type="primary" icon="ios-search" shape="circle">查询</Button>
              <Button type="primary" icon="ios-close-empty" shape="circle">清楚条件</Button>
              <Button type="primary" icon="ios-download-outline" shape="circle" @click="exportData(1)">导出原始数据</Button>
              <Button type="primary" icon="ios-download-outline" shape="circle"
                      @click="exportData(2)">导出排序和过滤后数据</Button>
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
          <Button type="dashed" @click.native="fixedHeader=!fixedHeader">
            <Icon type="pin"></Icon>
          </Button>
          <Button type="success" @click.native="edit(-1)">
            <Icon type="trash-a"></Icon>
            新增
          </Button>
          <Button type="primary" @click="searchShow" shape="circle" ><Icon type="funnel"></Icon> 筛选</Button>
          <Button type="error" v-if="selection.length>0" @click="deleteTip=true">
            <Icon type="trash-a"></Icon>
            批量删除
          </Button>
        </div>

        <a href="#" slot="extra" @click.prevent="refresh">
          <Icon type="ios-loop-strong"></Icon>
        </a>
        <Table :loading="loading2" :show-header="showHeader" :height="fixedHeader ? 300 : ''" :size="tableSize"
               :data="listData"
               :columns="columns1" ref="table" @on-select="onSelect" @on-selection-change="onSelectionChange"></Table>
        <Page :total="100" show-sizer show-elevator @on-change="pageChange" style="margin-top: 10px"
              @on-page-size-change="PageSizeChange"></Page>
      </Card>
      </Col>
    </Row>
    <!--删除提示  -->
    <Modal v-model="deleteTip" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>此操作讲删除{{selection.length}}条数据,并不可恢复。</p>
        <p>是否继续删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="deleteBatch">删除</Button>
      </div>
    </Modal>
    <!--删除提示 / -->
    <!-- 编辑 -->
    <Modal v-model="editModal" v-if='DateReady'>
      <p slot="header" style="text-align:center">
        <Icon type="information-circled"></Icon>
        <span v-if="currIndex==-1">新增</span>
        <span v-if="currIndex!=-1">编辑</span>
      </p>
      <div style="text-align:center">
        <Form :model="formItem" :label-width="80">
          <Form-item label="作者">
            <Input v-model="currDate.who" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="创建日期">
            <Date-picker type="date" placeholder="选择日期" style="width:100%" v-model="currDate.createdAt"
                         :editable='false'></Date-picker>
          </Form-item>
          <Form-item label="发布日期">
            <Date-picker type="date" placeholder="选择日期" style="width:100%" v-model="currDate.publishedAt"
                         :editable='false'></Date-picker>
          </Form-item>
          <Form-item label="选择平台">
            <Select v-model="currDate.type" placeholder="请选择">
              <Option value="Android">Android</Option>
              <Option value="iOS">iOS</Option>
              <Option value="休息视频">休息视频</Option>
              <Option value="福利">福利</Option>
              <Option value="拓展资源">拓展资源</Option>
              <Option value="前端">前端</Option>
              <Option value="App">App</Option>
            </Select>
          </Form-item>

          <Form-item label="描述">
            <Input v-model="currDate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入..."></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" long @click.native="saveBatch" :loading="loading" :disabled="saveDisabled">
          保存
        </Button>
      </div>
    </Modal>
    <!-- 编辑/ -->
  </div>
</template>
<script>
  import elementResizeDetectorMaker from 'element-resize-detector'
  var erd = elementResizeDetectorMaker()
  export default {
    name: 'list',
    components: {},
    data () {
      return {
        formItem: {
          input: '',
          select: '',
          date: '',
          time: '',
          radio: '',
          checkbox: []
        },
        searchState: false,
        editModal: false,
        detailModal: false,
        deleteTip: false,
        showHeader: true, // 是否显示表头 @:show-header
        loading2: false, // 分页loading
        fixedHeader: false, // 是否固定表头 @:height
        tableSize: 'small', // @:size
        DateReady: false, // 判断异步数据加载完成，避免报错
        loading: false, // save
        currDate: {}, // 当前编辑和新增的行数据
        currIndex: 0, // 当前编辑和新增的行号
        saveDisabled: false,
        params: {
          page: 1,
          limit: 10,
          category: 'Android'
        },
        selection: [], // 表格选中项
        listData: [], // @:data
        columns1: [
          { // @:columns
            type: 'selection', // 开启checkbox
            width: 60,
            align: 'center'
          },
          {
            title: '创建日期',
            key: 'createdAt',
            sortable: true
          },
          {
            title: '详情',
            key: 'desc',
            className: 'min-width'
          },
          {
            title: '发布日期',
            key: 'publishedAt',
            sortable: true
          },
          {
            title: '作者',
            key: 'who'
          },
          {
            title: '平台',
            key: 'type'
          }, {
            title: '操作',
            key: 'action',
            width: 170,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#5cadff'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    color: '#5cadff'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#ff3300'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ])
            }
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
      },
      fixedHeader: {
        handler (val) {
          if (val) {
            this.$Message.info('表头已固定')
          }
        }
      },
      currDate: {
        handler (val) {
          for (let i = 0; i < Object.values(val).length; i++) {
            if (Object.values(val)[i] === '') {
              this.saveDisabled = true
              return
            } else {
              this.saveDisabled = false
            }
          }
        },
        deep: true
      }
    },
    computed: {
      state () {
        return this.$store.state.app
      }
    },
    methods: {
      searchShow () {
        this.searchState = !this.searchState
      },
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
        this.loading2 = true
        this.$api.orderList(params).then((res) => {
          if (!res.error) {
            this.listData = res.results
            this.DateReady = true
            this.loading2 = false
          } else {
            this.$Message.error(res.msg)
            this.loading2 = false
          }
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
      },
      /**
       * 表格对应操作方法
       * @show 查看
       * @remove 删除
       * @edit
       */
      show (index) {
        this.currIndex = index
        this.currDate = this.listData[index]
        this.detailModal = true
        this.$Modal.info({
          title: '详情',
          content: `姓名：${this.listData[index].who}<br>平台：${this.listData[index].type}<br>描述：${this.listData[index].desc}`
        })
      },
      remove (index) {
        this.listData.splice(index, 1)
      },
      edit (index) {
        this.editModal = true
        this.currIndex = index
        if (index === -1) { // 新增
          this.currDate = {
            createdAt: '',
            desc: '',
            publishedAt: '',
            type: '',
            used: true,
            who: '',
            url: 'c.fwone.com'
          }
        } else { // 编辑
          this.currDate = this.listData[index]
        }
      },
      /**
       * 批量删除
       */
      deleteBatch () {
        this.deleteTip = false
        // ...
      },
      saveBatch () {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.$Message.info('保存成功')
          this.editModal = false
        }, 3000)
      },
      /**
       * 数据导出
       * @ type 1 原始数据 2过滤数据
       */
      exportData (type) {
        if (type === 1) {
          this.$refs.table.exportCsv({
            filename: '原始数据'
          })
        } else if (type === 2) {
          this.$refs.table.exportCsv({
            filename: '排序和过滤后的数据',
            original: false
          })
        }
      },
      /**
       * 多选
       * selection：已选项数据 row：刚选择的项数据
       */
      onSelect (selection, row) {
        // console.log(selection,row)
      },
      onSelectionChange (selection) {
        this.selection = selection
      }
    },
    created () {
      this.getData(this.params)
    },
    mounted () {
      erd.listenTo(window, 'resize', this.handleResize)
    }
  }
</script>
<style lang="less" scoped>
  .search-filter {
    opacity: 0;
    display: none;
    overflow: hidden;
    transition: all 0.28s ease-out;
    &.active {
      opacity: 1;
      display: block;
    }
  }
</style>

