<template>
  <view class="main-people-wrap">
    <view class="my-call right-arrow" @tap="showBBH">
    <view class="text">
      <text>电话客服</text>
    </view>
  </view>
    <view class="showBox" v-if="showBox" @click="showOFF">
      <view class="phoneBox" @tap="callPhone">
        <image src="/static/images/p_dianhua.png"></image>15010892865
      </view>
    </view>
  </view>
</template>

<script>
export default {      
  data() {
    return {
    showBox: false
    }
  },
  onLoad() {
  },
  onShow() {
  },
  mounted() {
  },
  methods: {
	showBBH() {
		this.showBox= true
	},
	showOFF() {
		this.showBox= false
	},
	callPhone() {
		uni.makePhoneCall({
      phoneNumber: '15010892865'
		});
	}
  }
}
</script>

<style lang="scss">
@import '@/common/common.scss';
.showBox{
	position: absolute;
	top: 0;
	bottom: 0;
	height: 100%;
	width: 100%;
	background: rgba($color: #000000, $alpha: 0.3);
	.phoneBox{
		position: absolute;
		bottom: 0;
		z-index: 999;
		height: 200rpx;
		width: 100%;
		background: #fff;
		font-size: 36upx;
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			width: 60upx;
			height: 60upx;
			margin-right: 10upx;
		}
	}
}
.my-call {
  background: #fff;
  color: #000;
  width: 100%;
  height: 400rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32rpx;
}
</style>
