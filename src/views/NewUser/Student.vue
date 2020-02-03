<template>
  <div>
    <van-cell-group>
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
        <van-button icon="arrow-left" size="large" type="warning" block to="/NewUser/Index"></van-button>
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
        sendMsgBtnDisabled: false,
        sendMsgBtnText: '发送验证码',
        sendMsgTime: 30,
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
        if (this.studentInfo.name === '') {
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

        this.$dialog.confirm({
          title: '确认信息',
          message: `
                姓名：${this.studentInfo.name}<br>
                学校：${this.studentInfo.school}<br>
                学号：${this.studentInfo.number}<br>
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
            this.$toast('已提交，待审核！');
            this.$router.push('/');
          });
        }).catch(() => {
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
    },
    mounted() {
      if (this.$store.state.userInfo.userPhone === '') {
        this.$toast('请先绑定手机');
        this.$router.push({
          path: `/NewUser/BindPhone?returnPath=${this.$route.path}`,
        });
      }
    },
  }
</script>

<style scoped>

</style>
