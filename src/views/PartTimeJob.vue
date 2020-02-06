<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="selectedCategory" :options="categories"></van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script>
  import {getPositionCategories} from "@/api/company";
  import {getPositionList} from '@/api/student';

  export default {
    name: "PartTimeJob",
    data() {
      return {
        selectedCategory: 0,  // 选择的分类
        categories: [   // 兼职分类
          {text: '全部分类', value: 0},
        ],
      }
    },
    methods: {},
    mounted() {
      getPositionList({
        page: 0,
        size: 5,
        openId: this.$store.state.userInfo.openId
      }).then(res=>{
        console.log(res);
      });

      getPositionCategories().then(res => {
        res.data.forEach((item,index)=>{
          this.categories.push({
            text: item.categoryName,
            value: item.categoryId
          })
        })
      });

    },
  }
</script>

<style scoped>

</style>
