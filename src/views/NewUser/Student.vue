<template>
  <div>
    <van-cell-group>
      <van-field v-model="studentInfo.name" label="姓名"></van-field>
      <van-field v-model="studentInfo.school" label="学校"></van-field>
      <van-field v-model="studentInfo.number" label="学号"></van-field>
      <van-cell center title="学生证正面照">
        <template slot="default">
          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead"></van-uploader>
        </template>
      </van-cell>
      <van-progress color="linear-gradient(to right, #ACB6E5, #74ebd5)" :show-pivot="true"
                    :percentage="uploadRate"></van-progress>
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
      }
    },
    methods: {
      // 上传文件处理
      afterRead(file) {
        this.$toast.loading({
          message: '上传中',
          forbidClick: true
        });

        uploadFile(file.file, (e) => {
          if (e.lengthComputable) {
            let rate = this.uploadRate = e.loaded / e.total * 100;  //已上传的比例
            if (rate < 100) {
              this.uploadRate = rate;
            }
          }
        }).then(res => {
          this.$toast(res.msg);
          if (res.code === 0) {
            this.studentInfo.certificate = res.data;
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
