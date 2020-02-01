<template>
  <div>
    <van-cell-group>
      <van-field v-model="company.clubName" label="社团名"></van-field>
      <van-field v-model="company.clubDesc" type="textarea" maxlength="50" autosize label="社团职责"></van-field>
      <van-field v-model="company.schoolName" label="学校"></van-field>
      <van-field v-model="company.ownerName" label="社团负责人"></van-field>
      <van-field v-model="company.clubCode" label="邀请码"></van-field>
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
    name: "Club",
    data() {
      return {
        company: {
          clubName: '',
          clubDesc: '',
          schoolName: '',
          ownerName: '',
          clubCode: ''
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
