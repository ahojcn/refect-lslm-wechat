<template>
  <div>
    <div style="padding-top: 20px; text-align: center;">
      使用即代表同意<br>
      <a style="color: #0570db" @click="showServiceLicense = true">《骊山鹿鸣服务协议》</a>
    </div>

    <van-popup
      v-model="showServiceLicense"
      :style="{ minHeight: '30%', minWidth: '100%' }">
      {{$store.state.serviceLicense}}
    </van-popup>
  </div>
</template>

<script>
  import {getServiceLicense} from '../api/total';

  export default {
    name: "ServiceLicense",
    data() {
      return {
        showServiceLicense: false
      }
    },
    mounted() {
      if (this.$store.state.serviceLicense === "") {
        getServiceLicense().then(res => {
          this.$store.state.serviceLicense = res.data;
        });
      }
    }
  }
</script>

<style scoped>

</style>
