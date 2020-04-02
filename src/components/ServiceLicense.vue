<template>
  <div>
    <div style="padding-top: 20px; text-align: center; font-size: 10px; color: #969799">
      使用即代表同意
      <a style="color: #0570db" @click="showServiceLicense = true">《骊山鹿鸣服务协议》</a>
    </div>

    <van-dialog v-model="showServiceLicense" title="用户协议" show-cancel-button :message="$store.state.serviceLicense"></van-dialog>
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
