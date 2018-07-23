<template>
  <div id="history">
    <div ref="loading" v-loading="loading" element-loading-text="拼命加载中..." element-loading-background="rgba(0, 0, 0, 0.2)" style="width:100%;height:100%;position: fixed;left:0;top:0;"></div>
    <el-table
    :data="tableData"
    style="width: 100%">
      <el-table-column
        prop="name"
        label="项目名称"
        width="200"
        align="center">
        <template slot-scope="scope">
          <img :src="scope.row.icon_url">
          <span class="qkl-text">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="coin_name"
        label="代币名称"
        width="300"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="已投金额"
        width="300"
        align="center">
        <template slot-scope="scope">
          <span> {{scope.row.amount /1000000000}} ETH</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="投资状态"
        align="center">
        <template slot-scope="scope">
          <span class="qkl-text" :class="{'qkl-primary-text' : scope.row.status === 'INIT'}">{{scope.row.status === 'INIT' ? '待发币' : '已完成'}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pull-right" style="margin-top: 30px;">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from '../../api/axios.conf.js'
export default {
  name: 'history',
  data () {
    return {
      currentPage: 1,
      pageSize: 8,
      total: 1,
      tableData: [],
      loading: true,
      serverUrl: localStorage.getItem('server')
    }
  },
  beforeRouteEnter (to, from, next) {
    const isLogin = localStorage.getItem('isLogin')
    if (!isLogin) {
      next(vm => {
        vm.$parent.$children[0].isShowLogin = true
        vm.loading = false
      })
    } else {
      next(vm => {
        vm.getList()
      })
    }
  },
  // created () {
  //   this.getList()
  // },
  methods: {
    getList () {
      var _this = this
      var url = _this.serverUrl + '/project/invest/list?size=8&page=' + this.currentPage
      axios.get(url).then(res => {
        if (res.data.success) {
          _this.tableData = res.data.data.content
          _this.total = res.data.data.totalElements
          _this.pageSize = res.data.data.size
          _this.currentPage = res.data.data.number
          _this.loading = false
          _this.$refs.loading.style.display = 'none'
        } else {
          _this.loading = false
          _this.$refs.loading.style.display = 'none'
          _this.$message(res.data.error)
        }
      }).catch((error) => {
        _this.loading = false
        _this.$refs.loading.style.display = 'none'
        _this.$message(error)
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.loading = true
      this.$refs.loading.style.display = 'block'
      this.getList()
    }
  }
}
</script>
<style lang="scss">
.el-table th{
  color: #000;
  border-color: #eaf0f4;
  background-color: #f7f9fb;
}
.el-table th, .el-table tr{
  height: 65px;
}
.el-table tr:nth-of-type(odd) {
  background-color: #fff;
  &:hover>td{
    background-color: #fff;
  }
}
.el-table tr:nth-of-type(even) {
  background-color: #f7f9fb;
  &:hover>td{
    background-color: #f7f9fb;
  }
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dde2e6;
}
.el-pager li{
  line-height: 26px;
}
</style>

<style lang="scss" scoped>
#history{
  width: 1100px;
  margin: auto;
  margin-top: 30px;
}
.qkl-text{
  display: inline-block;
  vertical-align: middle;
}
.qkl-primary-text{
  color: #2487f8;
}
img{
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  width: 22px;
  height: 22px;
}
</style>
