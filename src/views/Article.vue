<template>
  <div class="article">
    <!-- 顶部导航 -->
    <mt-header title="学前端,上学问">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!-- 文章区域 -->
    <div>
      <!-- 文章标题开始 -->
      <div class="article-header">
        <div class="article-header-title">
          {{info.subject}}
        </div>
        <!-- 页面上面引用无需添加this，如果在下方引用，必须加this -->
        <!-- 而且此刻只在页面上直接引用，否则打印Invalid date -->
        <div class="article-header-datetime" v-text="moment.unix(this.info.created_at).format('Y年M月D日')"></div>
      </div>
      <!-- 作者信息 -->
      <div class="author-info">
        <div class="author-info-avatar">
          <img :src="info.avatar">
        </div>
        <div class="author-info-detail">
          <div class="author-info-nickname" v-text="info.nickname"></div>
          <div>
            共<mt-badge size="small" type="error" v-text="info.article_number"></mt-badge>篇
          </div>
        </div>
      </div>
      <!-- 文章正文 -->
      <div class="article-content" v-html="info.content"></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["id"],
    data() {
      return {
        info: {}
      }
    },
    mounted() {
      this.axios.get('/view', {
        params: {
          id: this.id
        }
      }).then(res => {
        this.info = res.data.view;
        this.info.avatar = require(`../assets/avatar/${this.info.avatar}`);
      });
    }
  }
</script>
<style scoped>
  .article {
    background-color: #f6f6f6;
    height: 100vh;
  }

  .article-header {
    margin-bottom: 5px;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
  }

  .article-header-title {
    font-size: 18px;
    color: #1a1a1a;
    line-height: 1.5;
  }

  .article-header-datetime {
    margin-top: 5px;
    font-size: 14px;
    color: #646464;
  }

  .author-info {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
  }

  .author-info-avatar {
    margin-right: 10px;
  }

  .author-info-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }

  .author-info-detail {
    font-size: 14px;
  }

  .author-info-nickname {
    margin-bottom: 5px;
  }

  .article-content {
    margin-top: 5px;
    padding: 10px;
    background-color: #fff;
    line-height: 1.7;
  }
</style>
<style>
  /* scoped对v-html中的样式无效，故单独拿出来写样式 */
  .article-content p {
    padding: 5px 0;
    font-size: 16px;
  }

  .article-content img {
    max-width: 100%;
    display: block;
  }
</style>