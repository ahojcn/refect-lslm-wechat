<template>
  <div>
    <!-- 分类下拉菜单 -->
    <div>
      <van-dropdown-menu>
        <van-dropdown-item @change="onCategoriesChange" v-model="selectedCategory"
                           :options="categories"></van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <!-- 分类下拉菜单 -->

    <!-- 兼职内容 -->
    <div style="padding-top: 10px">
      <transition-group name="card" mode="out-in">
        <div v-for="(item, index) in data"
             :key="item.positionId"
             style="padding-top: 3px;transition: all 1s;display: inline-block; width: 100%">
          <van-card @click="onClickCard(item)">
            <div slot="title" style="font-weight: 700; font-size: 15px">
              {{item.positionName}}
              <span v-if="item.positionTop === 1" style="float: right">
                <van-icon name="fire-o" color="red"></van-icon>
              </span>
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
        closeable
        round
        position="bottom"
        :style="{ maxHeight: '90%', minHeight: '50%' }">
        <div style="padding: 20px;">
          <div>
            <span style="font-weight: 700; font-size: 20px;">
              {{currentData.positionName}}
            </span>

            <div style="padding-top: 10px;">
              <van-tag size="large" plain type="danger">
                招{{currentData.positionPeopleNum}}人
              </van-tag>
              <van-tag size="large" plain type="danger">
                {{currentData.positionClearingWayStr}}
              </van-tag>
              <van-tag size="large" mark type="danger">
                {{currentData.positionMoney}}
              </van-tag>

              <span style="float: right; color: #9a9da0">
                {{currentData.positionBrowse}}次浏览
              </span>
            </div>

            <div style="padding-top: 10px; color: #9a9da0">
              <span v-for="c in currentData.categoryList" :key="c.categoryId">
                {{c.categoryName}}
              </span>
              <p style="text-align: center">
                {{new Date(currentData.createTime).toLocaleDateString()}}
              </p>
            </div>
          </div>

          <!-- 工作内容 -->
          <div>
            <p style="font-size: 17px;">
              <van-icon name="flag-o"></van-icon>
              工作内容
            </p>
            <span style="color: #9a9da0">
              {{currentData.positionDesc}}
            </span>
          </div>

          <!-- 工作地点 -->
          <div>
            <p style="font-size: 17px;">
              <van-icon name="location-o"></van-icon>
              工作地点
            </p>
            <span style="color: #9a9da0">
              {{currentData.positionAddress}}
            </span>
          </div>

          <!-- 机构信息 -->
          <div>
            <p style="font-size: 17px;">
              <van-icon name="phone-o"></van-icon>
              机构信息
            </p>
            <span style="color: #9a9da0">
              {{currentData.positionCompanyName}}
              <a style="color: #000000" :href="'tel:' + currentData.positionPhone">
                <van-icon name="service"></van-icon>咨询
              </a>
            </span>
          </div>

          <!-- 报名 / 分享按钮 -->
          <div style="padding-top: 40px">
            <van-row>
              <van-col span="12">
                <!-- todo -->
                <van-button @click="onClickShareJob" size="large" type="primary" plain hairline block>
                  分享岗位
                </van-button>
              </van-col>
              <van-col span="12">
                <van-button @click="onSubmit" size="large" type="primary" block>
                  我要报名
                </van-button>
              </van-col>
            </van-row>
            <p style="color: darkorange;">
              Tips：凡涉及到工作内容不符，收费、违法信息传播的工作，请您警惕并收集相关证据向我们举报。
            </p>
          </div>
        </div>
      </van-popup>

      <div v-if="totalPage===0 && data.length === 0">
        <p style="text-align: center; font-size: 20px">
          <van-icon name="fail"></van-icon>
          <br>
          暂无此类兼职
        </p>
      </div>
    </div>
    <!-- 兼职内容 -->

    <!-- 发布兼职按钮 只有企业用户才显示 -->
    <div v-if="Object.keys($store.state.companyInfo).length !== 0"
         style="position: fixed; bottom: 10%; padding-left: 75%">
      <van-button type="primary" color="#33CCFF" icon="plus" round to="/PartTimeJob/Create">
        发布
      </van-button>
    </div>
    <!-- 发布兼职按钮 -->

    <!-- 分页 -->
    <div class="animated fadeInUpBig" style="padding-top: 20px">
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
  import {getPositionList, addBrowse, applyStudentPosition} from '@/api/student';

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
      // 当点击 card
      onClickCard(item) {
        this.currentData = item;
        this.showCurrentData = true;

        addBrowse({
          positionId: item.positionId
        }).then(res => {
          // pass
          if (res.code === 0) {
            this.currentData.positionBrowse += 1;
          }
        }).catch(err => {
          // pass
        });
      },
      // 当类别下拉菜单选项改变
      onCategoriesChange(val) {
        this.getData();
      },
      // 当分页发生改变
      onPageChange() {
        this.getData();
      },
      // 获取兼职信息
      getData() {
        // 获取兼职信息
        getPositionList({
          tag: this.selectedCategory,
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
          }
        });
      },
      // 报名兼职
      onSubmit() {
        applyStudentPosition({
          openId: localStorage.getItem('openId'),
          positionId: this.currentData.positionId
        }).then(res => {
          if (res.code === 0) {
            this.$toast.success('报名成功');
            this.showCurrentData = false;
          }
        });
      },
      // 当点击分享按钮
      onClickShareJob() {
        this.$toast('开发中\n敬请期待')
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

  .card-enter, .card-leave-to {
    opacity: 0;
    transform: translateY(200px);
  }

  .card-enter-active, .card-leave-active {
    transition: all 0.6s ease;
  }

  /*v-move 和 v-leave-active 配合使用，能够实现列表后续的元素，渐渐地漂上来的效果 */
  .card-move {
    transition: all 0.6s ease;
  }

  .card-leave-active {
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
