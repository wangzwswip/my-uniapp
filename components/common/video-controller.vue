<template>
  <view class="video-controller__wrap">
    <view class="controls-wrap">
      <view class="cont-left">
        <view class="rocker-wrap">
          <view :class="item.class"
                v-for="item in rockers"
                :key="item.command"
                @touchstart="cameraControlBegin(item.command)"
                @touchcancel="cameraControlEnd(item.command)"
                @touchend="cameraControlEnd(item.command)">
            <image v-if="item.image"
                   :src="item.image"
                   mode="scaleToFill"></image>
          </view>
        </view>
      </view>

      <view class="cont-right">
        <view class="buttons-wrap"
              v-for="item in buttons"
              :key="item.name">
          <text>{{ item.name }}</text>
          <view class="button-group-wrap">
            <view @touchstart="cameraControlBegin(item._add)"
                  @touchcancel="cameraControlEnd(item._add)"
                  @touchend="cameraControlEnd(item._add)">
              <image src="/static/images/monitor/video/icon_add.png"
                     mode="scaleToFill"></image>
            </view>
            <view @touchstart="cameraControlBegin(item._reduce)"
                  @touchcancel="cameraControlEnd(item._reduce)"
                  @touchend="cameraControlEnd(item._reduce)">
              <image src="/static/images/monitor/video/icon_reduc.png"
                     mode="scaleToFill"></image>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="uni-form">
      <view class="uni-form-item">
        <view class="title">速度</view>
        <view class="item">
          <slider :value="speed"
                  min="0"
                  max="2"
                  @change="sliderChange"
                  :show-value="true"
                  step="1"
                  activeColor="#03a9f4"
                  backgroundColor="#ebf7fc"
                  block-color="#03a9f4"
                  block-size="20" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    options: [Object]
  },
  data () {
    return {
      speed: 0,
      rockers: [
        {
          command: '-1',
          class: 'rocker-center',
          image: ''
        },
        {
          command: '0',
          class: 'rocker-top',
          image: '/static/images/monitor/video/icon_t.png'
        },
        {
          command: '1',
          class: 'rocker-bottom',
          image: '/static/images/monitor/video/icon_b.png'
        },
        {
          command: '2',
          class: 'rocker-left',
          image: '/static/images/monitor/video/icon_l.png'
        },
        {
          command: '3',
          class: 'rocker-right',
          image: '/static/images/monitor/video/icon_r.png'
        }
      ],
      buttons: [
        {
          name: '缩放',
          _add: '8',
          _reduce: '9'
        },
        // {
        //   name: '光圈',
        //   _add: '15',
        //   _reduce: '16'
        // },
        {
          name: '聚焦',
          _add: '10',
          _reduce: '11'
        }
      ]
    }
  },
  methods: {
    sliderChange (e) {
      uni.vibrateShort({
        success: () => {
          console.log('success')
        }
      })
      this.speed = e.detail.value
      console.log('value 发生变化：' + e.detail.value)
    },
    /* handleButton(_command) {
      uni.vibrateShort({
        success: () => {
          console.log('success')
        }
      })
      this.cameraControlSingle(_command)
    },
    handleRocker(_command) {
      uni.vibrateShort({
        success: () => {
          console.log('success')
        }
      })

      this.cameraControlSingle(_command)
    },
    cameraControlSingle(_command) {
      this.$moint
        .cameraControlSingle({
          command: _command,
          ip: this.ip,
          speed: this.speed
        })
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          console.log(e)
          uni.showToast({
            icon: 'none',
            title: '网络请求出错...'
          })
        })
    }, */
    cameraControlBegin (_command) {
      if (_command === '-1') return
      let params =
        'accessToken=' + this.options.token + '&deviceSerial=' + this.options.serial + '&channelNo=' + this.options.channel + '&speed=' + this.speed + '&direction=' + _command
      this.$moint
        .cameraControlBegin(params)
        .then(res => { })
        .catch(e => {
          console.log(e)
        })
    },
    cameraControlEnd (_command) {
      if (_command === '-1') return
      let params = 'accessToken=' + this.options.token + '&deviceSerial=' + this.options.serial + '&channelNo=' + this.options.channel + '&direction=' + _command
      this.$moint
        .cameraControlEnd(params)
        .then(res => { })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="scss">
@import "@/common/common.scss";
.video-controller__wrap {
  .controls-wrap {
    padding: 100upx 0;
    display: flex;
    .cont-left {
      flex: 1;
    }

    .cont-right {
      width: 320upx;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      .buttons-wrap {
        display: flex;
        line-height: 80upx;
        text-align: center;
        text {
          flex: 1;
          color: rgba($color: #000000, $alpha: 0.6);
          font-size: $font_h5;
        }

        .button-group-wrap {
          border-radius: 80upx;
          overflow: hidden;
          display: flex;
          view {
            height: 80upx;
            width: 100upx;
            background: #ebf7fc;
            font-size: $font_h1;
            font-weight: bold;
            // color: #03a9f4;
            border-right: 1upx solid #fff;
            &:last-child {
              border-right: 0;
            }
            &:active {
              background: #f2f2f2;
            }

            image {
              width: 30upx;
              height: 30upx;
            }
          }
        }
      }
    }
  }

  .rocker-wrap {
    position: relative;
    height: 300upx;
    width: 300upx;
    background: #ebf7fc;
    border-radius: 300upx;
    overflow: hidden;

    view {
      position: absolute;
      width: 100upx;
      height: 100upx;
      line-height: 100upx;
      text-align: center;
      font-size: $font_h1;
      border-radius: 100upx;
      font-weight: bold;
      color: #03a9f4;
      &:active {
        background: #f2f2f2;
      }

      image {
        width: 30upx;
        height: 30upx;
      }
    }

    .rocker-center {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 80upx;
      z-index: 1;
      width: 80upx;
      height: 80upx;
      line-height: 80upx;
      border: 10upx solid #fff;
      background: #ebf7fc;
    }

    .rocker-top {
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
    }

    .rocker-bottom {
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
    }

    .rocker-left {
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
    }

    .rocker-right {
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
    }
  }

  .uni-form {
    padding: 0;
    .title {
      padding: 0;
      width: 70upx;
      font-size: $font_h5;
      color: rgba($color: #000000, $alpha: 0.6);
    }

    .item {
      padding: 0;
    }

    slider {
      margin-right: 0;
      width: 100%;
    }
  }
}
</style>
