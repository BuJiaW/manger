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
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格区域 -->
      <div class="table_container">
        <div class="table_wrapper">
          <el-table :data="goodslist" border style="width: 100%">
            <el-table-column prop="id" label="序号"> </el-table-column>
            <el-table-column prop="name" label="商品名称"> </el-table-column>
            <el-table-column prop="code" label="商品编码"> </el-table-column>
            <el-table-column prop="spec" label="商品编码"> </el-table-column>
            <el-table-column prop="purchasePrice" label="零售价">
            </el-table-column>
            <el-table-column prop="retailPrice" label="进货价">
            </el-table-column>
            <el-table-column prop="storageNum" label="库存数量">
            </el-table-column>
            <el-table-column prop="supplierName" label="供应商">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="size"
        :page-sizes="[10, 20, 30]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getGoods } from "../../api/goods/index";
export default {
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      goodslist: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
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
    onSearch() {},
    //添加
    onAdd() {},
    //重置
    onReset() {},
    changeLimit() {
      getGoods(this.keyword, this.size, this.limit).then((res) => {
        this.goodslist = res.data.rows;
        console.log(this.goodslist);
      });
    },
    handleSizeChange(i) {
      this.limit = i;
      this.changeLimit()
    },
    handleCurrentChange(i){
      this.size=i;
      this.changeLimit()
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
    this.changeLimit()
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
