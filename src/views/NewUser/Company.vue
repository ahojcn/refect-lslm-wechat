<template>
  <div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa'}">
      企业认证
    </van-divider>

    <div v-if="editable" style="text-align: center">
      <div style="display: inline;">
        <span style="color: red">
          信息审核中，暂时不能修改哦~
        </span>
      </div>
    </div>

    <van-cell-group>
      <van-field :disabled="editable" v-model="company.name" maxlength="30" label="企业名称"
                 placeholder="请输入企业名称"></van-field>
      <van-field :disabled="editable" v-model="company.owner" maxlength="30" label="企业法人"
                 placeholder="请输入企业法人"></van-field>
      <van-field :disabled="editable" v-model="company.describe" type="textarea" placeholder="请输入经营范围" maxlength="200"
                 autosize
                 show-word-limit label="经营范围"></van-field>
      <van-field :disabled="editable" v-model="company.number" maxlength="50" label="工商注册号"
                 placeholder="请输入工商注册号"></van-field>
      <van-cell center title="营业执照">
        <template slot="default">
          <van-image v-if="editable" width="100" height="100"
                     :src="$store.state.companyInfo.companyCertificate"></van-image>
          <van-uploader v-if="!editable" v-model="fileList" :max-count="1" :after-read="afterRead"></van-uploader>
        </template>
      </van-cell>
      <van-progress color="linear-gradient(to right, #ACB6E5, #74ebd5)" :show-pivot="true"
                    :percentage="uploadRate"></van-progress>
    </van-cell-group>

    <service-license></service-license>

    <div style="padding-top: 20px">
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
  </div>
</template>

<script>
  import {uploadFile} from '@/api/utils';
  import {approveCompany} from '@/api/approve';
  import ServiceLicense from "../../components/ServiceLicense";

  export default {
    name: "Company",
    components: {ServiceLicense},
    data() {
      return {
        company: {
          name: this.$store.state.companyInfo.companyName ? this.$store.state.companyInfo.companyName : '',
          owner: this.$store.state.companyInfo.companyOwnerName ? this.$store.state.companyInfo.companyOwnerName : '',
          describe: this.$store.state.companyInfo.companyDesc ? this.$store.state.companyInfo.companyDesc : '',
          number: this.$store.state.companyInfo.companyId ? this.$store.state.companyInfo.companyId : '',
          certificate: this.$store.state.companyInfo.companyCertificate ? this.$store.state.companyInfo.companyCertificate : '',
        },
        uploadRate: 0,
        fileList: [],
      }
    },
    computed: {
      // 是否可以编辑
      // 如果是审核中则不能编辑
      editable: function () {
        return this.$store.state.companyInfo.auditStatus === 0;
      },
    },
    methods: {
      // 上传文件
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

        let msg = "企业名称：" + this.company.name + "\n"
          + "企业法人：" + this.company.owner + "\n"
          + "经营范围：" + this.company.describe + "\n"
          + "工商号：" + this.company.number + "\n";

        this.$dialog.confirm({
          title: '确认信息',
          message: msg
        }).then(() => {
          this.$toast.loading({
            message: '处理中...',
            forbidClick: true,
            loadingType: 'spinner'
          });

          // 提交企业认证信息
          approveCompany({
            openId: this.$store.state.userInfo.openId,
            name: this.company.name,
            owner: this.company.owner,
            describe: this.company.describe,
            number: this.company.number,
            certificate: this.company.certificate
          }).then(res => {
            if (res.code === 0) {
              this.$toast('已提交，待审核！');
              this.$router.push('/');
            }
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
