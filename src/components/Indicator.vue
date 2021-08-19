<template>
  <div>
    <mt-button type="primary" @click="open">打开提示框</mt-button>
  </div>
</template>
<script>
  export default {
    methods: {
      open() {
        // this.$indicator.open("加载中...");
        this.$indicator.open({
          Text: "加载中...",
          spinnerType: "triple-bounce"
        });
      }
    }
  }
</script>