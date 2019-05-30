<template>
  <div id="page3" class="app-container">
    <el-card class="card-container" :body-style="{ padding: '30px 30px 15px 30px' }">
      <el-form :inline="true" :model="searchForm" ref="searchForm" class="search-form">
        <el-form-item prop="goodsName" class="input">
          <el-input v-model="searchForm.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item prop="createDate" class="input">
          <el-date-picker
            v-model="searchForm.createDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="创建日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="operate">
          <el-button @click="">重置</el-button>
          <el-button @click="loadCommodityInformation">搜索</el-button>
          <el-button @click="dialogVisible = true" plain>新增</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="loading"
        element-loading-text="数据加载中"
        element-loading-spinner="el-icon-loading"
        :data="tableData"
        border
        :header-row-style="headerRowStyle"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        style="width: 100%;position: relative; overflow-x: scroll; min-height: 550px;">
        <el-table-column
          prop="name"
          label="商品名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          width="100">
        </el-table-column>
        <el-table-column
          prop="spec"
          label="规格"
          width="100">
        </el-table-column>
        <el-table-column
            prop="remark"
            label="备注"
            width="150">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          width="100">
          <template slot-scope="scope">
            {{ scope.row.createDate?scope.row.createDate:'-' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span v-if="scope.row.showOperate">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pager"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 15, 20]"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :total="page.total"
        :current-page.sync="page.current"
        :page-size="page.size">
      </el-pagination>
      <edit-dialog
        ref="editDialog"
        @success="handleEditSuccess"
        :show.sync="dialogVisible">
      </edit-dialog>
    </el-card>
  </div>
</template>

<script>
  import commodity from '@/api/commodity'
  import editDialog from './editDialog'

  export default {
    components: { editDialog },
    data () {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }]
        },
        labelPosition: 'right',
        loading: false,
        dialogVisible: false,
        searchForm: {
          name: '',
          createDate: '',
          haveBarcode: false
        },
        editForm: {
          name: '',
          price: '',
          spec: '',
          remark: ''
        },
        page: {
          total: 0,
          current: 1,
          size: 10
        },
        tableData: []
      }
    },
    created: function () {
      this.loadCommodityInformation()
    },
    methods: {
      headerRowStyle ({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'background: #EFEFEF'
        } else {
          return ''
        }
      },
      cellMouseEnter (row, column, cell, event) {
        row.showOperate = true
      },
      cellMouseLeave (row, column, cell, event) {
        row.showOperate = false
      },
      handleSizeChange (size) {
        this.page.size = size
        this.loadCommodityInformation()
      },
      handlePageChange () {
        this.loadCommodityInformation()
      },
      handleEdit (index, row) {
        this.editForm = row
        this.$refs['editDialog'].handleEdit(this.editForm)
        this.dialogVisible = true
      },
      async handleDelete (index, row) {
        try {
          await this.$confirm(`确认删除商品 ${row.name}?`, '确认删除')
          const res = await commodity.remove({ id: row.id })
          if (res.success) {
            this.$emit('success', true)
            this.loadCommodityInformation()
          } else {
            this.$message.error(res.msg)
          }
        } catch (error) {
          console.log(error)
        }
      },
      async loadCommodityInformation () {
        this.loading = false
        const res = await commodity.pageQuery(this.page.current, this.page.size, this.searchForm)
        this.page.total = res.data.total
        res.data.list.forEach(element => {
          element.showOperate = false
        })
        this.tableData = res.data.list
        this.loading = false
      },
      handleEditSuccess () {
        this.loadCommodityInformation()
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .card-container {
    height: 100%;
    .search-form .operate {
      float: right;
    }
    .search-form .input {
      float: left;
    }
    .pager {
      margin-top: 10px;
    }
  }
</style>

