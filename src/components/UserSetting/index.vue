<template>
  <el-dialog title="账户设置" :visible.sync="visible" @close="handleCancel" width="30%">
    <el-form label-width="100px" ref="form" label-position="left" :model="form" :rules="formRule">
      <el-form-item label="姓名" prop="realName">
        <el-col :span="18">
          {{ userInfo.realName }}
        </el-col>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-col :span="18">
          <el-input v-model="form.mobile"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-col :span="18">
          <el-input type="password" v-model="form.password"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="部门" v-if="userInfo.department.id !== 1">
        <el-col :span="18">
          {{ userInfo.department.name }}
        </el-col>
      </el-form-item>
      <el-form-item label="职位" v-if="userInfo.department.id !== 1">
        <el-col :span="18">
          {{ userInfo.position }}
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api'

export default {
  name: 'EditDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    show: function (newValue) {
      this.visible = newValue
    }
  },
  data () {
    const mobileValidator = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写手机号'))
      }

      if (value !== this.userInfo.mobile) {
        api.user
          .checkUserMobile({
            mobile: value
          })
          .then(res => {
            if (res.success) {
              callback(new Error('号码已被其他部门成员使用'))
            } else {
              callback()
            }
          })
      } else {
        callback()
      }
    }
    return {
      visible: this.show,
      form: {
        id: '',
        mobile: '',
        password: ''
      },
      formRule: {
        mobile: [{ validator: mobileValidator, required: true, trigger: 'blur' }],
        password: [{ required: false, min: 6, message: '请填写密码(至少6位)', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleCancel () {
      // clearValidate is another choose
      this.$refs['form'].resetFields()
      this.visible = false
      this.$emit('update:show', false)
    },
    async loadUserInfo () {
      const res = await this.api.user.detail()
      this.form.mobile = res.mobile
    },
    async handleConfirm () {
      const valid = await this.$refs['form'].validate()
      if (valid) {
        const postForm = JSON.parse(JSON.stringify(this.form))
        // 判断表单是否修改了
        var changed = false
        if (postForm.password) {
          changed = true
          postForm.password = postForm.password.trim()
        }
        if (postForm.mobile !== this.userInfo.mobile) {
          changed = true
        }
        if (changed) {
          const res = await api.user.save(postForm)
          if (res.success) {
            this.$emit('success', res)
            this.visible = false
            this.$emit('update:show', false)
            this.$confirm('你的个人信息已修改，需要重新登录', '确定登出', {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$store.dispatch('FedLogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
              })
            })
          } else {
            this.$message.error(res.msg)
          }
        } else {
          this.$emit('success', true)
          this.visible = false
          this.$emit('update:show', false)
        }
      }
    }
  },
  created () {
    this.form.id = this.userInfo.id
    this.loadUserInfo()
  }
}
</script>
