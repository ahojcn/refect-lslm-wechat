<template>
  <div>
    <van-cell-group>
      <van-field v-model="company.name" label="企业名称" placeholder="请输入企业名称"></van-field>
      <van-field v-model="company.owner" label="企业法人" placeholder="请输入企业法人"></van-field>
      <van-field v-model="company.describe" type="textarea" placeholder="请输入经营范围" maxlength="50" autosize
                 label="经营范围"></van-field>
      <van-field v-model="company.number" label="工商注册号" placeholder="请输入工商注册号"></van-field>
      <van-cell center title="营业执照">
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
  import {approveCompany} from '@/api/approve';

  export default {
    name: "Company",
    data() {
      return {
        company: {
          name: '',
          owner: '',
          describe: '',
          number: '',
          certificate: '',
        },
        uploadRate: 0,
        fileList: [],
      }
    },
    methods: {
      // 上传文件
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
            this.company.certificate = res.data;
          }
        });
      },
      // 提交
      onSubmit() {
        if (this.company.name === '') {
          this.$toast('请输入企业名称');
          return;
        } else if (this.company.owner === '') {
          this.$toast('请输入企业法人');
          return;
        } else if (this.company.describe === '') {
          this.$toast('请输入经营范围');
          return;
        } else if (this.company.number === '') {
          this.$toast('请输入工商注册号');
          return;
        } else if (this.company.certificate === '') {
          this.$toast('请上传营业执照');
          return;
        }

        this.$dialog.confirm({
          title: '确认信息',
          message: `
            企业名称：${this.company.name}<br>
            企业法人：${this.company.owner}<br>
            经营范围：${this.company.describe}<br>
            工商号：${this.company.number}
          `
        }).then(() => {
          // 提交企业认证信息
          approveCompany({
            openId: this.$store.state.userInfo.openId,
            name: this.company.name,
            owner: this.company.owner,
            describe: this.company.describe,
            number: this.company.number,
            certificate: this.company.certificate
          }).then(res => {
            this.$toast('已提交，待审核！');
            this.$router.push('/');
          });
        }).catch(() => {
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
    created() {
    },
  }
</script>

<style scoped>

</style>
