<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
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
        <Dropdown class="userBox">
          <a href="javascript:void(0)">
            Artiely
            <Icon type="arrow-down-b"></Icon>
          </a>
          <Dropdown-menu slot="list">
            <Dropdown-item @click.native="modalUser=true">个人信息</Dropdown-item>
            <Dropdown-item @click.native="logout">退出登录</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
        <div class="messageBox">
          <div class="iconBox">
            <Badge count="3">
              <Icon type="ios-bell">
              </Icon>
            </Badge>
          </div>
          <div class="iconBox">
            <Icon type="ios-email"></Icon>
          </div>
  
        </div>
        <div class="searchBox">
          <Icon type="ios-search"></Icon>
          <input type="text" class="search" ref="search" v-model="value">
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
            <!-- <Breadcrumb-item href="/components/breadcrumb">
              <Icon type="social-buffer-outline"></Icon>
              Components
            </Breadcrumb-item> -->
            <Breadcrumb-item>
              <Icon type="pound"></Icon>
              {{currentPageName}}
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
        <span>操作提示!</span>
      </p>
      <div style="text-align:center">
        <p>此操作需要输入登录密码。</p>
        <Input v-model="check_password" type="password" icon="ios-locked-outline" placeholder="请输入..." style="width: 300px"></Input>
      </div>
      <div slot="footer">
        <Button type="info" size="large" long :loading="modal_loading" @click="checkUser">确定</Button>
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
  components: { THeader, NavBar, Container },
  data() {
    return {
      value: '',
      modalUser: false,
      modal_loading: false,
      check_password: '',
      menu: []
    }
  },
  created() {
    this.menu = menu;
  },
  watch: {
    'value': {
      handler(val) {
        if (val.length > 0) {
          this.$refs.search.style.width = '160px'
        } else {
          this.$refs.search.style.width = '50px'
        }
      }
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    currentPageName(){
      return this.$store.state.app.router.currentPageName;
    }
  },
  mounted() {

  },
  methods: {
    checkUser() {
      this.modal_loading = true;
      setTimeout(() => {
        this.modal_loading = false;
        this.modalUser = false
        this.$Message.success('成功');
        this.$router.push('/userInfo');
      }, 2000);
    },
    /**
     * 选择菜单
     */
    selectFn(a) {
      this.$router.push({ path: a })
    },
    /**
     *退出 
     */
    logout() {
      this.$router.push('/login');
      this.$Message.success('退出成功');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
