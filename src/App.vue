<template>
  <div id="app">
    <img src="./assets/logo.png">
    <br>
    {{status}} | {{data}}
    <br>
    <span style="color: red">
      cookie[{{cookie}}]
    </span>
    <br>
    <span style="color: coral">
      openId[{{openId}}]
    </span>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        data: {},
        status: '...',
        cookie: 'xxx',
        openId: 'xxx',
      }
    },
    mounted() {
      // this.$axios.get('wechat/authorize', {
      //   params: {
      //     returnUrl: 'http://127.0.0.1:8080/'
      //   }
      // }).then(res => {
      //   this.status = 'success';
      //   this.data = res;
      // }).catch(err=>{
      //   this.status = 'error';
      //   this.data = err;
      // });

      // this.cookie = this.$cookie.get('openid');

      // this.cookie = this.$route.query["openId"];
      //
      // localStorage.setItem('openId', this.cookie);
      //
      // this.openId = localStorage.getItem('openId');
      //
      // this.$axios.post(
      //   'basic-info/getUserInfo',
      //   JSON.stringify({openId: 'oxrwq0zPbgTB-gV9Y4Q-hN4g25Fk'}),
      //   {headers: {'Content-Type': 'application/json'}},
      // ).then(res => {
      //   this.status = 'success';
      //   this.data = res;
      // }).catch(err => {
      //   this.status = 'error';
      //   this.data = err;
      // });

    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
