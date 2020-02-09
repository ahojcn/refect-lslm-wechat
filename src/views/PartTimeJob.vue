<template>
  <div>
    <!-- 分类下拉菜单 -->
    <div>
      <van-dropdown-menu>
        <van-dropdown-item v-model="selectedCategory" :options="categories"></van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <!-- 分类下拉菜单 -->

    <!-- 兼职内容 -->

    <div style="padding-top: 10px">
      <transition-group mode="out-in">
        <div v-for="(item, index) in data"
             :key="item.positionId"
             style="padding-top: 3px;transition: all 1s;display: inline-block; width: 100%">
          <van-card @click="onClickCard(item)">
            <div class="shine" slot="title" style="font-weight: 700; font-size: 15px">
              {{item.positionName}}
            </div>

            <div slot="desc" style="padding-top: 5px">
              {{item.positionAddress}}
              <br>
              {{item.positionDesc}}
            </div>

            <div slot="tags" style="padding-top: 5px">
              <van-tag plain type="primary" v-for="c in item.categoryList" :key="c.categoryId">
                {{c.categoryName}}
              </van-tag>

              <van-tag plain type="danger">
                {{item.positionClearingWayStr}}
              </van-tag>
              <van-tag mark type="danger">
                {{item.positionMoney}}
              </van-tag>
            </div>

            <div slot="num">
              还需要
              <span style="color: red">{{item.positionPeopleNum?item.positionPeopleNum:0}}</span>
              人
            </div>
          </van-card>
        </div>
      </transition-group>

      <van-popup
        v-model="showCurrentData"
        round
        position="bottom"
        :style="{ height: '70%' }">
      </van-popup>
    </div>
    <!-- 兼职内容 -->

    <!-- 分页 -->
    <div style="bottom: 50px; position: fixed; width: 100%">
      <van-pagination
        v-model="currentPage"
        :page-count="totalPage"
        mode="simple"
        @change="onPageChange"
      >
      </van-pagination>
    </div>
    <!-- 分页 -->
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

        currentPage: 0,
        totalPage: 1,
        size: 5,

        data: [],
        currentData: {},
        showCurrentData: false,
      }
    },
    methods: {
      onClickCard(item) {
        this.showCurrentData = true;
        console.log(item);
        // todo
      },
      onPageChange() {
        this.getData();
      },
      // 获取兼职信息
      getData() {
        // 获取兼职信息
        getPositionList({
          page: this.currentPage - 1,
          size: this.size,
          openId: this.$store.state.userInfo.openId
        }).then(res => {
          if (res.code === 14) {  // 如果是学生用户，没有完善简历
            // 跳转到完善简历页面
            this.$router.push({
              path: '/NewUser/Resume',
              query: {
                openId: this.$route.query["openId"]
              }
            });
          } else {  // 保存数据
            this.currentPage = res.data.currentPage + 1;
            this.totalPage = res.data.totalPage;
            this.size = res.data.size;
            this.data = res.data.data;
            console.log(res.data);
          }
        });
      },
    },
    mounted() {
      this.$store.commit('setActiveTabBar', 'PartTimeJob');

      this.$store.dispatch('updateUserInfo', localStorage.getItem('openId')).then((res) => {
        this.getData();
      });

      // 获取兼职分类
      getPositionCategories().then(res => {
        res.data.forEach((item, index) => {
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

  .v-enter, .v-leave-to {
    opacity: 0;
    transform: translateY(200px);
  }

  .v-enter-active, .v-leave-active {
    transition: all 0.6s ease;
  }

  /*v-move 和 v-leave-active 配合使用，能够实现列表后续的元素，渐渐地漂上来的效果 */
  .v-move {
    transition: all 0.6s ease;
  }

  .v-leave-active {
    position: absolute;
  }

  .shake {
    animation: advert_nav-x 0.8s linear infinite;
    -moz-animation: advert_nav-x 0.8s linear infinite;
    /* Firefox */
    -webkit-animation: advert_nav-x 0.8s ease-in-out infinite;
    /* Safari Chrome */
    -o-animation: advert_nav-x 0.8s linear infinite;
  }

  .shine {
    animation: advert_nav-m 20s linear infinite;
    -moz-animation: advert_nav-m 20s linear infinite;
    /* Firefox */
    -webkit-animation: advert_nav-m 20s linear infinite;
    /* Safari Chrome */
    -o-animation: advert_nav-m 20s linear infinite;
    animation-direction: alternate;
  }

  /* advert_avatar */
  .advert_avatar {
    animation: advert_nav-m 20s linear infinite;
    -moz-animation: advert_nav-m 20s linear infinite;
    /* Firefox */
    -webkit-animation: advert_nav-m 20s linear infinite;
    /* Safari Chrome */
    -o-animation: advert_nav-m 20s linear infinite;
    animation-direction: alternate;
  }

  .advert_avatar:hover {
    animation: advert_nav-x 0.3s linear infinite;
    -moz-animation: advert_nav-x 0.3s linear infinite;
    /* Firefox */
    -webkit-animation: advert_nav-x 0.3s ease-in-out infinite;
    /* Safari Chrome */
    -o-animation: advert_nav-x 0.3s linear infinite;
  }

  .advert_avatar p a img:hover {
    animation: advert_nav-a 1s linear infinite;
    -moz-animation: advert_nav-a 1s linear infinite;
    /* Firefox */
    -webkit-animation: advert_nav-a 1s linear infinite;
    /* Safari Chrome */
    -o-animation: advert_nav-a 1s linear infinite;
  }

  .advert_avatar p {
    color: #fff;
    margin-bottom: 0;
  }

  .advert_avatar p a img {
    color: #9a9da0;
    text-decoration: none;
    display: block;
  }

  @keyframes advert_nav-m {
    10% {
      color: #ff9292;
    }
    20% {
      color: #f09eff;
    }
    30% {
      color: #9397ff;
    }
    40% {
      color: #9fb8ff;
    }
    50% {
      color: #9fd7ff;
    }
    60% {
      color: #9fffd2;
    }
    70% {
      color: #dfff9f;
    }
    80% {
      color: #ffd49f;
    }
    90% {
      color: #ffc29f;
    }
    100% {
      color: #ffa198;
    }
  }

  @keyframes advert_nav-x {
    10% {
      -webkit-transform: translate(-0.5px, 1.5px) rotate(0.5deg);
      border-color: #ffbebe;
    }
    20% {
      -webkit-transform: translate(-0.5px, 1.5px) rotate(-0.5deg);
      border-color: #ffdebe;
    }
    30% {
      -webkit-transform: translate(-2.5px, -1.5px) rotate(0.5deg);
      border-color: #fff3be;
    }
    40% {
      -webkit-transform: translate(-2.5px, -2.5px) rotate(-1.5deg);
      border-color: #eeffbe;
    }
    50% {
      -webkit-transform: translate(1.5px, 1.5px) rotate(-1.5deg);
      border-color: #f3ffbe;
    }
    60% {
      -webkit-transform: translate(-2.5px, -0.5px) rotate(-0.5deg);
      border-color: #e9ffbe;
    }
    70% {
      -webkit-transform: translate(1.5px, -2.5px) rotate(-0.5deg);
      border-color: #d0ffbe;
    }
    80% {
      -webkit-transform: translate(0.5px, 1.5px) rotate(0.5deg);
      border-color: #beffde;
    }
    90% {
      -webkit-transform: translate(-2.5px, -0.5px) rotate(0.5deg);
      border-color: #beefff;
    }
    100% {
      -webkit-transform: translate(-0.5px, -0.5px) rotate(-1.5deg);
      border-color: #bed8ff;
    }
  }

  @keyframes advert_nav-a {
    10% {
      color: #ff9292;
    }
    20% {
      color: #f09eff;
    }
    30% {
      color: #9397ff;
    }
    40% {
      color: #9fb8ff;
    }
    50% {
      color: #9fd7ff;
    }
    60% {
      color: #9fffd2;
    }
    70% {
      color: #dfff9f;
    }
    80% {
      color: #ffd49f;
    }
    90% {
      color: #ffc29f;
    }
    100% {
      color: #ffa198;
    }
  }

</style>
