<template>
  <div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa'}">
      绑定手机号
    </van-divider>

    <van-field v-model="userPhone" @input="verifyKey = ''"
               placeholder="请输入手机号"
               type="tel" label="手机号">
      <van-button :disabled="sendMsgBtnDisabled"
                  slot="button" size="small" type="primary"
                  @click="handleSendVerifyCode">
        {{sendMsgBtnText}}
      </van-button>
    </van-field>

    <van-field
      v-model="verifyKey"
      center
      clearable
      type="digit"
      label="短信验证码"
      placeholder="请输入短信验证码"
    >
    </van-field>

    <br>

    <van-button @click="onSubmit" icon="success" type="primary" block>
      绑定
    </van-button>
  </div>
</template>

<script>
  import {getUserInfo} from '@/api/basic-info';
  import {sendVerifyKey, bindPhone} from '@/api/basic-info';

  export default {
    name: "BindPhone",
    data() {
      return {
        userPhone: '',
        verifyKey: '',
        sendMsgBtnDisabled: false,
        sendMsgBtnText: '发送验证码',
        sendMsgTime: 30,
      }
    },
    methods: {
      // 发送短信验证码
      handleSendVerifyCode() {
        if (!(/^1[3456789]\d{9}$/.test(this.userPhone))) {
          this.$toast('手机号码有误!');
          return;
        }

        sendVerifyKey({
          phone: this.userPhone
        }).then(res => {
          if (res.code === 0) {
            this.sendMsgBtnDisabled = true;

            let id = setInterval(() => {
              this.sendMsgBtnText = `${this.sendMsgTime}秒后重新发送`;
              this.sendMsgTime -= 1;
            }, 1000);

            setTimeout(() => {
              clearInterval(id);
              this.sendMsgBtnDisabled = false;
              this.sendMsgBtnText = '发送验证码';
              this.sendMsgTime = 30;
            }, 1000 * 30);

            this.$toast('OK, 请注意查收~');
          }
        });
      },
      // 绑定手机
      onSubmit() {
        if (this.userPhone === '') {
          this.$toast('请输入手机号');
          return;
        } else if (this.verifyKey === '') {
          this.$toast('请输入短信验证码');
          return;
        }

        // 先尝试绑定手机
        bindPhone({
          openId: this.$store.state.userInfo.openId,
          phone: this.userPhone,
          verifyKey: this.verifyKey
        }).then(res => {
          if (res.code === 0) {
            getUserInfo({openId: this.$store.state.userInfo.openId}).then(res => {
              res = res.data;
              let state = this.$store.state;
              state.userInfo = res.userInfo;
              state.clubInfo = res.clubInfo;
              state.companyInfo = res.companyInfo;
              state.studentInfo = res.studentInfo;
            });

            this.$dialog.alert({
              title: '绑定成功',
              message: `手机号：${this.userPhone}`
            }).then(() => {
              this.$router.push({
                path: this.$route.query['returnPath'] === undefined ? '/' : this.$route.query['returnPath'],
                query: this.$route.query,
              });
            });
          }
        });
      },
    },
    mounted() {
    },
  }
</script>

<style scoped>

</style>
