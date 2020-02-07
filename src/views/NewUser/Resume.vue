<template>
  <div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa'}">
      完善简历，帮助用人单位更好的认识你
    </van-divider>

    <van-cell-group>
      <van-field label="姓名" placeholder="请输入您的姓名" v-model="resumeName"></van-field>

      <van-field label="性别" placeholder="请选择您的性别" v-model="resumeSexStr" readonly clickable
                 @click="showSexPicker = true"></van-field>
      <van-popup v-model="showSexPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="sexPicker"
          @cancel="showSexPicker = false"
          @confirm="onSexConfirm">
        </van-picker>
      </van-popup>

      <van-field label="年龄" placeholder="您多大了？" type="digit" v-model="resumeAge"></van-field>

      <van-field label="学历" placeholder="请选择您的学历" readonly clickable @click="showEduPicker = true"
                 v-model="resumeEducationStr"></van-field>
      <van-popup v-model="showEduPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="eduPicker"
          @cancel="showEduPicker = false"
          @confirm="onEduConfirm">
        </van-picker>
      </van-popup>

      <van-field label="校园经历" placeholder="例如：学生会主席" type="textarea" v-model="resumeHistory"></van-field>

      <van-field label="现居住地" placeholder="例如：陕西西安" v-model="resumeAddress"></van-field>

      <van-field label="期望职位" placeholder="例如：数学家庭教师" v-model="resumeWork"></van-field>

      <van-field label="期望工作" placeholder="请选择您期望的工作种类" readonly clickable
                 v-model="resumeWorkCategoryStr"
                 @click="showWorkCategoryPicker = true"></van-field>
      <van-popup v-model="showWorkCategoryPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="workCategoryPicker"
          @cancel="showWorkCategoryPicker = false"
          @confirm="onWorkCategoryConfirm">
        </van-picker>
      </van-popup>

      <van-field label="期望薪资" placeholder="例如：50元/天" v-model="resumeHopeMoney"></van-field>

      <van-field label="语言能力" placeholder="例如：获得 CET4/CET6 等" v-model="resumeLanguage"></van-field>

      <van-field label="获奖经历" placeholder="例如：2019年大学生创新创业大赛一等奖" v-model="resumeCredential"></van-field>

      <van-field placeholder="自我简介" type="textarea" maxlength="100" autosize v-model="resumeAboutMyself"></van-field>
    </van-cell-group>

    <div style="padding-top: 20px">
      <van-row gutter="5">
        <van-col span="4"></van-col>
        <van-col span="16">
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
  import {getPositionCategories} from "@/api/company";
  import {uploadStudentResume} from "@/api/student";

  export default {
    name: "Resume",
    data() {
      return {
        showSexPicker: false,
        sexPicker: [{text: '男', value: 1}, {text: '女', value: 2}],

        showEduPicker: false,
        eduPicker: [{text: '博士', value: 1}, {text: '硕士', value: 2}, {text: '本科', value: 3}, {text: '大专', value: 4}],

        showWorkCategoryPicker: false,
        workCategoryPickerLoading: true,
        workCategoryPicker: [],

        resumeName: '',
        resumeSex: '', resumeSexStr: '',
        resumeAge: '',
        resumeEducation: '', resumeEducationStr: '',
        resumeHistory: '',
        resumeAddress: '',
        resumeWork: '',
        resumeWorkCategory: '', resumeWorkCategoryStr: '',
        resumeHopeMoney: '',
        resumeAboutMyself: '',
        resumeLanguage: '',
        resumeCredential: '',
      }
    },
    computed: {},
    methods: {
      onSexConfirm(value, index) {
        this.resumeSexStr = value.text;
        this.resumeSex = value.value;
        this.showSexPicker = false;
      },
      onEduConfirm(value, index) {
        this.resumeEducationStr = value.text;
        this.resumeEducation = value.value;
        this.showEduPicker = false;
      },
      onWorkCategoryConfirm(value, index) {
        this.resumeWorkCategoryStr = value.text;
        this.resumeWorkCategory = value.value;
        this.showWorkCategoryPicker = false;
      },

      onSubmit() {
        let msg =
          "姓名：" + this.resumeName +
          "\n性别：" + this.resumeSex +
          "\n年龄：" + this.resumeAge +
          "\n学历：" + this.resumeEducationStr +
          "\n校园经历：" + this.resumeHistory +
          "\n现居住地：" + this.resumeAddress +
          "\n期望职位：" + this.resumeWork +
          "\n期望职位种类：" + this.resumeWorkCategoryStr +
          "\n期望薪资：" + this.resumeHopeMoney +
          "\n语言能力：" + this.resumeLanguage +
          "\n获奖经历：" + this.resumeCredential +
          "\n自我简介：" + this.resumeAboutMyself
        ;

        this.$dialog.confirm({
          title: '请确认',
          message: msg
        }).then(() => {
          this.$toast.loading({
            message: '处理中...',
            forbidClick: true,
            loadingType: 'spinner'
          });

          // on confirm 提交简历信息
          uploadStudentResume({
            openId: this.$store.state.userInfo.openId,
            resumeName: this.resumeName,
            resumeSex: this.resumeSex,
            resumeAge: this.resumeAge,
            resumeEducation: this.resumeEducation,
            resumeHistory: this.resumeHistory,
            resumeAddress: this.resumeAddress,
            resumeWork: this.resumeWork,
            resumeWorkCategory: this.resumeWorkCategory,
            resumeHopeMoney: this.resumeHopeMoney,
            resumeAboutMyself: this.resumeAboutMyself,
            resumeLanguage: this.resumeLanguage,
            resumeCredential: this.resumeCredential,
          }).then(res => {
            this.$toast(res.msg);
            if (res.code === 0) {
              this.$router.push({path: '/'});
            }
          });
        }).catch(() => {
          // pass
        });

      },
    },
    mounted() {
      getPositionCategories().then(res => {
        res.data.forEach((item, index) => {
          this.workCategoryPicker.push({
            text: item.categoryName,
            value: item.categoryId
          })
        });
        this.workCategoryPickerLoading = false;
      });
    },
  }
</script>

<style scoped>

</style>
