<template>
  <div>
    <!--    <div id="qrCode" ref="qrCodeDiv"></div>-->

    <div style="text-align: center; padding-top: 10%">
      <div style="display: inline;">
        <div class="animated flip">
          <img class="advert_avatar" @click="$toast('嗨起来！')" :src="$store.state.userInfo.userIcon">
        </div>
        <span style="font-weight: 700">
          {{$store.state.userInfo.userName}}
        </span>
        <br>
        <van-tag v-if="Object.keys($store.state.studentInfo).length !== 0" type="primary">学生用户</van-tag>
        <van-tag v-if="Object.keys($store.state.companyInfo).length !== 0" type="success">企业用户</van-tag>
        <van-tag v-if="Object.keys($store.state.clubInfo).length !== 0" type="warning">学生社团用户</van-tag>
      </div>
    </div>

    <div>
      <van-cell-group title="我的">
        <!-- 学生 -->
        <div v-if="Object.keys($store.state.studentInfo).length !== 0">
          <van-cell title="我的简历" icon="edit" value="点击修改" is-link to="/NewUser/Resume"></van-cell>
        </div>

        <!-- 企业 -->
        <div v-if="Object.keys($store.state.companyInfo).length !== 0">
          <van-cell title="单元格" value="内容"></van-cell>
        </div>

        <!-- 社团 -->
        <div v-if="Object.keys($store.state.clubInfo).length !== 0">
          <van-cell title="单元格" value="内容"></van-cell>
        </div>
      </van-cell-group>

      <van-cell-group title="认证">
        <van-cell icon="user-circle-o" title="学生认证" is-link></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  // import QRCode from 'qrcodejs2';

  export default {
    name: "Home",
    data() {
      return {
        activeNames: ['1'],
      }
    },
    methods: {
      bindQRCode: function () {
        // let j = {a: 1, b: 2, c: 3};
        // let data = encodeURIComponent(JSON.stringify(j));
        // console.log(JSON.parse(decodeURIComponent(data)));

        // new QRCode(this.$refs.qrCodeDiv, {
        //   text: 'https://www.baidu.com',
        //   width: 200,
        //   height: 200,
        //   colorDark: "#333333", //二维码颜色
        //   colorLight: "#ffffff", //二维码背景色
        //   correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
        // })
      }
    },
    mounted() {
      this.$store.commit('setActiveTabBar', 'Home');

      // this.$nextTick(function () {
      //   this.bindQRCode();
      // });
    },
  }
</script>

<style scoped>
  /* advert_avatar */
  .advert_avatar {
    border: 3px solid #eee;
    border-radius: 50%;
    padding: 0;
    width: 20%;
    animation: advert_nav-m 20s linear infinite;
    -moz-animation: advert_nav-m 20s linear infinite;
    /* Firefox */
    -webkit-animation: advert_nav-m 20s linear infinite;
    /* Safari Chrome */
    -o-animation: advert_nav-m 20s linear infinite;
    animation-direction: alternate;
  }

  .advert_avatar:hover {
    animation: advert_nav-x 0.3s linear infinite;
    -moz-animation: advert_nav-x 0.3s linear infinite;
    /* Firefox */
    -webkit-animation: advert_nav-x 0.3s ease-in-out infinite;
    /* Safari Chrome */
    -o-animation: advert_nav-x 0.3s linear infinite;
  }

  .advert_avatar p a img:hover {
    animation: advert_nav-a 1s linear infinite;
    -moz-animation: advert_nav-a 1s linear infinite;
    /* Firefox */
    -webkit-animation: advert_nav-a 1s linear infinite;
    /* Safari Chrome */
    -o-animation: advert_nav-a 1s linear infinite;
  }

  .advert_avatar p {
    color: #fff;
    margin-bottom: 0;
  }

  .advert_avatar p a img {
    padding: 5px 15px;
    color: #9a9da0;
    text-decoration: none;
    display: block;
  }

  @keyframes advert_nav-m {
    10% {
      border-color: #ff9292;
    }
    20% {
      border-color: #f09eff;
    }
    30% {
      border-color: #9397ff;
    }
    40% {
      border-color: #9fb8ff;
    }
    50% {
      border-color: #9fd7ff;
    }
    60% {
      border-color: #9fffd2;
    }
    70% {
      border-color: #dfff9f;
    }
    80% {
      border-color: #ffd49f;
    }
    90% {
      border-color: #ffc29f;
    }
    100% {
      border-color: #ffa198;
    }
  }

  @keyframes advert_nav-x {
    10% {
      -webkit-transform: translate(-0.5px, 1.5px) rotate(0.5deg);
      border-color: #ffbebe;
    }
    20% {
      -webkit-transform: translate(-0.5px, 1.5px) rotate(-0.5deg);
      border-color: #ffdebe;
    }
    30% {
      -webkit-transform: translate(-2.5px, -1.5px) rotate(0.5deg);
      border-color: #fff3be;
    }
    40% {
      -webkit-transform: translate(-2.5px, -2.5px) rotate(-1.5deg);
      border-color: #eeffbe;
    }
    50% {
      -webkit-transform: translate(1.5px, 1.5px) rotate(-1.5deg);
      border-color: #f3ffbe;
    }
    60% {
      -webkit-transform: translate(-2.5px, -0.5px) rotate(-0.5deg);
      border-color: #e9ffbe;
    }
    70% {
      -webkit-transform: translate(1.5px, -2.5px) rotate(-0.5deg);
      border-color: #d0ffbe;
    }
    80% {
      -webkit-transform: translate(0.5px, 1.5px) rotate(0.5deg);
      border-color: #beffde;
    }
    90% {
      -webkit-transform: translate(-2.5px, -0.5px) rotate(0.5deg);
      border-color: #beefff;
    }
    100% {
      -webkit-transform: translate(-0.5px, -0.5px) rotate(-1.5deg);
      border-color: #bed8ff;
    }
  }

  @keyframes advert_nav-a {
    10% {
      color: #ff9292;
    }
    20% {
      color: #f09eff;
    }
    30% {
      color: #9397ff;
    }
    40% {
      color: #9fb8ff;
    }
    50% {
      color: #9fd7ff;
    }
    60% {
      color: #9fffd2;
    }
    70% {
      color: #dfff9f;
    }
    80% {
      color: #ffd49f;
    }
    90% {
      color: #ffc29f;
    }
    100% {
      color: #ffa198;
    }
  }

</style>
