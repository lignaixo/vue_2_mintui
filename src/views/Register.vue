<template>
  <div>
    <!-- 导航栏 -->
    <mt-header title="用户注册" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/" slot="right">
        <mt-button>
          <img src="../assets/more.png" slot="icon">
        </mt-button>
      </router-link>
    </mt-header>
    <!-- 表单栏 -->
    <div style="margin-top:40px">
      <mt-field type="text" label="用户名" placeholder="请输入用户名" :state="unameState" v-model="uname"
        @blur.native.capture="unameCheck">
      </mt-field>
      <mt-field type="password" label="密码" placeholder="请输入密码" :state="upwdState" v-model="upwd"
        @blur.native.capture="upwdCheck">
      </mt-field>
      <mt-field type="password" label="确认密码" placeholder="请确认密码" :state="cpwdState" v-model="cpwd"
        @blur.native.capture="cpwdCheck">
      </mt-field>
      <mt-button type="primary" size="large" @click="register">免费注册</mt-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        uname: "",
        upwd: "",
        cpwd: "",
        unameState: "",
        upwdState: "",
        cpwdState: ""
      }
    },
    methods: {
      // 验证用户名表单
      unameCheck() {
        let unameRegExp = /^\w{6,12}$/;
        if (unameRegExp.test(this.uname)) {
          this.unameState = "success";
          return true;
        } else {
          this.unameState = "error";
          this.$toast({
            message: "用户名不合法",
            position: "middle",
            duration: 2000
          });
          return false;
        }
      },
      // 验证密码表单
      upwdCheck() {
        let upwdRegExp = /^\w{8,20}$/;
        if (upwdRegExp.test(this.upwd)) {
          this.upwdState = "success";
          return true;
        } else {
          this.upwdState = "error";
          this.$toast({
            message: "密码不合法",
            position: "middle",
            duration: 2000
          });
          return false;
        }
      },
      // 验证两次密码是否一致
      cpwdCheck() {
        if (this.cpwd == this.upwd && this.cpwd !== "") {
          this.cpwdState = "success";
          return true;
        } else {
          this.cpwdState = "error";
          this.$toast({
            message: "两次密码不一致",
            position: "middle",
            duration: 2000
          });
          return false;
        }
      },
      // 注册按钮
      register() {
        if (this.unameCheck() && this.upwdCheck() && this.cpwdCheck()) {
          this.axios.post("/register", `uname=${this.uname}&upwd=${this.upwd}`).then(res => {
            if (res.data.code == 0) {
              this.$messagebox("注册提示", "对不起，用户已存在");
            } else {
              // 调用vuex中mutations中的函数
              this.$store.commit("login_mutation");
              // 存储到sessionStorage中
              sessionStorage.setItem("isLogin", true);
              this.$router.push("/");
            }
          });
        }
      }
    }
  }
</script>