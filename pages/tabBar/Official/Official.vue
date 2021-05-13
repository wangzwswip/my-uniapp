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
    path: '../material/storehouse/storehouse'
  },
  '3008': {
    icon: '../../../static/images/main/icon_3007.png',
    path: '../material/new-apply/apply/apply'
  },

  // 机械管理
  '4001': {
    icon: '../../../static/images/main/icon_4001.png',
    path: '../machine/machine-plan/new-plan/new-plan'
  },
  '4002': {
    icon: '../../../static/images/main/icon_4002.png',
    path: '../machine/machine-lease/machine-lease'
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
              title: '盘库登记',
              code: '3007'
            }
          ]
        },
        {
          title: '接口',
          code: '40',
          child: [
            {
              title: '机械计划',
              code: '4001'
            },
            {
              title: '计划审批',
              code: '4009'
            },
            {
              title: '机械租赁',
              code: '4002'
            },
            {
              title: '上岗报备',
              code: '4003'
            },
            {
              title: '离岗记录',
              code: '4004'
            },
            {
              title: '进场检验',
              code: '4005'
            },
            {
              title: '特种人员登记',
              code: '4006'
            },
            {
              title: '机械问题',
              code: '4007'
            },
            {
              title: '台班签认',
              code: '4008'
            }
          ]
        },
        {
          title: '接口',
          code: '50',
          child: [
            {
              title: '导航栏',
              code: '5001'
            },
            {
              title: '安全检查',
              code: '5003'
            },
            {
              title: '问题整改',
              code: '5004'
            },
            {
              title: '整改验收',
              code: '5005'
            }
          ]
        },
        {
          title: '质量管理',
          code: '60',
          child: [
            {
              title: '质量计划',
              code: '6001'
            },
            {
              title: '质量检查',
              code: '6002'
            },
            {
              title: '问题整改',
              code: '6003'
            },
            {
              title: '整改验收',
              code: '6004'
            },
			{
        title: '质量验收',
        code: '6005'
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
