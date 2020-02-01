<template>
  <div>
    <van-cell-group>
      <van-field v-model="userPhone" @input="verifyKey = ''" placeholder="请输入手机号" type="tel" label="手机号">
        <van-button slot="button" size="small" type="primary" @click="handleSendVerifyCode">
          发送验证码
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

      <van-field placeholder="请输入姓名" v-model="studentInfo.name" label="姓名"></van-field>
      <van-field placeholder="请输入学校" v-model="studentInfo.school" label="学校"></van-field>
      <van-field placeholder="请输入学号" v-model="studentInfo.number" label="学号"></van-field>

      <van-cell center title="学生证正面照">
        <template slot="default">
          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead"></van-uploader>
        </template>
      </van-cell>
      <van-progress color="linear-gradient(to right, #ACB6E5, #74ebd5)" :show-pivot="true"
                    :percentage="uploadRate"></van-progress>
    </van-cell-group>

    <br>
    <van-row gutter="5">
      <van-col span="4"></van-col>
      <van-col span="2">
        <van-button icon="arrow-left" size="large" type="warning" block @click="$router.go(-1)"></van-button>
      </van-col>
      <van-col span="14">
        <van-button @click="onSubmit" icon="success" size="large" type="primary" block>
          提交
        </van-button>
      </van-col>
      <van-col span="4"></van-col>
    </van-row>
  </div>
</template>

<script>
  import {uploadFile} from '@/api/utils';
  import {approveStudent} from '@/api/approve';
  import {sendVerifyKey, bindPhone} from '@/api/basic-info';

  export default {
    name: "Student",
    data() {
      return {
        studentInfo: {
          certificate: '',
          name: '',
          school: '',
          number: '',
        },
        uploadRate: 0,
        fileList: [],
        userPhone: '',
        verifyKey: '',
      }
    },
    methods: {
      // 上传文件处理
      afterRead(file) {
        this.$toast.loading({
          message: '上传中',
          forbidClick: true
        });

        uploadFile(file.file, e => {
          if (e.lengthComputable) {
            let rate = this.uploadRate = e.loaded / e.total * 100;  //已上传的比例
            if (rate < 100) {
              this.uploadRate = rate;
            }
          }
        }).then(res => {
          if (res.code === 0) {
            this.$toast('上传成功!');
            this.studentInfo.certificate = res.data;
          }
        });
      },
      // 提交
      onSubmit() {
        if (this.userPhone === '') {
          this.$toast('请输入手机号');
          return;
        } else if (this.verifyKey === '') {
          this.$toast('请输入短信验证码');
          return;
        } else if (this.studentInfo.name === '') {
          this.$toast('请输入姓名');
          return;
        } else if (this.studentInfo.school === '') {
          this.$toast('请输入学校名');
          return;
        } else if (this.studentInfo.number === '') {
          this.$toast('请输入学号');
          return;
        } else if (this.studentInfo.certificate === '') {
          this.$toast('请上传学生证正面照片');
          return;
        }

        // 先尝试绑定手机
        bindPhone({
          openId: this.$store.state.userInfo.openId,
          phone: this.userPhone,
          verifyKey: this.verifyKey
        }).then(res => {
          if (res.code === 0) {
            this.$dialog.confirm({
              title: '确认信息',
              message: `
                姓名：${this.studentInfo.name}
                <br>
                学校：${this.studentInfo.school}
                <br>
                学号：${this.studentInfo.number}
                <br>
                手机号：${this.userPhone}`
            }).then(() => {
              // 尝试提交学生信息
              approveStudent({
                openId: this.$store.state.userInfo.openId,
                certificate: this.studentInfo.certificate,
                name: this.studentInfo.name,
                school: this.studentInfo.school,
                number: this.studentInfo.number
              }).then(res => {
                console.log(res);
                this.$toast('OK，已提交~');
              });
            });
          }
        });
      },
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
            this.$toast('OK, 请注意查收~');
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
