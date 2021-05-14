<template>
	<view>
		<view :title="title"></view>
		<view class="uni-common-mt">
			<form>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">图片来源</view>
						</view>
						<view class="uni-list-cell-right">
							<picker :range="sourceType" @change="sourceTypeChange" :value="sourceTypeIndex" mode="selector">
								<view class="uni-input">{{sourceType[sourceTypeIndex]}}</view>
							</picker>
						</view>
					</view>

					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">图片质量</view>
						</view>
						<view class="uni-list-cell-right">
							<picker :range="sizeType" @change="sizeTypeChange" :value="sizeTypeIndex" mode="selector">
								<view class="uni-input">{{sizeType[sizeTypeIndex]}}</view>
							</picker>
						</view>
					</view>

					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							<view class="uni-label">数量限制</view>
						</view>
						<view class="uni-list-cell-right">
							<picker :range="count" @change="countChange" mode="selector">
								<view class="uni-input">{{count[countIndex]}}</view>
							</picker>
						</view>
					</view>
				</view>


				<view class="uni-list list-pd">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-head">
								<view class="uni-uploader-title">点击可预览选好的图片</view>
								<view class="uni-uploader-info">{{imageList.length}}/9</view>
							</view>
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<block v-for="(image,index) in imageList" :key="index">
										<view class="uni-uploader__file">
											<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
										</view>
									</block>
									<view class="uni-uploader__input-box">
										<view class="uni-uploader__input" @tap="chooseImage"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</form>
		</view>
    <view class="uni-padding-wrap">
      <view title="audio"></view>
      <view class="uni-common-mt">
        <slider :value="position" :min="0" :max="duration" @changing="onchanging" @change="onchange"></slider>
      </view>
      <!-- <view class="uni-common-mt play-time-area">
        <text class="current-time">{{currentTime}}</text>
        <text class="duration">{{duration}}</text>
      </view> -->
      <view class="play-button-area">
        <image class="icon-play" :src="playImage" @click="play"></image>
      </view>
    </view>
    <view class="uni-common-mt">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						<view class="uni-label">视频来源</view>
					</view>
					<view class="uni-list-cell-right">
						<picker :range="sourceType" @change="sourceTypeChange" :value="sourceTypeIndex">
							<view class="uni-input">{{sourceType[sourceTypeIndex]}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		<view class="uni-title uni-common-mt uni-common-pl">摄像头位置</view>
		<view class="uni-hello-text camera-tips">注意：部分 Android 手机下由于系统 ROM 不支持无法生效，打开拍摄界面后可操作切换</view>
		<view class="uni-list">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in cameraList" :key="item.value">
					<radio :value="item.value" :checked="index === cameraIndex">{{item.name}}</radio>
				</label>
			</radio-group>
		</view>
		<!-- #endif -->
		<template v-if="!src">
			<view class="uni-hello-addfile" @tap="chooseVideo">+ 添加视频</view>
		</template>
		<template v-else>
			<video :src="src" class="video"></video>
		</template>
	</view>
</template>
<script>
	import permision from "@/common/permission.js"
  var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
  const audioUrl = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3'
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data() {
			return {
				title: 'choose/previewImage',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        isPlaying: false,
				isPlayEnd: false,
				currentTime: 0,
				duration: 100,
        sourceTypeIndex: 2,
				sourceType: ['拍摄', '相册', '拍摄或相册'],
				src: '',
				cameraList: [{
						value: 'back',
						name: '后置摄像头',
						checked: 'true'
					},
					{
						value: 'front',
						name: '前置摄像头'
					},
				],
				cameraIndex: 0
			}
		},
    computed: {
			position() {
				return this.isPlayEnd ? 0 : this.currentTime;
			},
			playImage() {
				return this.isPlaying ? "/static/pause.png" : "/static/play.png"
			}
		},
    onLoad () {
      this._isChanging = false;
			this._audioContext = null;
			this.createAudio();
      this.src = '',
			this.sourceTypeIndex = 2,
			this.sourceType = ['拍摄', '相册', '拍摄或相册'];
    },
		onUnload() {
			this.imageList = [],
			this.sourceTypeIndex = 2,
			this.sourceType = ['拍照', '相册', '拍照或相册'],
			this.sizeTypeIndex = 2,
			this.sizeType = ['压缩', '原图', '压缩或原图'],
			this.countIndex = 8;
      if (this._audioContext != null && this.isPlaying) {
				this.stop();
			}
		},
		methods: {
			sourceTypeChange: function(e) {
				this.sourceTypeIndex = parseInt(e.detail.value)
			},
			sizeTypeChange: function(e) {
				this.sizeTypeIndex = parseInt(e.detail.value)
			},
			countChange: function(e) {
				this.countIndex = e.detail.value;
			},
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif

				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
					},
					fail: (err) => {
						console.log("err: ",err);
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						if(err.errMsg.indexOf('cancel') !== '-1'){
							return;
						}
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
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
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');

				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}

				return status;
			},
      createAudio() {
				var innerAudioContext = this._audioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = false;
				innerAudioContext.src = audioUrl;
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
				innerAudioContext.onTimeUpdate((e) => {
					if (this._isChanging === true) {
						return;
					}
					this.currentTime = innerAudioContext.currentTime || 0;
					this.duration = innerAudioContext.duration || 0;
				});
				innerAudioContext.onEnded(() => {
					this.currentTime = 0;
					this.isPlaying = false;
					this.isPlayEnd = true;
				});
				innerAudioContext.onError((res) => {
					this.isPlaying = false;
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				return innerAudioContext;
			},
			onchanging() {
				this._isChanging = true;
			},
			onchange(e) {
				console.log(e.detail.value);
				console.log(typeof e.detail.value);
				this._audioContext.seek(e.detail.value);
				this._isChanging = false;
			},
			play() {
				if (this.isPlaying) {
					this.pause();
					return;
				}
				this.isPlaying = true;
				this._audioContext.play();
				this.isPlayEnd = false;
			},
			pause() {
				this._audioContext.pause();
				this.isPlaying = false;
			},
			stop() {
				this._audioContext.stop();
				this.isPlaying = false;
			},
      // 视频
      radioChange(evt) {
				for (let i = 0; i < this.cameraList.length; i++) {
					if (this.cameraList[i].value === evt.detail.value) {
						this.cameraIndex = i;
						break;
					}
				}
			},
			sourceTypeChange: function(e) {
				this.sourceTypeIndex = parseInt(e.detail.value)
			},
			chooseVideo: function() {
				uni.chooseVideo({
					camera: this.cameraList[this.cameraIndex].value,
					sourceType: sourceType[this.sourceTypeIndex],
					success: (res) => {
						this.src = res.tempFilePath
					},
					fail: (err) => {
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取视频，请在设置界面打开相关权限',
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
			}
		}
	}
</script>

<style>
	.cell-pd {
		padding: 22rpx 30rpx;
	}

	.list-pd {
		margin-top: 50rpx;
	}
  .play-time-area {
		display: flex;
		flex-direction: row;
		margin-top: 20px;
	}

	.duration {
		margin-left: auto;
	}

	.play-button-area {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 50px;
	}

	.icon-play {
		width: 60px;
		height: 60px;
	}
  .video {
		width: 100%;
	}

	.camera-tips {
		padding: 10rpx 30rpx;
	}
</style>
