<template>
  <div>
    <el-container>
      <el-header>
        <div>
          <img src="http://mengxuegu.com:9999/img/logo.7156be27.png" alt />
          <p>梦雪谷会员系统</p>
        </div>
        <el-dropdown class="aa" @command="handleCommand">
          <!-- 随机用户名 -->
          <span class="qw">
            {{" 卢军"}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-edit">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-fold" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <asides />
        <mains />
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Asides from "./aside";
import Mains from "./main";
// import { updatePassword } from "../../api/password";
export default {
  props: [],
  components: { Asides, Mains },
  data() {
    // const oldPass = async (rule, value, callback)=>{
      // const userId = this.$store.getters.info.id;
      // const response = await checkPassword(userId,this.oldPass);
      // const res = response.data;
      // if(res.flag){
      //   callback();
      // }else{
      //   callback(new Error("原密码不正确"))
      // }
    // };
    return {};
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    handleCommand(command) {
      switch (command) {
        case "change-pass":
          this.showPassDialog();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    //退出登录的方法
    async logout() {
      const res = await this.$store.dispatch("UserLogout");
      if (res.flag) {
        //回到登录页面
         console.log(res)
        this.$router.push("/login");
      } else {
        message.PromptMessage("登录失败", "error");
      }
      
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
  mounted() {},
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
.el-header {
  background: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.aa {
  color: #fff;
}
.qw {
  color: #fff;
}
img {
  width: 30px;
}
.el-header > div {
  display: flex;
  align-items: center;
}
p {
  margin-left: 10px;
}
.el-aside {
  background: #373d41;
  min-height: 500px;
}
.el-menu {
  border: none;
}
</style>
