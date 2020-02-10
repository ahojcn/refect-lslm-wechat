<template>
  <div id="app" style="padding-bottom: 30px">
    <van-overlay :show="$store.state.loading">
      <div style="display: flex;align-items: center;justify-content: center;height: 100%;">
        <div>
          <van-loading size="50px" color="#1989fa" vertical>加载中...</van-loading>
        </div>
      </div>
    </van-overlay>

    <transition
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {getUserInfo} from '@/api/basic-info';

  export default {
    name: 'App',
    data() {
      return {}
    },
    mounted() {
    },
    beforeCreate() {
      localStorage.setItem('openId', this.$route.query["openId"]);

      // 更新用户信息
      this.$store.dispatch('updateUserInfo', this.$route.query["openId"]).then((res) => {
        // 判断是否是新用户 || 没有一个身份审核通过的
        if ((Object.keys(res.clubInfo).length === 0 || res.clubInfo.auditStatus !== 1)
          &&
          (Object.keys(res.companyInfo).length === 0 || res.companyInfo.auditStatus !== 1)
          &&
          (Object.keys(res.studentInfo).length === 0 || res.studentInfo.auditStatus !== 1)) {

          this.$store.state.isNewUser = true;
          let msg = '亲爱滴，' + this.$store.state.userInfo.userName + '\n请先完善信息哟~';
          this.$dialog.alert({
            message: msg
          });
          this.$router.push({
            path: '/NewUser',
            query: {
              openId: this.$route.query["openId"],
              query: this.$route.query
            }
          });
        }
      });

      // 获取用户信息
      /*
      getUserInfo({openId: this.$route.query["openId"]}).then(res => {
        res = res.data;
        let state = this.$store.state;
        state.userInfo = res.userInfo;
        state.clubInfo = res.clubInfo;
        state.companyInfo = res.companyInfo;
        state.studentInfo = res.studentInfo;

        // 判断是否是新用户 || 没有一个身份审核通过的
        if ((Object.keys(res.clubInfo).length === 0 || res.clubInfo.auditStatus !== 1)
          &&
          (Object.keys(res.companyInfo).length === 0 || res.companyInfo.auditStatus !== 1)
          &&
          (Object.keys(res.studentInfo).length === 0 || res.studentInfo.auditStatus !== 1)) {

          state.isNewUser = true;
          let msg = '亲爱滴，' + this.$store.state.userInfo.userName + '\n请先完善信息哟~';
          this.$dialog.alert({
            message: msg
          });
          this.$router.push({
            path: '/NewUser',
            query: {
              openId: this.$route.query["openId"],
              query: this.$route.query
            }
          });
        }

      });
      */

    },
    created() {
      /*
      window.L2Dwidget.init({
        pluginRootPath: '../static/live2dw/',
        pluginJsPath: '../lib/',
        pluginModelPath: '../live2d-widget-model-wanko/assets/',
        tagMode: false,
        debug: false,
        model: {jsonPath: '../static/live2dw/live2d-widget-model-wanko/assets/wanko.model.json'},
        display: {position: 'right', width: 200, height: 150},
        mobile: {show: true, scale: 0.5},
        log: false,
        dialog: {  // 开启对话框
          enable: true,
          script: {
            // 当接触到角色身体
            'tap body': '汪汪 ~',
            // 当初碰到头部
            'tap face': '好好看，好好学 ~'
          }
        },
      });

      window.L2Dwidget.on('*', (name) => {
      });
      */
    },
  }
</script>

<style>

  #app {
    /*background: #f1f1fe;*/
    position: relative;
    /*border-radius: 10px;*/
    overflow: scroll;
    display: flex;
    min-height: 100vh;
    flex-direction: column;

    background-image: url('./assets/background-image/bk1.png');
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
  }

</style>
