<template>
	<view>
		<view class="cover-content" v-if="showMap">
			<!-- TODO暂时条件编译解决支付宝小程序不能正常显示 cover-x -->
			<!-- #ifdef APP-PLUS -->
			<map>
				<cover-view class="cover-view">简单的cover-view</cover-view>
				<cover-image class="cover-image" src="/static/images/img_rank2.png"></cover-image>
			</map>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showMap: false
			};
		},
		onLoad() {
      // #ifdef APP-PLUS || MP-BAIDU
			setTimeout(()=>{
				this.showMap = true
			},350)
      // #endif
      // #ifndef APP-PLUS || MP-BAIDU
			this.showMap = true
      // #endif
		}
	}
</script>

<style>
	map {
		width: 750rpx;
		width: 100%;
		height: 600px;
	}

	.video {
		width: 100%;
	}

	.cover-content {
		position: relative;
	}

	.cover-view {
		position: absolute;
		left: 5px;
		top: 5px;
		width: 375rpx;
		text-align: center;
		background-color: #DDDDDD;
	}

	.cover-image {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 96px;
		height: 96px;
	}
</style>
