<template>
  <div id="app" class="type" :style="{background:'url('+bgUrl+')'}">
    <Row class="bg" :style="{background:'url('+bgUrl+')'}">
      <Col :xs="16" offset="4">
      <Card style="margin: 100px auto;max-width: 600px;padding-top: 20px;text-align: left">
        <div v-if="token">
          <Steps :current="2" size="small" style="padding-left: 70px;padding-bottom: 10px;text-align: left">
            <Step title="基本信息"></Step>
            <Step title="邮箱激活"></Step>
            <Step title="信息登记"></Step>
          </Steps>
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="110">
            <Form-item label="类型" prop="typeId">
              <Radio-group v-model="formCustom.typeId">
                <Radio label="2">企业</Radio>
                <Radio label="1" disabled>个人</Radio>
              </Radio-group>
            </Form-item>
            <small class="help">需与当地政府颁发的商业许可证或企业注册证上的企业名称完全一致，信息审核成功后，企业名称不可修改</small>
            <Form-item label="企业名称" prop="company">
              <Input v-model="formCustom.company" placeholder="请输入"></Input>
            </Form-item>
            <small class="help">标示即为公司英文简称</small>
            <Form-item label="标示" prop="mark">
              <Input v-model="formCustom.mark" placeholder="请输入"></Input>
            </Form-item>
            <small class="help">请输入15位营业执照号或18位的统一社会信用代码</small>
            <Form-item label="营业执照注册号" prop="companyId">
              <Input v-model="formCustom.companyId" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="管理员姓名" prop="userName">
              <Input v-model="formCustom.userName" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="管理员身份证号" prop="idCard">
              <Input v-model="formCustom.idCard" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="管理员手机号" prop="phone">
              <Input v-model="formCustom.phone" placeholder="请输入"></Input>
            </Form-item>
            <Form-item>
              <Button type="primary" @click="handleSubmit('formCustom')" long :loading="loading">提交
              </Button>
            </Form-item>
          </Form>
        </div>
        <div v-if="!token">
          <Steps :current="1" status="error" size="small" style="padding-left: 70px;padding-bottom: 10px">
            <Step title="基本信息"></Step>
            <Step title="邮箱激活"></Step>
            <Step title="信息登记"></Step>
          </Steps>
          <h3 style="color:#ed3f14;text-align: center"><p>链接过期或失效<a href="register.html"> 重新发送邮件</a></p></h3>

        </div>
        <small style="display: block;text-align: center;line-height: 30px;"><img :src="require('@/assets/img/logo.png')" height="30" alt="" style="vertical-align: top"><span>Copyright by Artiely ,All rights reserved</span>
        </small>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import { GetQueryString } from '@/common/utils'
  import bgUrl from '@/assets/img/bg_login.jpg'
  export default {
    name: 'type',
    data () {
      const validateCompanyId = (rule, value, callback) => {
        if (value.toString().length !== 15 && value.toString().length !== 18) {
          callback(new Error('请输入正确的营业执照注册号'))
        } else {
          callback()
        }
      }
      return {
        token: true,
        loading: false,
        bgUrl: bgUrl,
        formCustom: {
          typeId: 2,
          company: '',
          mark: '',
          companyId: '',
          userName: '',
          idCard: '',
          sex: '1',
          phone: ''
        },
        ruleCustom: {
          company: [
            {required: true, message: '企业名称不能为空', trigger: 'blur'}
          ],
          mark: [
            {required: true, message: '标示不能为空', trigger: 'blur'},
            {message: '标示只支持字母', trigger: 'blur', pattern: /^[A-Za-z]$/}
          ],
          companyId: [
            {required: true, message: '营业执照注册号不能为空', trigger: 'blur'},
            {validator: validateCompanyId, trigger: 'blur'}
          ],
          userName: [
            {required: true, message: '管理员名称不能为空', trigger: 'blur'}
          ],
          idCard: [
            {required: true, message: '身份证号不能为空', trigger: 'blur'},
            {
              message: '身份证号格式不正确',
              trigger: 'blur',
              pattern: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/
            }
          ],
          phone: [
            {required: true, message: '手机号不能为空', trigger: 'blur'},
            {message: '手机号格式不正确', len: 11, trigger: 'blur', pattern: /^[1][3,4,5,7,8][0-9]{9}$/}
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.loading = true
        this.$refs[name].validate((valid) => {
          if (valid) {
            let data = {
              account_type: this.formCustom.typeId,
              company_name: this.formCustom.company,
              business_license_number: this.formCustom.companyId,
              personName: this.formCustom.userName,
              personSex: this.formCustom.idCard.substring(16, 1) % 2 ? '1' : '0',
              idCard: this.formCustom.idCard,
              telephone: this.formCustom.phone,
              promotionTableName: GetQueryString('promotionTableName') || '',
              promotionTableId: GetQueryString('promotionTableId') || '',
              email: GetQueryString('e') || ''
            }
            this.$api.postUserInfo(data).then(res => {
              this.loading = false
              if (res.code === 0) {
                this.$Message.success('提交成功!')
                let url = window.location.href
                if (window.location.search === '') {
                  url = window.location.href
                } else {
                  url = url.split(window.location.search)[0]
                }
                url = url.replace('type.html', 'login.html')
                window.location.href = url
              } else {
                alert(JSON.stringify(res))
              }
            }).catch(err => {
              this.loading = false
              console.error('哎哟~！', err)
            })
          } else {
            this.loading = false
            this.$Message.error('表单验证失败!')
          }
        })
      },
      checkToken () {
        let data = {
          token: GetQueryString('token') || '',
          e: GetQueryString('e') || '',
          p: GetQueryString('p') || ''
        }
        this.$api.checkToken(data).then(res => {
          if (res.code === 0) {
            if (res.state === '1') {
              this.token = true
            } else {
              this.token = false
            }
          }
        })
      },
      save () {

      }
    },
    created () {
      this.checkToken()
    }
  }
</script>

<style lang="less" scoped>
  html, body {
    position: absolute;
    height: 100%;
    width: 100%;
  }
.bg{

}
  #app {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }

  .help {
    display: block;
    text-align: left;
    font-size: 12px;
    color: #9ea7b4;
  }
</style>
