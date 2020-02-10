<template>
  <div>
    <div style="text-align: center; padding-top: 10%">
      <div style="display: inline;">
        <div class="animated flip">
          <img class="advert_avatar" @click="$toast('嗨起来！')" :src="$store.state.userInfo.userIcon">
        </div>

        <br>
        <span style="font-weight: 700;">
          {{$store.state.userInfo.userName}}
        </span>
      </div>
    </div>

    <van-row>
      <van-col span="1"></van-col>
      <van-col span="22">
        <transition mode="out-in"
                    enter-active-class="animated fadeInRight"
                    leave-active-class="animated fadeOutLeft"
        >
          <router-view></router-view>
        </transition>
      </van-col>
      <van-col span="1"></van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: "NewUser",
    data() {
      return {}
    },
    methods: {},
    mounted() {
    },
    created() {
    },
  }
</script>

<style scoped>

  /* advert_avatar */
  .advert_avatar {
    border: 3px solid #eee;
    width: 100px;
    height: 100px;
    padding: 0;
    border-radius: 20%;
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
