<template>
  <view class="video-detail__wrap">
    <view>
      <video src="http://cmgw-vpc.lechange.com:8888/LCO/3K06F20PAG01126/0/0/20210512T074611/d74f0932791fdde581fc535e7d06dc2d.m3u8"
        @error="videoErrorCallback"
        controls="false"
        :show-play-btn="false">
      </video>
    </view>
    <view class="panel-wrap video-detail-info">
      <view class="panel-content">
        <contentTab :tabs="tabs"
                    :defaultAction="action"
                    @handle-tap="handleTabTap">
        </contentTab>

        <view class="video-info"
              v-if="action === 0">
          <view class="uni-list-ul">
            <view class="uni-list-li">
              <view class="uni-list-name">
                <view class="uni-list-icon">{{ options.name }} | {{ options.status | videoStatus }}</view>
              </view>
              <view class="uni-list-content">
                <view>序列号：{{ options.serial }}</view>
                <view>通道号：{{ options.channel }}</view>
              </view>
            </view>
          </view>
        </view>
        <video-controller :options="options"></video-controller>
      </view>
    </view>
  </view>
</template>

<script>
import contentTab from '../../../components/common/content-tab'
import videoController from '../../../components/common/video-controller.vue'
export default {
  components: {
    contentTab,
    videoController
  },
  data () {
    return {
      options: {
        src: '',
        name: '摄像头一',
        serial: '223324',
        channel: '21323'
      },
      tabs: [
        {
          title: '基本信息'
        }
      ],
      action: 0
    }
  },
  onLoad (_options) {
    // this.options = _options
    // this.getVideoDetail(_options.id)
  },
  methods: {
    videoErrorCallback () {
      uni.showToast({
        icon: 'none',
        title: '视频播放错误...'
      })
    },
    handleTabTap (_params) {
      this.action = _params.index
    },
    getVideoDetail (_id) {
      this.$moint.getVideoDetail(_id).then(res => {
        this.info = res

        if (res.form === 2) {
          this.tabs.push({
            title: '云台控制'
          })
        }
      })
    }
  },
  filters: {
    videoStatus (_v) {
      return ['未使用', '使用中', '已过期', '已暂停'][_v]
    }
  }
}
</script>

<style lang="scss">
@import "@/common/common.scss";
.video-detail__wrap {
  background: #f7f7f7;
  video {
    width: 750upx;
  }

  .video-detail-info {
    margin-top: 10upx;

    .list-status {
      width: auto !important;
      padding: 0 10upx;
    }
  }
}
</style>
