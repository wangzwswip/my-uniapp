<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 消息监听
			// #ifdef APP-PLUS
			plus.push.addEventListener(
				'receive',
				msg => {
					uni.navigateTo({
						url: '/pages/myBaisc/myCall/myCall'
					})
				},
				false
			)

			plus.screen.lockOrientation('portrait-primary') //锁定
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./common/common.scss";
	@import "./common/public.scss";
	@import "./common/uni.css";
	
	body,
	page {
		font-size: $font_h5;
		min-height: 100%;
		display: flex;
		color: #333;
	}
	page {
  > view {
    width: 100%;
    background: #fff;
  }
	.fix-pc-padding {
		padding: 0 50px;
	}
  .uni-header-logo {
      padding: 30rpx;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 10rpx;
  }
  .uni-header-image {
      width: 100px;
      height: 100px;
  }
  .uni-hello-text {
      color: #7A7E83;
  }
  .uni-hello-addfile {
      text-align: center;
      line-height: 300rpx;
      background: #FFF;
      padding: 50rpx;
      margin-top: 10px;
      font-size: 38rpx;
      color: #808080;
  }
}
</style>
