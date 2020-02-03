<template>
  <div id="app">
    <van-notice-bar text="功能开发、测试阶段，请勿使用！面对疫情：勤洗手、多通风、带好口罩！不传谣、不信谣！" left-icon="volume-o"></van-notice-bar>

    <transition mode="out-in"
                enter-active-class="animated fadeInDown"
                leave-active-class="animated fadeOutDown"
    >
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
      getUserInfo({openId: this.$route.query["openId"]}).then(res => {
        res = res.data;
        let state = this.$store.state;
        state.userInfo = res.userInfo;
        state.clubInfo = res.clubInfo;
        state.companyInfo = res.companyInfo;
        state.studentInfo = res.studentInfo;

        // 判断是否是新用户
        if (Object.keys(res.clubInfo).length === 0
          && Object.keys(res.companyInfo).length === 0
          && Object.keys(res.studentInfo).length === 0) {

          state.isNewUser = true;
          let msg = '亲爱滴，' + this.$store.state.userInfo.userName + '\n请先完善信息哟~';
          this.$dialog.alert({
            message: msg
          });
          this.$router.push({
            path: '/NewUser',
            query: {
              openId: this.$route.query["openId"]
            }
          });
        }

      });
    },
    created() {
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

    background: #74ebd5; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ACB6E5, #74ebd5); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ACB6E5, #74ebd5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
