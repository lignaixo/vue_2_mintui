<template>
  <div>
    <!-- 顶部栏 -->
    <mt-header title="学前端，到学问">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!-- 表单栏 -->
    <div>
      <mt-field type="text" label="用户名" placeholder="请输入用户名" :state="unameState" v-model="uname"
        @blur.native.capture="unameCheck">
      </mt-field>
      <mt-field type="password" label="密码" placeholder="请输入密码" :state="upwdState" v-model="upwd"
        @blur.native.capture="upwdCheck">
      </mt-field>
      <mt-button type="primary" size="large" @click="login">立即登录</mt-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        uname: "",
        upwd: "",
        unameState: "",
        upwdState: ""
      }
    },
    methods: {
      unameCheck() {
        let unameRegExp = /^\w{6,12}$/;
        if (unameRegExp.test(this.uname)) {
          this.unameState = "";
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
      upwdCheck() {
        let upwdRegExp = /^\w{8,20}$/;
        if (upwdRegExp.test(this.upwd)) {
          this.upwdState = "";
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
      login() {
        if (this.unameCheck && this.upwdCheck) {
          this.axios.post('/login', `uname=${this.uname}&upwd=${this.upwd}`).then(res => {
            if (res.data.code == 0) {
              this.$messagebox("登录提示", "对不起，用户名或密码错误");
            } else {
              // 调用vuex中mutations中的函数，并进行payload传参
              this.$store.commit("login_mutation", res.data.login);
              // 存储到sessionStorage中，防止页面刷新消失
              sessionStorage.setItem("isLogin", true);
              sessionStorage.setItem("userId", res.data.login.id);
              sessionStorage.setItem("username", res.data.login.username);
              sessionStorage.setItem("nickname", res.data.login.nickname);
              this.$router.push("/");
            }
          });
        }
      }
    }
  }
</script>