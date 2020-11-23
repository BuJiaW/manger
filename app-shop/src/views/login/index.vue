<template>
  <div class="login-wrapper">
  <div class="login-center">
    <h2 class="login-title">梦学谷会员管理系统</h2>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="账号" prop="username">
     <el-input v-model.trim="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
     <el-input v-model.trim="form.password"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="username">
    <el-button type="primary" @click="tologin('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
export default {
  name: '',
props:{},
  data() {
    return {
      form:{
        username:"",
        password:""
      },
       rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
components: {
},
  computed:{
    // const res = await this.$store.dispatch("UserLogout");
    //   if (res.flag) {
    //     //回到登录页面
    //      console.log(res)
    //     this.$router.push("/login");
    //   } else {
    //     message.PromptMessage("登录失败", "error");
    //   }
  },
  methods: {
     async tologin(){
        const res = await this.$store.dispatch("UserLogin",this.form)
         if (res.flag) {
        //回到登录页面
         console.log(res)
        this.$router.push("/index");
      } else {
        message.PromptMessage("登录失败", "error");
      }
    // this.$refs[formName].validate((valid)=>{
    //   if(valid){
    //     this.$message.success('登陆成功')
    //     this.$router.push("/index")
    //     this.dispath.
    //   }
    //   else{
    //     this.$message.error('登录失败，请重新登录')
    //     return false;
    //   }
    // });
    }
  },
};
</script>

<style scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("http://mengxuegu.com:9999/img/login.b665435f.jpg") no-repeat;
}
.login-center {
  width: 350px;
  background: rgba(235, 232, 243, 0.8);
  margin: 160px auto;
  padding: 28px;
  border-radius: 20px;
}
.login-title {
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin: 20px 0;
}
</style>
