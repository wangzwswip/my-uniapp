<template>
  <view class="panel-wrap device-video__wrap">
    <view class="panel-content">
      <view class="device-item-wrap">
        <view class="device-item" v-for="item in list" :key="item.id" @tap="handleDetail(item)">
          <image mode="aspectFill" :src="defaultImg" @error="handleError"></image>
          <view class="title">
            <image src="../../../static/images/img_rank2.png" mode="scaleToFill"></image>
            {{ item.name }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list: [{ deviceName: 'a' }, { deviceName: 'b' }],
      defaultImg: '/static/images/list_no_image.png'
    }
  },
  mounted () {
  },
  methods: {
    handleError (e) {
      console.log(e)
      // #ifdef APP-PLUS
      this.currentSrc = this.defaultImg
      // #endif
    },
    handleDetail (_item) {
      uni.navigateTo({
        url: '/pages/myBasic/myMonitor/video'
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/common/common.scss";

.device-video__wrap {
  .panel-list-ul-more {
    border-top: none;
  }

  .device-item-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .device-item {
      margin-bottom: 30upx;
      border-radius: 20upx;
      overflow: hidden;
      width: 48%;

      .title {
        font-size: $font_h4;
        color: rgba(0, 0, 0, 0.7);
        height: 60upx;
        line-height: 60upx;
        display: flex;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        image {
          margin-right: 10upx;
          height: 30upx;
          width: 30upx;
        }
      }

      image {
        width: 100%;
        height: 200upx;
        border-radius: 20upx;
      }
    }
  }
}
</style>
