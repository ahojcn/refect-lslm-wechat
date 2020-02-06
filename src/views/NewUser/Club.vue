<template>
  <div>
    <div v-if="editable" style="text-align: center">
      <div style="display: inline;">
        <span style="color: red">
          信息审核中，暂时不能修改哦~
        </span>
      </div>
    </div>

    <van-cell-group>
      <van-field :disabled="editable" placeholder="请输入社团名" v-model="club.clubName" label="社团名"
                 maxlength="30"></van-field>
      <van-field :disabled="editable" placeholder="请输入社团职责" v-model="club.clubDesc" type="textarea" maxlength="200"
                 show-word-limit
                 autosize label="社团职责"></van-field>
      <van-field :disabled="editable" placeholder="请输入所属学校" v-model="club.schoolName" label="学校"
                 maxlength="30"></van-field>
      <van-field :disabled="editable" placeholder="请输入社团负责人姓名" v-model="club.ownerName" label="社团负责人"
                 maxlength="30"></van-field>
      <van-field :disabled="editable" placeholder="请输入邀请码" v-model="club.clubCode" label="邀请码"
                 maxlength="30"></van-field>
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
  import {approveClub} from '@/api/approve';

  export default {
    name: "Club",
    data() {
      return {
        club: {
          clubName: this.$store.state.clubInfo.clubName ? this.$store.state.clubInfo.clubName : '',
          clubDesc: this.$store.state.clubInfo.clubDesc ? this.$store.state.clubInfo.clubDesc : '',
          schoolName: this.$store.state.clubInfo.schoolName ? this.$store.state.clubInfo.schoolName : '',
          ownerName: this.$store.state.clubInfo.ownerName ? this.$store.state.clubInfo.ownerName : '',
          clubCode: '',
        },
      }
    },
    computed: {
      // 是否可以编辑
      // 如果是审核中则不能编辑
      editable: function () {
        return this.$store.state.clubInfo.auditStatus === 0;
      },
    },
    methods: {
      // 提交
      onSubmit() {
        if (this.club.clubName === '') {
          this.$toast('请输入社团名');
          return;
        } else if (this.club.clubDesc === '') {
          this.$toast('请输入社团职责');
          return;
        } else if (this.club.schoolName === '') {
          this.$toast('请输入学校名');
          return;
        } else if (this.club.ownerName === '') {
          this.$toast('请输入社团负责人名');
          return;
        } else if (this.club.clubCode === '') {
          this.$toast('请输入邀请码');
          return;
        }

        let msg = "社团名：" + this.club.clubName + "\n"
          + "社团职责：" + this.club.clubDesc + "\n"
          + "学校名：" + this.club.schoolName + "\n"
          + "社团负责人：" + this.club.ownerName + "\n";
        this.$dialog.confirm({
          title: '确认信息',
          message: msg
        }).then(res => {
          approveClub({
            openId: this.$store.state.userInfo.openId,
            clubName: this.club.clubName,
            clubDesc: this.club.clubDesc,
            schoolName: this.club.schoolName,
            ownerName: this.club.ownerName,
            clubCode: this.club.clubCode,
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
          query: this.$route.query
        });
      }

      if (this.$route.query.stu === '1') {
        this.$toast('请先注册为学生用户');
        this.$router.push({
          path: '/NewUser/Student',
          query: this.$route.query
        });
      }
    },
    created() {
    },
  }
</script>

<style scoped>

</style>
