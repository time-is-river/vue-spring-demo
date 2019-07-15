<template>
  <el-dialog
    title="新增"
    :visible.sync="visible"
    @close="handleCancel"
    width="40%">
    <el-form label-width="100px" ref="commodityForm" label-position="left" :model="commodityForm" :rules="formRule">
      <el-form-item label="商品条码" prop="barcode">
        <el-col :span="18">
          <el-input v-model="commodityForm.barcode" ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-col :span="18">
          <el-input v-model="commodityForm.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="进货价格" prop="price">
        <el-col :span="18">
          <el-input v-model="commodityForm.price"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="零售价格" prop="salePrice">
        <el-col :span="18">
          <el-input v-model="commodityForm.salePrice"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品规格" prop="spec">
        <el-col :span="18">
          <el-input v-model="commodityForm.spec"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-col :span="18">
          <el-input v-model="commodityForm.remark"></el-input>
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
    import commodity from '@/api/commodity'

    export default {
      name: 'editDialog',
      props: {
        show: {
          type: Boolean,
          default: false
        }
      },
      watch: {
        show: function (newValue) {
          this.visible = newValue
        }
      },
      data () {
        return {
          visible: this.show,
          commodityForm: {
            barcode: '',
            name: '',
            price: '',
            salePrice: '',
            spec: '',
            remark: ''
          },
          editStatus: false,
          editData: [],
          formRule: {
            barcode: [{ required: true, message: '请填写商品条码', trigger: 'blur' }],
            name: [{ required: true, message: '请填写商品名称', trigger: 'blur' }],
            price: [{ required: true, message: '请填写商品进货价格', trigger: 'blur' }],
            salePrice: [{ required: true, message: '请填写商品零售价格', trigger: 'blur' }],
            spec: [{ required: true, message: '请填写商品规格', trigger: 'blur' }]
          }
        }
      },
      methods: {
        handleCancel () {
          // clearValidate is another choose
          this.$refs['commodityForm'].resetFields()
          Object.assign(this.commodityForm, this.$options.data().commodityForm)
          this.visible = false
          this.editStatus = false
          this.$emit('update:show', false)
        },
        handleEdit (value) {
          this.editData = value
          this.commodityForm = JSON.parse(JSON.stringify(value))
          this.editStatus = true
        },
        handleConfirm () {
          try {
            let valid = this.$refs['commodityForm'].validate()
            if (valid) {
              const postForm = JSON.parse(JSON.stringify(this.commodityForm))
              delete postForm.createDate
              if (!this.editStatus) {
                delete postForm.id
              }
              commodity.save(postForm).then(response => {
                if (response.success) {
                  this.$emit('success', response)
                  this.visible = false
                  this.$emit('update:show', false)
                } else {
                  this.$message.error(response.msg)
                }
              })
            } else {
              console.log('error submit!!')
              return false
            }
          } catch (error) {
            console.log(error)
          }
        }
      }
    }
</script>

<style scoped>

</style>
