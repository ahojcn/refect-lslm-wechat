<template>
  <div>
    <van-row>
      <van-col span="6"></van-col>
      <van-col span="12">
        <van-button :disabled="student" size="large" block
                    color="linear-gradient(to right, #70e1f5, #ffd194)" to="/NewUser/Student">
          学生认证{{this.$store.state.studentInfo.auditStatusStr}}
        </van-button>
        <br>
        <br>
        <van-button :disabled="company" size="large" block color="linear-gradient(to right,  #eecda3, #ef629f)"
                    to="/NewUser/Company">
          企业认证{{this.$store.state.companyInfo.auditStatusStr}}
        </van-button>
        <br>
        <br>
        <van-button :disabled="club" size="large" block color="linear-gradient(to right,  #4bb0ff, #6149f6)"
                    :to="toClub">
          学生社团认证{{this.$store.state.clubInfo.auditStatusStr}}
        </van-button>
      </van-col>
      <van-col span="6"></van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: "Index",
    computed: {
      student: function () {
        // return Object.keys(this.$store.state.studentInfo).length !== 0;
        return this.$store.state.studentInfo.auditStatus === 1;
      },
      company: function () {
        // return Object.keys(this.$store.state.companyInfo).length !== 0;
        return this.$store.state.companyInfo.auditStatus === 1;
      },
      club: function () {
        // return Object.keys(this.$store.state.clubInfo).length !== 0;
        // 如果没有审核通过，返回 false
        // 审核通过返回 true 禁用按钮
        return this.$store.state.clubInfo.auditStatus === 1;
      },

      toClub: function () {
        if (Object.keys(this.$store.state.studentInfo).length === 0) {
          // 如果没有学生信息，带上参数 stu = 1
          return "/NewUser/Club?stu=1";
        }

        return "/NewUser/Club";
      }
    },
  }
</script>

<style scoped>

</style>
