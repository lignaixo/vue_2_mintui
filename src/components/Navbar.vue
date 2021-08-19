<template>
  <div>
    <div style="position:fixed;width:100%">
      <mt-header title="问答网"></mt-header>
      <mt-navbar v-model="active">
        <mt-tab-item id="html">
          <img src="../assets/html.png" slot="icon">
        </mt-tab-item>
        <mt-tab-item id="css">
          <img src="../assets/css.png" slot="icon">
        </mt-tab-item>
        <mt-tab-item id="javascript">
          <img src="../assets/javascript.png" slot="icon">
        </mt-tab-item>
        <mt-tab-item id="jquery">
          <img src="../assets/jquery.png" slot="icon">
        </mt-tab-item>
      </mt-navbar>
    </div>
    <div style="padding-top:106px">

    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: "html"
      }
    },
    mounted() {
      console.log(`服务器${this.active}的信息`);
    },
    watch: {
      active() {
        console.log(`服务器${this.active}的信息`);
      }
    }
  }
</script>