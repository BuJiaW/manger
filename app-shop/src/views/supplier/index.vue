<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-form :model="keyword" :inline="true" class="demo-form-inline search">
      <el-form-item>
        <el-input placeholder="供应商名称" v-model="keyword.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="联系人" v-model="keyword.linkman"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="联系电话" v-model="keyword.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="bjw_Search">查询</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <el-button @click="keyword = {}">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 渲染数据 -->
    <el-table :data="tableData" height="350" border style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="180"></el-table-column>
      <el-table-column align="center" prop="name" label="供应商名称"></el-table-column>
      <el-table-column align="center" prop="linkman" label="联系人"></el-table-column>
      <el-table-column align="center" prop="mobile" label="联系电话"></el-table-column>
      <el-table-column align="center" prop="remark" label="备注"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="page"
      :page-sizes="[10,20,30]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 编辑 -->
    <el-dialog :title="form.id?supplier.edit:supplier.add" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="供应商名称" prop="name" label-width="100px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman" label-width="100px">
          <el-input v-model="form.linkman"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="100px">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="form.id? bjw_Sure('form') : bjw_add('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  bjw_getList,
  bjw_Delete,
  bjw_Update,
  bjw_Edit,
  bjw_AddList
} from "../../api/supplier/index";
export default {
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      limit: 10,

      // 编辑
      dialogFormVisible: false,
      form: {},

      // 添加
      keyword: {},

      supplier: {
        edit: "供应商编辑",
        add: "供应商新增"
      },
      // 正则
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        linkman: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ]
      }
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 渲染接口
    async bjw_List() {
      let res = await bjw_getList(this.keyword, this.page, this.limit);
      this.tableData = res.data.rows;
      this.total = res.data.total;
    },
    // 修改
    async handleEdit() {
      this.dialogFormVisible = true;
      let res = await bjw_Update();
      this.form = res.data;
    },
    async bjw_Sure(id) {
      let res = await bjw_Edit(id);
      if (res.code == 2000) {
        this.$message.success(res.message);
        this.bjw_List();
        this.dialogFormVisible = false;
        this.form = {};
      } else {
        this.$message.error(res.message);
      }
    },
    // 删除
    handleDelete(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await bjw_Delete(id);
          console.log(res);
          if (res.code == 2000) {
            this.$message.success("删除成功");
            this.bjw_List();
          } else {
            this.$message.success("删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 分页
    changeSize(page) {
      this.limit = page;
      this.bjw_List();
    },
    changePage(page) {
      this.page = page;
      this.bjw_List();
    },
    // 查询
    bjw_Search() {
      this.bjw_List();
      this.keyword.name = "";
      this.keyword.linkman = "";
      this.keyword.mobile = "";
      this.$message.success("查找成功");
    },
    // 添加
    bjw_add(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await bjw_AddList(this.form);
          this.$message.success(res.message);
          this.dialogFormVisible = false;
          this.bjw_List();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  // 以下是生命周期钩子 注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {
    this.bjw_List();
  },
  /**
   * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
   * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
   */
  beforeUpdate() {},
  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   */
  updated() {},
  /**
   * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
   */
  activated() {},
  /**
   * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
   */
  deactivated() {},
  /**
   * 实例销毁之前调用。在这一步，实例仍然完全可用。
   */
  beforeDestroy() {},
  /**
   * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
   * 所有的事件监听器会被移除，所有的子实例也会被销毁。
   */
  destroyed() {}
};
</script> 

<style scoped>
.el-pagination {
  margin-top: 24px;
}
</style>
