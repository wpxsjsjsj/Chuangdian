<template>
  <div class="custom-tab-bar">
      <div v-for="(item, index) in filteredList" :key="index" @click="switchTab(item,index)" class="tab-item">
        <img :src="initCurrIndex == index ? item.selectedIconPath : item.iconPath" alt="icon">
        <span :class="{ 'selected': initCurrIndex == index }">{{ item.text }}</span>
      </div>
    </div>
	
	<!-- 用来占位，防止被自定义内容挡住 -->
	<div class="zhanwei" style="width: 100%;height: 60px"></div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      list: [
        {
          pagePath: "pages/main/main",
          iconPath: "static/tabs/tab1_uncheck.png",
          selectedIconPath: "static/tabs/tab1_check.png",
          text: "首页",
        },
        {
          pagePath: "pages/scene/scene",
          iconPath: "static/tabs/tab2_uncheck.png",
          selectedIconPath: "static/tabs/tab2_check.png",
          text: "场景",
        },
        {
          pagePath: "pages/shop/shop",
          iconPath: "static/tabs/tab3_uncheck.png",
          selectedIconPath: "static/tabs/tab3_check.png",
          text: "商城",
        },
        {
          pagePath: "pages/mine/mine",
          iconPath: "static/tabs/tab4_uncheck.png",
          selectedIconPath: "static/tabs/tab4_check.png",
          text: "我的",
        },
      ]
    };
  },
  computed: {
    filteredList() {
	  let userinfo = uni.getStorageSync('userinfo')
	  console.log('过滤个人中心数组',userinfo.group_id)
      // Filter the list based on user permissions
      return this.list.filter((item, index) => {
        if (item.pagePath === "pages/main/main" || item.pagePath === "pages/scene/scene") {
          // Check if the user has special permissions
          return userinfo.group_id == 2;
        } else {
          return true; // Display other tabs to all users
        }
      });
    },
  },
  methods: {
	switchTab(item, index) {
	  // if(this.currentIndex == index) return
      // Handle tab switching logic here
      // Navigate to the selected page using uniapp's navigation API
      uni.switchTab({
        url: "/" + item.pagePath,
      });
	  // setTimeout(()=>{
		 //  this.currentIndex = index;
		 //  console.log('切换路由',this.type,item)
	  // },1000)
    },
  },
  props: {
	  initCurrIndex: {
		  type: String,
		  default: '0'
	  }
  }
};
function getCurrentPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}
</script> 

<style>
/* Add your styles here */
.custom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px; /* 根据需要调整高度 */
  background-color: #fff; /* 设置背景颜色 */
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1); /* 添加分隔的阴影 */
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666; /* 设置默认文字颜色 */
  font-size: 12px; /* 调整字体大小 */
}

.tab-item img {
  width: 24px; /* 调整图标大小 */
  height: 24px; /* 调整图标大小 */
}

.tab-item span {
  margin-top: 5px; /* 调整图标和文字之间的间距 */
}

.tab-item.selected {
  color: #07c160; /* 设置选中时文字颜色 */
}
</style>