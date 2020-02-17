<template>
  <div id="app" style="padding-bottom: 30px">
    <van-overlay z-index="99"
                 :show="($store.state.userInfo.openId !== 'oxrwq0xrKKyqiAGE8O9TM3L1yaQY') || ($store.state.userInfo.openId === undefined)"
    >
      <div style="display: flex;align-items: center;justify-content: center;height: 100%;">
        <div style="font-weight: 700; text-align: center; color: #fafafa">
          {{hopeData.date}}
          <hr>
          今日疫情

          <table align="center">
            <tr style="color: #ee0a24">
              <td>确诊：</td>
              <td>{{hopeData.diagnosed}}</td>
            </tr>
            <tr style="color: orange">
              <td>疑似：</td>
              <td>{{hopeData.suspect}}</td>
            </tr>
            <tr style="color: #9a9da0">
              <td>死亡：</td>
              <td>{{hopeData.death}}</td>
            </tr>
            <tr style="color: lightgreen">
              <td>治愈：</td>
              <td>{{hopeData.cured}}</td>
            </tr>
          </table>
          <hr>

          最新消息<br>
          <span style="font-weight: 400;">
            {{news.pubDateStr}}，{{news.title}}<br>
            （{{news.provinceName}}，{{news.infoSource}}）<hr>
          </span>
        </div>

        <div style="position: fixed; bottom: 20px; text-align: center">
          <van-loading color="#1989fa"></van-loading>
          <span style="color: #fafafa">
            开发中<br>暂不开放使用<br>请谅解
          </span>
        </div>
      </div>
    </van-overlay>


    <van-overlay z-index="99" :show="$store.state.loading">
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
  import axios from 'axios';
  import {getVirTotal, getVirNews} from '@/api/utils';

  export default {
    name: 'App',
    data() {
      return {
        currentRate: 0,

        hopeData: {},  // 疫情数据
        news: {},
      }
    },
    computed: {},
    mounted() {

      // 获取统计数据
      getVirTotal().then(res => {
        this.hopeData = res.data.data[0];
      });

      // 获取最新消息
      getVirNews().then(res => {
        this.news = res.data.data[0];
      });

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

      // 获取服务协议
      this.$store.dispatch('getServiceLicense');
    }
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
