<template>
  <Card>
    <Table :columns="tableTitle" :data="userList"></Table>
  </Card>
</template>
<script>
  export default {
    data () {
      return {
        tableTitle: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '姓名',
            key: 'personName'
          },
          {
            title: '性别',
            key: 'personSex'
          },
          {
            title: '邮箱',
            key: 'email'
          },
          {
            title: '手机',
            key: 'telephone'
          }
        ],
        userList: []
      }
    },
    methods: {
      getDate () {

      }
    },
    created () {
      this.getDate()
    }
  }
</script>
