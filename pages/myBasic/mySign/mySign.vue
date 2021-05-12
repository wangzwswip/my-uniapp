<template>
  <view class="labor-temporary-wrap">
    <view class="uni-form">
      <view class="uni-form-item uni-form-item-image">
        <view class="title">签字</view>
        <view class="item" @tap="showCanvas(index)">
          <image :src="image" mode="aspectFit" v-if="image"></image>
          <view class="sign-box" v-else>点我签名</view>
        </view>
        <uni-popup ref="showCanvas" type="center" :mask-click="false">
          <view class="uni-tip">
            <view class="uni-tip-head">
              <text class="left">签名</text>
              <text class="right" @tap="clear">清空</text>
            </view>
            <canvas class="mycanvas" canvas-id="mycanvas" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></canvas>
            <view class="uni-tip-group-button">
              <text class="uni-tip-button" @tap="handlePopupButton('cancel')">取消</text>
              <text class="uni-tip-button red" @tap="handlePopupButton('confirm')">确定</text>
            </view>
          </view>
        </uni-popup>
      </view>
    </view>
    <view class="uni-form-button"><button type="primary" @tap="handleSubmit">签认</button></view>
  </view>
</template>

<script>
// import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
import uniPopup from '../../../uni_modules/uni-popup/components/uni-popup/uni-popup'

export default {
  components: {
    uniPopup
  },
  data() {
    return {
      image: '',
      handleImg: '',
      currentIndex: 0,
      ctx:'',         //绘图图像
      points:[]       //路径点集合
    }
  },
  onLoad(_options) {
  },
  onShow() {
  },
  methods: {
    handleSubmit() {
      uni.showToast({
            icon: 'none',
            title: '成功！'
          })
    },
    showCanvas (index) {
      this.currentIndex = index
      console.log('ddddd', this.$refs.showCanvas);
      this.$refs['showCanvas'].open()
      this.ctx = uni.createCanvasContext("mycanvas",this);   //创建绘图对象
      //设置画笔样式
      this.ctx.lineWidth = 4;
      this.ctx.lineCap = "round"
      this.ctx.lineJoin = "round"
    },
    handlePopupButton(_action) {
      console.log(_action)
      this.finish()
      this.$refs['showCanvas'].close()
    },
    //触摸开始，获取到起点
    touchstart:function(e){
        let startX = e.changedTouches[0].x;
        let startY = e.changedTouches[0].y;
        let startPoint = {X:startX,Y:startY};
         
        /* **************************************************
            #由于uni对canvas的实现有所不同，这里需要把起点存起来
         * **************************************************/
        this.points.push(startPoint);
         
        //每次触摸开始，开启新的路径
        this.ctx.beginPath();
    },
    //触摸移动，获取到路径点
    touchmove:function(e){
        let moveX = e.changedTouches[0].x;
        let moveY = e.changedTouches[0].y;
        let movePoint = {X:moveX,Y:moveY};
        this.points.push(movePoint);       //存点
        let len = this.points.length;
        if(len>=2){
            this.draw();                   //绘制路径
        }
    },
    // 触摸结束，将未绘制的点清空防止对后续路径产生干扰
    touchend:function(){                  
        this.points=[];
    },
    /* ***********************************************
    #   绘制笔迹
    #   1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
    #   2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
    #   3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
    ************************************************ */
    draw: function() {
        let point1 = this.points[0]
        let point2 = this.points[1]
        this.points.shift()
        this.ctx.moveTo(point1.X, point1.Y)
        this.ctx.lineTo(point2.X, point2.Y)
        this.ctx.stroke()
        this.ctx.draw(true)
    },
    //清空画布
    clear:function(){
        let that = this;
        uni.getSystemInfo({
            success: function(res) {
                let canvasw = res.windowWidth;
                let canvash = res.windowHeight;
                that.ctx.clearRect(0, 0, canvasw, canvash);
                that.ctx.draw(true);
            },
        })
    },
    //完成绘画并保存到本地
    finish:function(){
      // let canvas = document.getElementById('mycanvas')
      // var dataURL = canvas.toDataURL('image/png')
        uni.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: res => {
            let path = res.tempFilePath;
            this.image = path
            // uni.saveImageToPhotosAlbum({
            //     filePath:path
            // })
          }
        })
    }
  }
}
</script>

<style lang="scss">
.labor-temporary-wrap {
  background: #f7f7f7;

  .uni-form {
    .title {
      width: 160upx;
    }
    .item {
      // width: 100%;
      height: 320rpx!important;
    }
    .sign-box {
      width: 100%;
      height: 256rpx!important;
      border-radius: 5rpx;
      background: rgb(224, 224, 224);
      color: #fff;
      font-size: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mycanvas{
        width: 800rpx;
        height: 300rpx;
        background-color: #ECECEC;
    }
    .uni-tip-head {
      // width: 100%;
      height: 60rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 30rpx;
      font-size: 16rpx;
      .left {
        font-size: 32upx!important;
      }
      .right {
        font-size: 28upx!important;
        color: #2989f0;
      }
    }
    .uni-form-item {
      .uni-list-ul {
        line-height: initial;
      }
    }
  }
}
</style>
