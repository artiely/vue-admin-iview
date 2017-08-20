<template>
  <div class="app-wrapper" :class="{hideSidebar:!state.sidebar.opened}">
    <!-- 左侧 -->
    <div class="side-wrapper">
      <!-- logo -->
      <div style="height:50px;" class="logo-box"></div>
      <!-- logo /-->
      <!-- 左侧导航 -->
      <nav-bar>
        <Menu width="220" theme="dark" :accordion="true" @on-select="selectFn">
          <div v-for="(item,index) in menu " :key="item._id">
            <Submenu :name="index" v-if="item.children">
              <template slot="title">
                <Icon :type="item.icon?item.icon:'checkmark'"></Icon>
                {{item.name}}
              </template>
              <Menu-item :name="sub.url" v-for="sub in item.children" :key="sub._id">
                <Icon :type="sub.icon?sub.icon:'checkmark'"></Icon>
                {{sub.name}}
              </Menu-item>
            </Submenu>
            <Menu-item :name="item.url" v-else>
              <Icon :type="item.icon?item.icon:'checkmark'"></Icon>
              {{item.name}}
            </Menu-item>
          </div>
        </Menu>

      </nav-bar>
      <!-- 左侧导航 /-->
    </div>
    <!-- 左侧 /-->
    <!-- 主体 -->
    <div class="main-wrapper">
      <!-- 头部 -->
      <t-header>
        <!-- 用户信息 -->
        <Dropdown class="userBox" slot='right'>
          <a href="javascript:void(0)">
            Artiely
            <Icon type="arrow-down-b"></Icon>
          </a>
          <Dropdown-menu slot="list">
            <Dropdown-item @click.native="modalUser=true">个人信息</Dropdown-item>
            <Dropdown-item @click.native="logout">退出登录</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
        <!-- 用户信息 /-->
        <div class="messageBox" slot='msg-icon'>
          <Row>
            <Col :xs='{span:0}' :sm='{span:24}'>
            <div class="iconBox" @click="searchFilter" :class="{'active':state.searchState.show}">
              <Icon type="ios-search"></Icon>
            </div>
            <div class="iconBox">
              <Badge count="3">
                <Icon type="ios-bell">
                </Icon>
              </Badge>
            </div>
            <div class="iconBox">
              <svg class="icon" aria-hidden="true" @click="changeLang">
                <use :xlink:href="state.lang.icon"></use>
              </svg>
            </div>
            </Col>
          </Row>
        </div>
      </t-header>
      <!-- 头部 /-->
      <!-- 内容部分 -->
      <div class="main-container">
        <container>
          <!-- 面包屑 -->
          <Breadcrumb>
            <Breadcrumb-item href="/">
              <Icon type="ios-home-outline"></Icon>
              Home
            </Breadcrumb-item>
            <Breadcrumb-item>
              <Icon type="pound"></Icon>
              {{state.router.currentPageName}}
            </Breadcrumb-item>
          </Breadcrumb>
          <!-- 面包屑 /-->
          <!-- 路由 -->
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
          <!-- 路由/ -->
        </container>
      </div>
      <!-- 内容部分 /-->
    </div>
    <!-- 主体 /-->
    <Modal v-model="modalUser" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>此操作需要输入登录密码!</span>
      </p>
      <div style="text-align:center">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <Form-item prop="check_password">
            <Input v-model="formValidate.check_password" type="password" icon="ios-locked-outline" placeholder="请输入..."
                   style="width: 300px"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="info" size="large" long :loading="modal_loading" @click="checkUser('formValidate')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import THeader from '@/components/layout/header/THeader'
  import NavBar from '@/components/layout/navbar/NavBar'
  import Container from '@/components/layout/container/Container'
  import menu from '@/api/menu'

  export default {
    name: 'full',
    components: {
      THeader,
      NavBar,
      Container
    },
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value !== '123456') {
          callback(new Error('密码错误'))
        } else {
          callback()
        }
      }
      return {
        modalUser: false,
        modal_loading: false,
        formValidate: {
          check_password: ''
        },
        menu: menu, // 导航菜单
        ruleValidate: {
          check_password: [
            {
              validator: validatePass,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    created () {},
    watch: {},
    computed: {
      state () {
        return this.$store.state.app
      }
    },
    mounted () {

    },
    methods: {
      // 查看个人信息密码验证
      checkUser (name) {
        this.modal_loading = true
        this.$refs[name].validate((valid) => {
          setTimeout(() => {
            if (valid) {
              this.$Message.success('验证成功')
              this.$router.push('/userInfo')
              this.modalUser = false
            } else {
              this.$Notice.warning({
                title: '提示',
                desc: '密码 : 123456'
              })
              this.$Message.error('表单验证失败!')
            }
            this.modal_loading = false
          }, 2000)
        })
      },
      /* 改变语言 */
      changeLang () {
        if (this.state.lang.icon === '#icon-yingguo') {
          this.$store.dispatch('setLang', {
            icon: '#icon-zhongguo',
            type: 'CN'
          })
        } else {
          this.$store.dispatch('setLang', {
            icon: '#icon-yingguo',
            type: 'EN'
          })
        }
        window.location.reload()
      },
      /**
       * 选择菜单
       */
      selectFn (a) {
        this.$router.push({
          path: a
        })
      },
      /**
       *退出
       */
      logout () {
        this.$router.push('/login')
        this.$Message.success('退出成功')
      },
      /**
       * 搜索过滤
       */
      searchFilter () {
        this.$store.dispatch('searchFilter', {
          params: this.$route
        })
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
