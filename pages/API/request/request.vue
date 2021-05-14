<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-hello-text">
				请点击按钮向服务器发起请求
			</view>
			<view class="uni-textarea uni-common-mt">
				<textarea :value="res"></textarea>
			</view>
			<view class="uni-btn-v uni-common-mt">
				<button type="primary" @click="sendRequest" :loading="loading">发起请求（Callback）</button>
				<button type="primary" @click="sendRequest('promise')" :loading="loading">发起请求（Promise）</button>
				<button type="primary" @click="sendRequest('await')" :loading="loading">发起请求（Async/Await）</button>
			</view>
		</view>
    <view class="uni-padding-wrap uni-common-mt">
			<view class="demo">
				<block v-if="imageSrc">
					<image :src="imageSrc" class="image" mode="widthFix"></image>
				</block>
				<block v-else>
					<view class="uni-hello-addfile" @click="chooseImage">+ 选择图片</view>
				</block>
			</view>
		</view>
    <view class="uni-padding-wrap uni-common-mt">
			<view v-if="imageSrc" class="image-container">
				<image class="img" :src="imageSrc2" mode="center" />
			</view>
			<block v-else style="margin-top: 50px;">
				<view class="uni-hello-text">
					点击按钮下载服务端示例图片（下载网络文件到本地临时目录）
				</view>
				<view class="uni-btn-v">
					<button type="primary" @tap="downloadImage">下载</button>
				</view>
			</block>
		</view>
	</view>
</template>
<script>
	const requestUrl = 'https://unidemo.dcloud.net.cn/ajax/echo/text?name=uni-app'
	const duration = 2000
	export default {
		data() {
			return {
				title: 'request',
				loading: false,
				res: '',
        imageSrc: '',
        imageSrc2: ''
			}
		},
    onUnload() {
			this.imageSrc = '';
			this.imageSrc2 = '';
		},
		methods: {
			sendRequest(mode) {
				this.loading = true;
				switch (mode) {
					case 'promise':
						this._requestPromise();
						break;
					case 'await':
						this._requestAwait();
						break;
					default:
						this._request();
						break;
				}
			},
			_request() {
				uni.request({
					url: requestUrl,
					dataType: 'text',
					data: {
						noncestr: Date.now()
					},
					success: (res) => {
						console.log('request success', res)
						uni.showToast({
							title: '请求成功',
							icon: 'success',
							mask: true,
							duration: duration
						});
						this.res = '请求结果 : ' + JSON.stringify(res);
					},
					fail: (err) => {
						console.log('request fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						});
					},
					complete: () => {
						this.loading = false;
					}
				});
			},
			_requestPromise() {
				uni.request({
					url: requestUrl,
					dataType: 'text',
					data: {
						noncestr: Date.now()
					}
				}).then(res => {
					console.log('request success', res[1]);
					uni.showToast({
						title: '请求成功',
						icon: 'success',
						mask: true,
						duration: duration
					});
					this.res = '请求结果 : ' + JSON.stringify(res[1]);

					this.loading = false;
				}).catch(err => {
					console.log('request fail', err);
					uni.showModal({
						content: err.errMsg,
						showCancel: false
					});

					this.loading = false;
				});
			},
			async _requestAwait() {
				const [err, res] = await uni.request({
					url: requestUrl,
					dataType: 'text',
					data: {
						noncestr: Date.now()
					}
				});
				if (err) {
					console.log('request fail', err);
					uni.showModal({
						content: err.errMsg,
						showCancel: false
					});
				} else {
					console.log('request success', res)
					uni.showToast({
						title: '请求成功',
						icon: 'success',
						mask: true,
						duration: duration
					});
					this.res = '请求结果 : ' + JSON.stringify(res);
				}
				this.loading = false;
			},
      chooseImage: function() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						console.log('chooseImage success, temp path is', res.tempFilePaths[0])
						var imageSrc = res.tempFilePaths[0]
						uni.uploadFile({
							url: 'https://unidemo.dcloud.net.cn/upload',
							filePath: imageSrc,
							fileType: 'image',
							name: 'data',
							success: (res) => {
								console.log('uploadImage success, res is:', res)
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
								this.imageSrc = imageSrc
							},
							fail: (err) => {
								console.log('uploadImage fail', err);
								uni.showModal({
									content: err.errMsg,
									showCancel: false
								});
							}
						});
					},
					fail: (err) => {
						console.log('chooseImage fail', err)
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.album'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
      downloadImage: function () {
				uni.showLoading({
					title:'下载中'
				})
				var self = this
				uni.downloadFile({
					url: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					success: (res) => {
						console.log('downloadFile success, res is', res)
						self.imageSrc2 = res.tempFilePath;
						uni.hideLoading();
					},
					fail: (err) => {
						console.log('downloadFile fail, err is:', err)
					}
				})
			}
		}
	}
</script>

<style>
	.image {
		width: 100%;
	}

	.demo {
		background: #FFF;
		padding: 50rpx;
	}
</style>