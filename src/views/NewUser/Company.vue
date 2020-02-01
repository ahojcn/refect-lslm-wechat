<template>
  <div>
    <van-cell-group>
      <van-field v-model="company.name" label="企业名称"></van-field>
      <van-field v-model="company.owner" label="企业法人"></van-field>
      <van-field v-model="company.describe" type="textarea" maxlength="50" autosize label="经营范围"></van-field>
      <van-field v-model="company.number" label="工商注册号"></van-field>
      <van-cell center title="营业执照">
        <template slot="default">
          <van-uploader :after-read="afterRead"></van-uploader>
        </template>
      </van-cell>
      <van-progress :show-pivot="false" :percentage="0"></van-progress>
    </van-cell-group>

    <br>
    <van-row>
      <van-col span="4"></van-col>
      <van-col span="16">
        <van-button icon="success" size="large" type="primary" block>
          提交
        </van-button>
      </van-col>
      <van-col span="4"></van-col>
    </van-row>
  </div>
</template>

<script>
  import {uploadFile} from '@/api/utils';

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
      }
    },
    methods: {
      afterRead(file) {
        let fd = new FormData();
        fd.append('file', file.file);
        console.log(fd.get('file'));

        uploadFile(fd).then(res => {
          console.log(res)
        });
      },
    },
    mounted() {
    },
    created() {
    },
  }
</script>

<style scoped>

</style>
