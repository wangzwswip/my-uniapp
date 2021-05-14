<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-btn-v">
				<button type="default" @tap="modalTap">有标题的modal</button>
				<button type="default" @tap="noTitlemodalTap">无标题的modal</button>
			</view>
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-btn-v">
				<button class="btn-load" type="primary" @click="showLoading">显示 loading 提示框</button>
				<!-- #ifndef MP-ALIPAY -->
				<button @click="hideLoading">隐藏 loading 提示框</button>
				<!-- #endif -->
			</view>
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-btn-v">
				<button type="default" @tap="toast1Tap">点击弹出默认toast</button>
				<button type="default" @tap="toast2Tap">点击弹出设置duration的toast</button>
				<button type="default" @tap="toast3Tap">点击弹出显示loading的toast</button>
				<!-- #ifndef MP-ALIPAY -->
				<button type="default" @tap="toast4Tap">点击弹出显示自定义图片的toast</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<button type="default" @tap="toast5Tap">点击显示无图标的居底toast</button>
				<!-- #endif -->
				<button type="default" @tap="hideToast">点击隐藏toast</button>
			</view>
		</view>
	</view>
</template>
<script>

	export default {
		data() {
			return {
				title: 'modal',
				modalHidden: true,
				modalHidden2: true
			}
		},
		methods: {
			modalTap: function (e) {
				uni.showModal({
					title: "弹窗标题",
					content: "弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内",
					showCancel: false,
					confirmText: "确定"
				})
			},
			noTitlemodalTap: function (e) {
				uni.showModal({
					content: "弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内",
					confirmText: "确定",
					cancelText: "取消"
				})
			},
			showLoading: function() {
				uni.showLoading({
					title: 'loading'
				});

				// #ifdef MP-ALIPAY
				this._showTimer && clearTimeout(this._showTimer);
				this._showTimer = setTimeout(() => {
					this.hideLoading();
				}, 3000)
				// #endif
			},
			hideLoading: function() {
				uni.hideLoading();
			},
			toast1Tap: function () {
				uni.showToast({
					title: "默认"
				})
			},
			toast2Tap: function () {
				uni.showToast({
					title: "duration 3000",
					duration: 3000
				})
			},
			toast3Tap: function () {
				uni.showToast({
					title: "loading",
					icon: "loading",
					duration: 5000
				})
				// #ifdef MP-ALIPAY
				this._showTimer && clearTimeout(this._showTimer);
				this._showTimer = setTimeout(() => {
					this.hideToast()
				}, 3000)
				// #endif
			},
			toast4Tap: function () {
				uni.showToast({
					title: "logo",
					image: "../../../static/uni.png"
				})
			},
			// #ifdef APP-PLUS
			toast5Tap: function () {
				uni.showToast({
					title: "显示一段轻提示",
					position:'bottom'
				})
			},
			// #endif
			hideToast: function () {
				uni.hideToast()
			}
		}
	}
</script>