<template>
  <view class="Official-container">
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
  // 
  '1001': {
    icon: '../../../static/images/main/icon_1001.png',
    path: '../../official/scrollView/scrollView'
  },
  '1002': {
    icon: '../../../static/images/main/icon_1002.png',
    path: '../../official/mySwiper/mySwiper'
  },
  '1003': {
    icon: '../../../static/images/main/icon_1002.png',
    path: '../../official/movable-view/movable-view'
  },
  '1004': {
    icon: '../../../static/images/main/icon_1002.png',
    path: '../../official/cover-view/cover-view'
  },
  '1005': {
    icon: '../../../static/images/main/icon_1002.png',
    path: '../../official/rich-text/rich-text'
  },
  // 项目管理
  '2001': {
    icon: '../../../static/images/main/icon_2001.png',
    path: '../../official/normal-form/normal-form'
  },
  '2002': {
    icon: '../../../static/images/main/icon_2002.png',
    path: '../../official/input/input'
  },
  '2003': {
    icon: '../../../static/images/main/icon_2003.png',
    path: '../../official/picker/picker'
  },
  '2004': {
    icon: '../../../static/images/main/icon_2004.png',
    path: '../../official/editor/editor'
  },
  '2005': {
    icon: '../../../static/images/main/icon_2005.png',
    path: '../../official/video/video'
  },
  '2006': {
    icon: '../../../static/images/main/icon_2005.png',
    path: '../../official/audio/audio'
  },
  '2007': {
    icon: '../../../static/images/main/icon_2003.png',
    path: '../../official/web-view/web-view'
  },
  // 物料管理
  '3001': {
    icon: '../../../static/images/main/icon_3001.png',
    path: '../../API/set-navigation-bar-title/set-navigation-bar-title'
  },
  '3002': {
    icon: '../../../static/images/main/icon_3002.png',
    path: '../../API/pull-down-refresh/pull-down-refresh'
  },
  '3003': {
    icon: '../../../static/images/main/icon_3003.png',
    path: '../../API/animation/animation'
  },
  '3004': {
    icon: '../../../static/images/main/icon_3004.png',
    path: '../../API/get-node-info/get-node-info'
  },
  '3005': {
    icon: '../../../static/images/main/icon_3005.png',
    path: '../../API/action-sheet/action-sheet'
  },
  '3006': {
    icon: '../../../static/images/main/icon_3006.png',
    path: '../../API/modal/modal'
  },
  '3007': {
    icon: '../../../static/images/main/icon_3007.png',
    path: '../../API/device/device'
  },
  '3008': {
    icon: '../../../static/images/main/icon_3007.png',
    path: '../material/new-apply/apply/apply'
  },

  // 机械管理
  '4001': {
    icon: '../../../static/images/main/icon_4001.png',
    path: '../../API/request/request'
  },
  '4002': {
    icon: '../../../static/images/main/icon_4002.png',
    path: '../../API/websocket/websocket'
  },
  '4003': {
    icon: '../../../static/images/main/icon_4003.png',
    path: '../../API/media/media'
  },
  '4004': {
    icon: '../../../static/images/main/icon_4004.png',
    path: '../../API/location/location'
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
    path: '../../extUI/badge/badge'
  },
  '5002': {
    icon: '../../../static/images/main/icon_5002.png',
    path: '../../extUI/calendar/calendar'
  },
  '5003': {
    icon: '../../../static/images/main/icon_5003.png',
    path: '../../extUI/card/card'
  },
  '5004': {
    icon: '../../../static/images/main/icon_5004.png',
    path: '../../extUI/collapse/collapse'
  },
  '5005': {
    icon: '../../../static/images/main/icon_5005.png',
    path: '../../extUI/combox/combox'
  },
  '5006': {
    icon: '../../../static/images/main/icon_5005.png',
    path: '../../extUI/countdown/countdown'
  },
  '5007': {
    icon: '../../../static/images/main/icon_5005.png',
    path: '../../extUI/data-checkbox/data-checkbox'
  },
  '5008': {
    icon: '../../../static/images/main/icon_6001.png',
    path: '../../extUI/data-picker/data-picker'
  },
  '5009': {
    icon: '../../../static/images/main/icon_6003.png',
    path: '../../extUI/date-picker/date-picker'
  },
  '5010': {
    icon: '../../../static/images/main/icon_6004.png',
    path: '../../extUI/dateformat/dateformat'
  },
  '5011': {
    icon: '../../../static/images/main/icon_6005.png',
    path: '../../extUI/datatime-picker/datatime-picker'
  },
  '5012': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/drawer/drawer'
  },
  '5013': {
    icon: '../../../static/images/main/icon_6002.png',
    path: '../../extUI/easyinput/easyinput'
  },
  '5014': {
    icon: '../../../static/images/main/icon_7002.png',
    path: '../../extUI/fab/fab'
  },
  '5015': {
    icon: '../../../static/images/main/icon_6002.png',
    path: '../../extUI/fav/fav'
  },
  '5016': {
    icon: '../../../static/images/main/icon_6002.png',
    path: '../../extUI/file-picker/file-picker'
  },
  '5017': {
    icon: '../../../static/images/main/icon_4001.png',
    path: '../../extUI/forms/forms'
  },
  '5018': {
    icon: '../../../static/images/main/icon_6002.png',
    path: '../../extUI/goods-nav/goods-nav'
  },
  '5019': {
    icon: '../../../static/images/main/icon_4002.png',
    path: '../../extUI/icons/icons'
  },
  '5020': {
    icon: '../../../static/images/main/icon_3002.png',
    path: '../../extUI/indexed-list/indexed-list'
  },
  '5021': {
    icon: '../../../static/images/main/icon_7005.png',
    path: '../../extUI/link/link'
  },
  '5022': {
    icon: '../../../static/images/main/icon_6002.png',
    path: '../../extUI/list/list'
  },
  '5023': {
    icon: '../../../static/images/main/icon_7003.png',
    path: '../../extUI/load-more/load-more'
  },
  '5024': {
    icon: '../../../static/images/main/icon_7002.png',
    path: '../../extUI/nav-bar/nav-bar'
  },
  '5025': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/notice-bar/notice-bar'
  },
  '5026': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/number-box/number-box'
  },
  '5027': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/pagination/pagination'
  },
  '5028': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/popup/popup'
  },
  '5029': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/rate/rate'
  },
  '5030': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/row/row'
  },
  '5031': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/search-bar/search-bar'
  },
  '5032': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/segmented-control/segmented-control'
  },
  '5033': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/steps/steps'
  },
  '5034': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/swipe-action/swipe-action'
  },
  '5035': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/swiper-dot/swiper-dot'
  },
  '5036': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/table/table'
  },
  '5037': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/tag/tag'
  },
  '5038': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/title/title'
  },
  '5039': {
    icon: '../../../static/images/main/icon_7001.png',
    path: '../../extUI/transition/transition'
  }
}
export default {
  data () {
    return {
      keys: keys,
      modules: [
        {
          title: '内置组件',
          code: '10',
          child: [
            {
              title: '区域滚动',
              code: '1001'
            },
            {
              title: '轮播',
              code: '1002'
            },
            {
              title: '拖动',
              code: '1003'
            },
            {
              title: '覆盖',
              code: '1004'
            },
            {
              title: '富文本',
              code: '1005'
            }
          ]
        },
        {
          title: '表单',
          code: '20',
          child: [
            {
              title: '常用',
              code: '2001'
            },
            {
              title: '输入框',
              code: '2002'
            },
            {
              title: '选择',
              code: '2003'
            },
            {
              title: '编辑器',
              code: '2004'
            },
            {
              title: '视频',
              code: '2005'
            },
            {
              title: '音频',
              code: '2006'
            },
            {
              title: '网页',
              code: '2007'
            }
          ]
        },
        {
          title: '接口',
          code: '30',
          child: [
            {
              title: '导航栏',
              code: '3001'
            },
            {
              title: '下拉刷新',
              code: '3002'
            },
            {
              title: '动画',
              code: '3003'
            },
            {
              title: '节点信息',
              code: '3004'
            },
            {
              title: '操作菜单',
              code: '3005'
            },
            {
              title: '弹窗',
              code: '3006'
            },
            {
              title: '设备信息',
              code: '3007'
            }
          ]
        },
        {
          title: '网络',
          code: '40',
          child: [
            {
              title: '请求',
              code: '4001'
            },
            {
              title: 'websocket',
              code: '4002'
            },
            {
              title: '媒体',
              code: '4003'
            },
            {
              title: '位置',
              code: '4004'
            }
            // {
            //   title: '进场检验',
            //   code: '4005'
            // },
            // {
            //   title: '特种人员登记',
            //   code: '4006'
            // },
            // {
            //   title: '机械问题',
            //   code: '4007'
            // },
            // {
            //   title: '台班签认',
            //   code: '4008'
            // }
          ]
        },
        {
          title: '扩展组件',
          code: '50',
          child: [
            {
              title: '角标',
              code: '5001'
            },
            {
              title: '日历',
              code: '5002'
            },
            {
              title: '卡片',
              code: '5003'
            },
            {
              title: '折叠面板',
              code: '5004'
            },
            {
              title: '组合框',
              code: '5005'
            },
            {
              title: '倒计时',
              code: '5006'
            },
            {
              title: '数据选择器',
              code: '5007'
            },
            {
              title: '级联选择',
              code: '5008'
            },
            {
              title: '日期选择',
              code: '5009'
            },
            {
              title: '日期格式化',
              code: '5010'
            },
            {
              title: '时间选择',
              code: '5011'
            },
            {
              title: '抽屉',
              code: '5012'
            },
            {
              title: '输入框',
              code: '5013'
            },
            {
              title: '悬浮按钮',
              code: '5014'
            },
            {
              title: '收藏按钮',
              code: '5015'
            },
            {
              title: '文件上传',
              code: '5016'
            },
            {
              title: '表单',
              code: '5017'
            },
            {
              title: '商品导航',
              code: '5018'
            },
            {
              title: 'icons',
              code: '5019'
            },
            {
              title: '分类列表',
              code: '5020'
            },
            {
              title: '超链接',
              code: '5021'
            },
            {
              title: '列表',
              code: '5022'
            },
            {
              title: '加载',
              code: '5023'
            },
            {
              title: '导航栏',
              code: '5024'
            },
            {
              title: '通告栏',
              code: '5025'
            },
            {
              title: '输入框',
              code: '5026'
            },
            {
              title: '分页器',
              code: '5027'
            },
            {
              title: '弹出层',
              code: '5028'
            },
            {
              title: '评分',
              code: '5029'
            },
            {
              title: '行布局',
              code: '5030'
            },
            {
              title: '搜索栏',
              code: '5031'
            },
            {
              title: '分段器',
              code: '5032'
            },
            {
              title: '步骤条',
              code: '5033'
            },
            {
              title: '滑动',
              code: '5034'
            },
            {
              title: '轮播图',
              code: '5035'
            },
            {
              title: '表格',
              code: '5036'
            },
            {
              title: '标签',
              code: '5037'
            },
            {
              title: '标题',
              code: '5038'
            },
            {
              title: '过渡',
              code: '5039'
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
      console.log('带你记录', _item);
      uni.navigateTo({
        url: keys[_item.code].path + '?title=' + _item.title
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../../../common/common.scss";
.Official-container {
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
