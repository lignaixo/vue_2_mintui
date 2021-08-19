<template>
  <div>
    <!-- 顶部标题栏 -->
    <mt-header title="学前端，到学问">
      <div slot="right" class="shortcut" v-if="!$store.state.isLogin">
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </div>
      <div slot="right" class="shortcut" v-else>
        <router-link to="/">{{$store.state.username}}</router-link>
        <router-link to="/">
          <mt-button>
            <img src="../assets/logout.png" slot="icon">
          </mt-button>
        </router-link>
      </div>
    </mt-header>
    <!-- 顶部选项卡 -->
    <mt-navbar v-model="topActive">
      <mt-tab-item :id="item.id" v-for="(item,i) of category" :key="i">
        <span v-text="item.category_name"></span>
      </mt-tab-item>
    </mt-navbar>
    <!-- 面板区域 -->
    <!-- 触发滚动函数 -->
    <!-- immediate-check默认true，但不写则无法实现，会在首次加载时立即检测是否需要触发滚动函数发送请求 -->
    <div class="panel" infinite-scroll-distance="10" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
      infinite-scroll-immediate-check="true">
      <mt-tab-container v-model="topActive">
        <mt-tab-container-item :id="item.id" v-for="(item,i) of category" :key="i">
          <!-- 单一页面容器 -->
          <div class="info-item" v-for="(item,i) of articles" :key="i">
            <div class="info-item-head">
              <router-link :to="`/article/${item.id}`" v-text="item.subject"></router-link>
            </div>
            <div class="info-item-content">
              <div class="info-item-des" v-text="item.description"></div>
              <!-- 如果没有图片，则直接忽略加载，同时采用懒加载 -->
              <img class="info-item-img" v-lazy="item.image" v-if="item.image!==null">
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- 底部选项卡 -->
    <mt-tabbar fixed v-model="botActive">
      <mt-tab-item id="home">
        <img src="../assets/home_enable.png" slot="icon" v-if="botActive=='home'">
        <img src="../assets/home_disable.png" slot="icon" v-else>
        <span>主页</span>
      </mt-tab-item>
      <mt-tab-item id="cart">
        <img src="../assets/cart_enable.png" slot="icon" v-if="botActive=='cart'">
        <img src="../assets/cart_disable.png" slot="icon" v-else>
        <span>购物车</span>
      </mt-tab-item>
      <mt-tab-item id="me">
        <img src="../assets/me_enable.png" slot="icon" v-if="botActive=='me'">
        <img src="../assets/me_disable.png" slot="icon" v-else>
        <span>个人中心</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // 顶部选项卡与面板区域ID选择
        topActive: 1,
        // 底部选项卡ID选择
        botActive: "home",
        // 服务器返回数据
        category: [],
        articles: [],
        page: 1,
        busy: false,
        // 代表服务器返回的总页数
        pageCount: 0
      }
    },
    methods: {
      // 触发滚动函数
      // 并假设服务器过载，延迟2S
      loadMore() {
        this.page++;
        if (this.page <= this.pageCount) {
          this.articlesMethod();
        }
      },
      // 分类信息数据
      categoryMethod() {
        this.axios.get("/category").then(res => {
          this.category = res.data.results;
        });
      },
      // 文章数据
      articlesMethod() {
        // true表示不允许滚动时加载
        this.busy = true;
        // 发送时弹出加载提示框
        this.$indicator.open("加载中...");
        this.axios.get(`/articles?cid=${this.topActive}&page=${this.page}`).then(res => {
          let data = res.data.articles;
          // 在mounted挂载阶段 watch监听 都需要获取总页数
          this.pageCount = res.data.pageCount;
          data.forEach(item => {
            // 有的文章没有图片，无需require动态加载
            if (item.image !== null) {
              item.image = require(`../assets/articles/${item.image}`);
            }
            // 原数组遍历的每一个值均是地址值，故原数组也会随之改变，无论在外界写this.articles=data，还是下方均可以，但无限滚动效果需要push
            this.articles.push(item);
          });
          // axios异步传参，放在外面可能服务器加载慢，而主程序已经允许滚动时加载，导致二次加载
          this.busy = false;
          // axios接收参数成功，关闭加载提示框
          this.$indicator.close();
        });
      }
    },
    mounted() {
      // 分类信息挂载时加载
      this.categoryMethod();
      // 文章数据挂载时加载，但是无限滚动又加载了一次，故无限滚动属性加上check即可首次停止加载
      this.articlesMethod();
    },
    watch: {
      // 监听topActive变量，一旦改变，调用文章数据方法
      topActive() {
        // 切换顶部选项卡时，需要page、articles重置
        this.page = 1;
        this.articles = [];
        this.articlesMethod();
      },
      botActive() {
        if (this.botActive == "home") {
          // this.$router.push("/");
          console.log(`跳转至首页...`);
        } else if (this.botActive == "cart") {
          // this.$router.push("/tabber");
          console.log(`跳转至购物车...`);
        } else {
          // this.$router.push("/navbar");
          console.log(`跳转至个人中心...`);
        }
      }
    }
  }
</script>
<style scoped>
  .shortcut a {
    margin-left: 5px;
    color: #fff;
    font-size: 12px;
    text-decoration: none;
  }

  .panel {
    margin: 10px 0px 60px 0px;
  }

  .info-item {
    padding: 15px 0 14px;
    margin: 0 15px;
    border-bottom: .5px solid #d3d3d3;
  }

  .info-item-head>a {
    color: #1a1a1a;
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
    text-decoration: none;
  }

  .info-item-content {
    display: flex;
    align-items: center;
    padding-top: 11px;
    width: 100%;
  }

  .info-item-des {
    flex: 1;
    position: relative;
    /* margin: 4px 15px; */
    padding-right: 15px;
    height: 63px;
    color: #444;
    font-size: 15px;
    font-weight: 400;
    line-height: 21px;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: normal;
  }

  .info-item-img {
    width: 112px;
    height: 74px;
    border-radius: 5px;
    background: #ccc;
  }
</style>