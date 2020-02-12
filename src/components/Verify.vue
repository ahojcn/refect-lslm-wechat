<template>
  <div>
    <van-dialog @confirm="onConfirm" @cancel="refreshCode" v-model="showDialog" title="验证码" show-cancel-button>
      <table align="center">
        <tr>
          <td>
            <s-identify :identify-code="identifyCode"></s-identify>
          </td>
          <td>
            <van-button plain icon="replay" type="danger" @click="refreshCode"></van-button>
          </td>
        </tr>
      </table>

      <van-field type="digit" v-model="inputText"
                 center clearable maxlength="6" placeholder="请输入验证码">
      </van-field>
    </van-dialog>
  </div>
</template>

<script>
  import SIdentify from "./SIdentify";

  export default {
    name: "Verify",
    components: {SIdentify},
    props: {
      show: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        identifyCode: "",
        identifyCodes: "1234567890",

        showDialog: this.show,

        inputText: "",
      }
    },
    methods: {
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
        }
      },

      onConfirm() {
        if (this.inputText !== this.identifyCode) {
          this.$toast.fail('验证码有误！');
        } else {
          this.$store.state.verifyCodeOk = true;
          setInterval(()=>{
            this.$store.state.verifyCodeOk = false;
            console.log(false)
          }, 10 * 1000);
        }
      },
    },
    mounted() {
      // 生成验证码
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
  }
</script>

<style scoped>

</style>
