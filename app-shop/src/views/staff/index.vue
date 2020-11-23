<template>
<div>
    <!-- 搜索 -->
    <el-form :model="keyword" :inline="true" class="demo-form-inline search">
      <el-form-item>
        <el-input placeholder="账号" v-model="keyword.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="姓名" v-model="keyword.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">查询</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <el-button @click="keyword = {}">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="salary" label="薪酬"></el-table-column>
      <el-table-column prop="entryDate" label="入职时间"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="openEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10,20,50]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 新增、编辑 弹框 -->
    <el-dialog
      :title="form.id ? title.edit : title.add"
      :visible.sync="dialogFormVisible"
      width="500px"
      class="dialog-form"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="账号" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="retailPrice">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="薪酬" :label-width="formLabelWidth">
          <el-input v-model="form.salary" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" :label-width="formLabelWidth">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择入职时间"
                v-model="form.entryDate"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="form.id ? handleEdit('form') : handleAdd('form')">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
import { get, add, del, updata, findOne } from "@/api/staff";
export default {
 // 组件参数 接收来自父组件的数据
 props: [],
 // 局部注册的组件
 components: {},
 // 组件状态值
 data () {
 return {
      dialogFormVisible:false,
      formLabelWidth:'100px',
      title:{
        add:'员工添加',
        edit:'员工修改'
      },
      keyword: {},
      list: [],
      page: 1,
      pagesize: 20,
      total: 0,
      form: {
        username: "",
        name: "",
        age: "",
        mobile: "",
        salary:"",
        entryDate: ""
      },
      rules:{
        username:[
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        name:[
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],

      }
 }
 },
 // 计算属性
 computed: {},
 // 侦听器
 watch: {},
 // 组件方法
 methods: {
         // 获取员工数据
    async getData() {
      let res = await get(this.keyword, this.page, this.pagesize);
      // console.log(res);
      if (res.flag) {
        // this.$message.success(res.message);
        this.list = res.data.rows;
        this.total = res.data.total;
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    // 确认 添加
    // handleAdd(formName) {
    //   this.$refs[formName].validate(async valid => {
    //     if (valid) {
    //       let res = await add(this.form);
    //       // console.log(res);
    //       if (res.flag) {
    //         this.dialogFormVisible = false;
    //         this.$message.success(res.message);
    //         this.getData();
    //         this.form = {};
    //       }
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    // 开启修改弹框
    // async openEdit(id) {
    //   this.dialogFormVisible = true;
    //   let res = await findOne(id);
    //   // console.log(res);
    //   if (res.flag) {
    //     this.form = res.data;
    //   }
    // },
    // 确认 修改
    // async handleEdit() {
    //   let res = await updata(this.form);
    //   // console.log(res);
    //   if (res.flag) {
    //     this.dialogFormVisible = false;
    //     this.$message.success(res.message);
    //     this.getData();
    //     this.form = {};
    //   }
    // },
    // 删除会员
    // handleDel(id) {
    //   this.$confirm("确认删除这条记录吗？", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       let res = await del(id);
    //       if (res.flag) {
    //         this.$message({
    //           type: "success",
    //           message: "删除成功!"
    //         });
    //         this.getData();
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // }
 },
 // 以下是生命周期钩子 注：没用到的钩子请自行删除
 /**
 * 在实例初始化之后，组件属性计算之前，如data属性等
 */
 beforeCreate () {
 },
 /**
 * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
 */
 created () {
 },
 /**
 * 在挂载开始之前被调用：相关的 render 函数首次被调用。
 */
 beforeMount () {
 },
 /**
 * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
 * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
 */
 mounted () {
     this.getData();
 },
 /**
 * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
 * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
 */
 beforeUpdate () {
 },
 /**
 * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
 * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
 */
 updated () {
 },
 /**
 * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
 */
 activated () {
 },
 /**
 * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
 */
 deactivated () {
 },
 /**
 * 实例销毁之前调用。在这一步，实例仍然完全可用。
 */
 beforeDestroy () {
 },
 /**
 * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
 * 所有的事件监听器会被移除，所有的子实例也会被销毁。
 */
 destroyed () {
 }
}
</script> 

<style lang="scss" scoped>
.search {
  margin-top: 20px;
}
.el-dialog{
  .el-input{
    width:300px;
  }
}
</style>
