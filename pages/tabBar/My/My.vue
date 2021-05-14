<template>
  <view class="My-container">
    <view v-for="module in modules" :key="module.code" class="main-section">
      <view class="section-title">{{ module.title }}</view>
      <view class="section-ul">
        <view v-for="item in module.child" :key="item.code" class="section-li">
          <view class="section-item" @click="hanldeClick(item)">
            <image :src="keys[item.code].icon"></image>
            <view>{{ item.title }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
const keys = {
  // 劳务管理
  '1001': {
    icon: '../../../static/images/main/icon_1001.png',
    path: '../../myBasic/biaoDan/biaoDan'
  },
  '1002': {
    icon: '../../../static/images/main/icon_1002.png',
    path: '../../myBasic/myCalendar/myCalendar'
  },
  '1003': {
    icon: '../../../static/images/main/icon_1003.png',
    path: '../../myBasic/mySign/mySign'
  },
  '1004': {
    icon: '../../../static/images/main/icon_1004.png',
    path: '../../myBasic/myDownload/myDownload'
  },
  '1005': {
    icon: '../../../static/images/main/icon_1002.png',
    path: '../../myBasic/myEcharts/myEcharts'
  },
  // 项目管理
  '2001': {
    icon: '../../../static/images/main/icon_2001.png',
    path: '../../myBasic/myCall/myCall'
  },
  '2002': {
    icon: '../../../static/images/main/icon_2002.png',
    path: '../../myBasic/myUpdate/myUpdate'
  },
  '2003': {
    icon: '../../../static/images/main/icon_2003.png',
    path: '../../myBasic/myMonitor/myMonitor'
  },
  '2005': {
    icon: '../../../static/images/main/icon_2005.png',
    path: '../quality/skill/skill'
  },
  '2004': {
    icon: '../../../static/images/main/icon_2004.png',
    path: '../project/confirm/confirm'
  },
  // 模板
  '3001': {
    icon: '../../../static/images/main/icon_3001.png',
    path: '../../template/nav-button/nav-button'
  },
  '3002': {
    icon: '../../../static/images/main/icon_3002.png',
    path: '../../template/nav-dot/nav-dot'
  },
  '3003': {
    icon: '../../../static/images/main/icon_3003.png',
    path: '../../template/nav-city-dropdown/nav-city-dropdown'
  },
  '3004': {
    icon: '../../../static/images/main/icon_3004.png',
    path: '../../template/nav-search-input/nav-search-input'
  },
  '3005': {
    icon: '../../../static/images/main/icon_3005.png',
    path: '../../template/nav-transparent/nav-transparent'
  },
  '3006': {
    icon: '../../../static/images/main/icon_3006.png',
    path: '../../template/nav-image/nav-image'
  },
  '3007': {
    icon: '../../../static/images/main/icon_3007.png',
    path: '../../template/tabbar/tabbar'
  },
  '3008': {
    icon: '../../../static/images/main/icon_3007.png',
    path: '../../template/ucharts/ucharts'
  },

  '3009': {
    icon: '../../../static/images/main/icon_3006.png',
    path: '../../template/list2detail-list/list2detail-list'
  },
  '3010': {
    icon: '../../../static/images/main/icon_4002.png',
    path: '../../template/swiper-vertical/swiper-vertical'
  },
  '4003': {
    icon: '../../../static/images/main/icon_4003.png',
    path: '../machine/work-in/work-in'
  },
  '4004': {
    icon: '../../../static/images/main/icon_4004.png',
    path: '../machine/work-off/work-off'
  },
  '4005': {
    icon: '../../../static/images/main/icon_4005.png',
    path: '../machine/check-in/check-in'
  },
  '4006': {
    icon: '../../../static/images/main/icon_4006.png',
    path: '../machine/special-work/special-work'
  },
  '4007': {
    icon: '../../../static/images/main/icon_4007.png',
    path: '../machine/issue/issue'
  },
  '4008': {
    icon: '../../../static/images/main/icon_4008.png',
    path: '../machine/sign/sign'
  },
  '4009': {
    icon: '../../../static/images/main/icon_4008.png',
    path: '../machine/machine-plan/machine-plan'
  },

  // 安全管理
  '5001': {
    icon: '../../../static/images/main/icon_5001.png',
    path: '../safety/patrol-plan/new-plan/new-plan'
  },
  '5002': {
    icon: '../../../static/images/main/icon_5002.png',
    path: '../machine/machine-lease/machine-lease'
  },
  '5003': {
    icon: '../../../static/images/main/icon_5003.png',
    path: '../safety/safety-check/safety-check'
  },
  '5004': {
    icon: '../../../static/images/main/icon_5004.png',
    path: '../safety/question-list/question-list'
  },
  '5005': {
    icon: '../../../static/images/main/icon_5005.png',
    path: '../safety/question-list/question-list'
  },
  // 质量管理
  '6001': {
    icon: '../../../static/images/main/icon_6001.png',
    path: '../quality/patrol-plan/new-plan/new-plan'
  },
  '6002': {
    icon: '../../../static/images/main/icon_6003.png',
    path: '../quality/safety-check/safety-check'
  },
  '6003': {
    icon: '../../../static/images/main/icon_6004.png',
    path: '../quality/question-list/question-list'
  },
  '6004': {
    icon: '../../../static/images/main/icon_6005.png',
    path: '../quality/question-list/question-list'
  },
  '6005': {
    icon: '../../../static/images/main/icon_6002.png',
    path: '../quality/acceptance/acceptance'
  }
}
export default {
  data () {
    return {
      keys: keys,
      modules: [
        {
          title: '基础常用',
          code: '10',
          child: [
            {
              title: '表单',
              code: '1001'
            },
            {
              title: '日历',
              code: '1002'
            },
            {
              title: '签名',
              code: '1003'
            },
            {
              title: '下载',
              code: '1004'
            },
            {
              title: 'echarts',
              code: '1005'
            }
          ]
        },
        {
          title: '我的设置',
          code: '20',
          child: [
            {
              title: '电话',
              code: '2001'
            },
            {
              title: '检查更新',
              code: '2002'
            },
            {
              title: '监控',
              code: '2003'
            },
            {
              title: 'a',
              code: '2004'
            },
            {
              title: 'a',
              code: '2005'
            }
          ]
        },
        {
          title: '模板',
          code: '30',
          child: [
            {
              title: '导航栏按钮',
              code: '3001'
            },
            {
              title: '红点和角标',
              code: '3002'
            },
            {
              title: '带城市选择',
              code: '3003'
            },
            {
              title: '带搜索',
              code: '3004'
            },
            {
              title: '渐变',
              code: '3005'
            },
            {
              title: '带图片',
              code: '3006'
            },
            {
              title: '顶部选项卡',
              code: '3007'
            },
            {
              title: 'ucharts',
              code: '3008'
            },
            {
              title: '到详情',
              code: '3009'
            },
            {
              title: '划视频',
              code: '3010'
            }
          ]
        }
      ]
    }
  },
  onReady () {
    uni.setNavigationBarTitle({
      title: '个性化标题'
    })
  },
  methods: {
    hanldeClick(_item) {
      uni.navigateTo({
        url: keys[_item.code].path + '?title=' + _item.title
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../../../common/common.scss";
.My-container {
  background: #f1f1f1;
  width: 100%;
  .main-section {
    margin-bottom: 10rpx;
    background: #fff;
    overflow: hidden;
    .section-title {
      font-size: 36rpx;
      line-height: 80rpx;
      padding-left: 15rpx;
    }
    .section-ul {
      display: flex;
      flex-flow: row;
      flex-wrap: wrap;
      .section-li {
        width: 25%;
        margin-bottom: 30rpx;

        .section-item {
          text-align: center;
          margin: auto;

          image {
            width: 108rpx;
            height: 108rpx;
          }

          view {
            text-align: center;
            height: $font_h5;
            line-height: $font_h5;
            font-size: $font_h5;
            font-weight: 400;
            color: #000;
            margin-top: 10rpx;
          }
        }
      }
    }
  }
}
</style>
