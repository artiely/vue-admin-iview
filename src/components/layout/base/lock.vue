<template>
    <div class="lock">
      <div class="wrapper clearfix">
        <Avatar
          @click.native="passwordShow=true"
          src="https://avatars1.githubusercontent.com/u/19198355?s=400&u=aa18d8f6d07dbd4f8f4dd966f3fbb2b3a1b3ee00&v=4"
          style="cursor: pointer;" size="large">Lock
        </Avatar>
        <div class="input-wrapper" v-if="passwordShow">
          <input class="input" ref="input" :autofocus="true" v-model="password" placeholder="登录密码" @keyup.enter="handleUnlock"
                 type="password">
          <span class="underline"></span>
        </div>

      </div>
      <div class="content">
        <h1 id="date" class="date"></h1>
        <h3 id="time" class="time"></h3>
      </div>
    </div>
</template>

<script>
  import Cookies from 'js-cookie'
  export default {
    name: 'Unlock',
    data () {
      return {
        avatorLeft: '0px',
        inputLeft: '400px',
        password: '',
        passwordShow: false
      }
    },
    methods: {
      handleUnlock () {
        if (Cookies.get('token') === this.password) {
          this.avatorLeft = '0px'
          this.inputLeft = '400px'
          this.password = ''
          this.$store.commit('SET_LOCK', '0')
          console.log(this.$store.state.app.lockPage)
          this.$router.push(this.$store.state.app.lockPage)
        } else {
          this.$Message.error('密码错误,请重新输入。如果忘了密码，清除浏览器缓存重新登录即可，这里没有做后端验证')
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        var d = new Date()
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        var date = document.getElementById('date')
        var time = document.getElementById('time')

        function getDate () {
          date.innerHTML = monthNames[d.getMonth()] + ' ' + d.getDate() + ',' + d.getFullYear()
        }

        function timer () {
//          setTimeout(timer, 1000)
          var d = new Date()
          var hours = d.getHours()
          var minutes = d.getMinutes()
          var ampm = hours <= 11 ? 'am' : 'pm'
          var strTime = [hours % 12, (minutes < 10 ? '0' + minutes : minutes)].join(':') + ampm
          time.innerHTML = strTime
          setTimeout(timer, 1000)
        }

        getDate()
        timer()
      })
    }
  }
</script>
<style lang="less" scoped>
  .lock{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
    height:100%;
    background: #2d2222;
    width: 100%;
  }
  .input-wrapper {
    position: relative;
  }

  .wrapper {
    box-sizing: border-box;
    position: relative;
    margin: 100px auto;
    width: 300px;
    text-align: center;
  }

  .input {
    text-align: center;
    background-color: transparent;
    border: none;
    color: #555;
    font-size: 18px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;

    &:focus {
      outline: none;
    }
  }

  input::-webkit-input-placeholder {
    color: #AAA;
  }

  input:focus::-webkit-input-placeholder {
    color: dodgerblue;
  }

  .input:focus + .underline {
    transform: scale(1);
  }

  .underline {
    background-color: dodgerblue;
    display: inline-block;
    height: 2px;
    left: 0;
    position: absolute;
    top: 40px;
    -webkit-transform: scale(0, 1);
    transform: scale(0, 1);
    -webkit-transition: all 0.5s linear;
    transition: all 0.5s linear;
    width: 300px;
  }

  .content {
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 200px;
  }

  .date, .time, .input {
    color: #bdc3c7;
    font-weight: 300;
    font-size: 14px;
    padding: 8px 20px;
  }

  .input {
    padding: 0;
  }

  .date {
    border-bottom: 2px solid #eee;
  }

  .time {
    font-size: 3em;
  }

</style>
