<template>
  <div>
    <mt-header title="问答网" fixed></mt-header>
    <mt-tab-container style="margin:40px 0px 55px 0px" v-model="active">
      <mt-tab-container-item id="home">
        <p v-for="(n,i) of 100" :key="i" v-text="`首页${n}`"></p>
      </mt-tab-container-item>
      <mt-tab-container-item id="cart">
        <p v-for="(n,i) of 100" :key="i" v-text="`购物车${n}`"></p>
      </mt-tab-container-item>
      <mt-tab-container-item id="me">
        <p v-for="(n,i) of 100" :key="i" v-text="`个人中心${n}`"></p>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar fixed v-model="active">
      <mt-tab-item id="home">
        <img src="../assets/home_enable.png" slot="icon" v-if="active=='home'">
        <img src="../assets/home_disable.png" slot="icon" v-else>
        <span>首页</span>
      </mt-tab-item>
      <mt-tab-item id="cart">
        <img src="../assets/cart_enable.png" slot="icon" v-if="active=='cart'">
        <img src="../assets/cart_disable.png" slot="icon" v-else>
        <span>购物车</span>
      </mt-tab-item>
      <mt-tab-item id="me">
        <img src="../assets/cart_enable.png" slot="icon" v-if="active=='me'">
        <img src="../assets/cart_disable.png" slot="icon" v-else>
        <span>个人中心</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: "home"
      }
    },
    watch: {
      active() {
        if (this.active == "home") {
          this.$router.push("/");
        } else if (this.active == "cart") {
          this.$router.push("/list");
        } else {
          this.$router.push("/navbar");
        }
      }
    }
  }
</script>