<template>
  <div>
    <div>
      <!-- 头部form表单 -->
      <el-form ref="form" :model="form" label-width="80px" inline>
        <el-form-item>
          <el-input v-model="form.goodsname" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.goodsnum" placeholder="商品编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.goodsmer" placeholder="选择供应商"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary" @click="onAdd">新增</el-button>
          <el-button @click="form={}">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格区域 -->
      <div class="table_container">
        <div class="table_wrapper">
          <el-table :data="goodslist" border style="width: 100%">
            <el-table-column prop="id" label="序号"> </el-table-column>
            <el-table-column prop="name" label="商品名称"> </el-table-column>
            <el-table-column prop="code" label="商品编码"> </el-table-column>
            <el-table-column prop="spec" label="商品规格"> </el-table-column>
            <el-table-column prop="purchasePrice" label="零售价">
            </el-table-column>
            <el-table-column prop="retailPrice" label="进货价">
            </el-table-column>
            <el-table-column prop="storageNum" label="库存数量">
            </el-table-column>
            <el-table-column prop="supplierName" label="供应商">
            </el-table-column>

            <el-table-column label="操作" width="150px">
              <template slot-scope="scope">
                <el-button size="mini" @click="exit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="size"
        :page-sizes="[10, 20, 30]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="goodsname">
          <el-input v-model="ruleForm.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="商品编码" prop="goodsnum">
          <el-input v-model="ruleForm.goodsnum"></el-input>
        </el-form-item>

        <el-form-item label="商品规格">
          <el-input v-model="ruleForm.goodsspec"></el-input>
        </el-form-item>

        <el-form-item label="零售价" prop="goodspurchasePrice">
          <el-input v-model="ruleForm.goodspurchasePrice"></el-input>
        </el-form-item>

        <el-form-item label="进货价">
          <el-input v-model="ruleForm.goodsretailPrice"></el-input>
        </el-form-item>

        <el-form-item label="库存数量">
          <el-input v-model="ruleForm.goodsstorageNum"></el-input>
        </el-form-item>

        <el-form-item label="供应商">
          <el-input v-model="ruleForm.goodssupplierName"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="exitsure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGoods,del,add } from "../../api/goods/index";
export default {
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      goodslist: [],
      total: 0,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        goodsname: "",
        goodsnum: "",
        goodsmer: "",
      },
      ruleForm: {
        goodsname: "", //商品名称
        goodsnum: "", //商品编码
        goodspurchasePrice: "", //零售价
        goodsspec: "", //规格
        goodsretailPrice: "", //进货价
        goodsstorageNum: "", //库存数量
        goodssupplierName: "", //供应商
        ruleId: "",
      },
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        goodsnum: [
          { required: true, message: "请输入商品编码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        goodspurchasePrice: [
          { required: true, message: "请输入商品零售价", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      keyword: {
        code: "",
        name: "",
        supplierName: "",
      },
      size: 1,
      limit: 10,
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    //一级查询
    onSearch() {
      this.changeLimit()
      this.form.goodsname="";
      this.form.goodsnum="";
      this.form.goodsmer="";
      this.$message.success("查询成功！")
    },
    //添加
    onAdd() {},
    //重置
    onReset() {},
    //刷新数据
    changeLimit() {
      getGoods(this.keyword, this.size, this.limit).then((res) => {
        this.goodslist = res.data.rows;
        this.total = res.data.total;
        // console.log(res)
      });
    },
    //每页条数
    handleSizeChange(i) {
      this.limit = i;
      this.changeLimit();
    },
    //页码数分页
    handleCurrentChange(i) {
      this.size = i;
      this.changeLimit();
    },
    //编辑
    exit(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.ruleForm.goodsname = row.name;
      this.ruleForm.goodsnum = row.code;
      this.ruleForm.goodspurchasePrice = row.purchasePrice;
      this.ruleForm.goodsspec = row.spec;
      this.ruleForm.goodsretailPrice = row.retailPrice;
      this.ruleForm.goodsstorageNum = row.storageNum;
      this.ruleForm.goodssupplierName = row.supplierName;
      this.ruleForm.ruleId = row.supplierID;
    },
    //编辑确定
    async exitsure(id) {
      
      let res= await add(id)
      console.log(res)
      if(res.code==2000){
        this.$message.success(res.message)
        this.dialogFormVisible = false;
        this.changeLimit();
      }
      
    },
    //删除
    async del(id) {
      let res= await del(id)
      console.log(res)
      if(res.code==2000){
        this.$message.success(res.message)
        this.changeLimit()
      }
      
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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
    this.changeLimit();
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
  destroyed() {},
};
</script> 


<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.table_container {
  width: 100%;
  height: 60vh;
  // background: gray;
  overflow: scroll;
  .table_wrapper {
    width: 100%;
  }
}
</style>
