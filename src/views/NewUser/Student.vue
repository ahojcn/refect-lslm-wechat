<template>
  <div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa'}">
      学生认证
    </van-divider>

    <div v-if="editable" style="text-align: center">
      <div style="display: inline;">
        <span style="color: red">
          信息审核中，暂时不能修改哦~
        </span>
      </div>
    </div>

    <van-cell-group>
      <van-field :disabled="editable" placeholder="请输入姓名" maxlength="30" v-model="studentInfo.name"
                 label="姓名"></van-field>
      <van-field :disabled="editable" placeholder="请输入学校" maxlength="30" v-model="studentInfo.school"
                 label="学校"></van-field>
      <van-field :disabled="editable" placeholder="请输入学号" maxlength="30" v-model="studentInfo.number"
                 label="学号"></van-field>

      <van-cell center title="学生证正面照">
        <template slot="default">
          <van-image v-if="editable" width="100" height="100"
                     :src="$store.state.studentInfo.studentCertificate"></van-image>
          <van-uploader v-if="!editable" v-model="fileList" :max-count="1" :after-read="afterRead"></van-uploader>
        </template>
      </van-cell>
      <van-progress color="linear-gradient(to right, #ACB6E5, #74ebd5)" :show-pivot="true"
                    :percentage="uploadRate"></van-progress>
    </van-cell-group>

    <service-license></service-license>

    <div style="padding-top: 20px">
      <van-button @click="onSubmit" icon="success" type="primary" block>
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
  import {uploadFile} from '@/api/utils';
  import {approveStudent} from '@/api/approve';
  import {sendVerifyKey} from '@/api/basic-info';
  import ServiceLicense from "../../components/ServiceLicense";

  export default {
    name: "Student",
    components: {ServiceLicense},
    data() {
      return {
        studentInfo: {
          certificate: this.$store.state.studentInfo.studentCertificate ? this.$store.state.studentInfo.studentCertificate : '',
          name: this.$store.state.studentInfo.studentName ? this.$store.state.studentInfo.studentName : '',
          school: this.$store.state.studentInfo.studentSchool ? this.$store.state.studentInfo.studentSchool : '',
          number: this.$store.state.studentInfo.studentId ? this.$store.state.studentInfo.studentId : '',
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
    computed: {
      // 是否可以编辑
      // 如果是审核中则不能编辑
      editable: function () {
        return this.$store.state.studentInfo.auditStatus === 0;
      },
    },
    methods: {
      // 上传文件处理
      afterRead(file) {
        uploadFile(file.file, e => {
          if (e.lengthComputable) {
            let rate = this.uploadRate = e.loaded / e.total * 100;  //已上传的比例
            rate = rate.toFixed(0);
            if (rate === '100') {
              rate = 99;
            }
            this.$toast.loading({
              message: `上传进度\n${rate}%`,
              forbidClick: true
            });
            this.uploadRate = rate;
          }
        }).then(res => {
          if (res.code === 0) {
            this.$toast('上传成功!');
            this.uploadRate = 100;
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

        let msg = "姓名：" + this.studentInfo.name + "\n"
          + "学校：" + this.studentInfo.school + "\n"
          + "学号：" + this.studentInfo.number + "\n"
          + "手机号：" + this.$store.state.userInfo.userPhone + "\n";
        this.$dialog.confirm({
          title: '确认信息',
          message: msg
        }).then(() => {
          this.$toast.loading({
            message: '处理中...',
            forbidClick: true,
            loadingType: 'spinner'
          });

          // 尝试提交学生信息
          approveStudent({
            openId: this.$store.state.userInfo.openId,
            certificate: this.studentInfo.certificate,
            name: this.studentInfo.name,
            school: this.studentInfo.school,
            number: this.studentInfo.number
          }).then(res => {
            if (res.code === 0) {
              this.$toast('已提交，待审核！');
              if (this.$route.query.stu === '1') {
                this.$router.push({
                  path: '/NewUser/Club'
                });
              } else {
                this.$router.push('/');
              }
            }
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
          query: this.$route.query
        });
      }
    },
  }
</script>

<style scoped>

</style>
