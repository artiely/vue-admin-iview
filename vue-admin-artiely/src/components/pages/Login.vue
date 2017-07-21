<template>
  <div class="login">
    <div class="bg">
    </div>
    <Modal v-model="loginModal" width="360" style="background:rgba(255,255,255,.5)" :mask-closable="false">
      <div style="text-align:center">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" >
          <Form-item  prop="name">
            <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
          </Form-item>
          <Form-item  prop="password">
            <Input v-model="formValidate.password" placeholder="请输入密码"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="modal_loading" @click="handleSubmit('formValidate')">登录</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      loginModal: true,
      modal_loading: false,
      formValidate: {
        name: '',
        password: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码错误', trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    handleSubmit(name) { //login
      this.$refs[name].validate((valid) => {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        }, 2000);
      })
    },
  }
}
</script>


