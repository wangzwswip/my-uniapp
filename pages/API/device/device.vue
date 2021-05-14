<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view style="background:#FFFFFF; padding:40rpx;">
				<view class="uni-hello-text uni-center">网络状态</view>
				<block v-if="hasNetworkType === false">
					<view class="uni-h2 uni-center uni-common-mt">未获取</view>
					<view class="uni-hello-text uni-center uni-common-mt">请点击下面按钮获取网络状态</view>
				</block>
				<block v-if="hasNetworkType === true">
					<view class="uni-h2 uni-center uni-common-mt">{{networkType}}</view>
				</block>
				<view v-if="hasNetworkType === true && networkType === 'wifi'" class="uni-textarea uni-common-mt">
					<textarea :value="connectedWifi"></textarea>
				</view>
			</view>
			<view class="uni-btn-v uni-common-mt">
				<button type="primary"  @tap="getNetworkType">获取设备网络状态</button>
				<!-- #ifdef MP-WEIXIN -->
				<button v-if="hasNetworkType === true && networkType === 'wifi'" class="uni-common-mt" type="primary" @tap="getConnectedWifi">获取 wifi 信息</button>
				<!-- #endif -->
				<button class="uni-common-mt" @tap="clear">清空</button>
			</view>
		</view>
    <view class="uni-common-mt">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label" style="width:180px;">设备型号</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.model"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label" style="width:180px;">客户端平台</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.platform"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label" style="width:180px;">操作系统版本</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.system"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label" style="width:180px;">语言</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.language"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label" style="width:180px;">版本</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.version"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label" style="width:180px;">屏幕宽度</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.screenWidth"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label" style="width:180px;">屏幕高度</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.screenHeight"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label" style="width:180px;">可使用窗口高度</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.windowHeight"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label" style="width:180px;">可使用窗口的顶部位置</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.windowTop"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label" style="width:180px;">可使用窗口的底部位置</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.windowBottom"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label" style="width:180px;">状态栏的高度</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.statusBarHeight"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label" style="width:180px;">DPI</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.pixelRatio"></input>
					</view>
				</view>
				<!-- #ifdef MP -->
				<view class="uni-list-cell">
					<view class="uni-pd">
						<view class="uni-label" style="width:180px;">基础库版本</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" placeholder="未获取" :value="systemInfo.SDKVersion"></input>
					</view>
				</view>
				<!-- #endif -->
			</view>
			<view class="uni-padding-wrap">
				<view class="uni-btn-v">
					<button type="primary" @tap="getSystemInfo">获取设备系统信息</button>
				</view>
			</view>
		</view>
    <view class="uni-padding-wrap uni-common-mt">
			<view class="uni-hello-text uni-center">请在下方输入电话号码</view>
			<input class="input uni-common-mt" type="number" name="input" @input="bindInput" />
			<view class="uni-btn-v uni-common-mt">
				<button @tap="makePhoneCall" type="primary" :disabled="disabled">拨打</button>
			</view>
		</view>
	</view>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				title: 'getNetworkType',
				hasNetworkType: false,
				networkType: '',
				connectedWifi: '',
        systemInfo: {},
        disabled: true
			}
		},
		onUnload:function(){
			this.networkType = '',this.hasNetworkType = false;
      this.systemInfo = {};
		},
		methods: {
      bindInput: function (e) {
				this.inputValue = e.detail.value
				if (this.inputValue.length > 0) {
					this.disabled = false
				} else {
					this.disabled = true
				}
			},
			makePhoneCall: function () {
				uni.makePhoneCall({
					phoneNumber: this.inputValue,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			getNetworkType: function () {
				uni.getNetworkType({
					success: (res) => {
						console.log(res)
						this.hasNetworkType = true, this.networkType = res.subtype || res.networkType
					},
          fail: () => {
              uni.showModal({
              	content:'获取失败！',
                  showCancel:false
              })
          }
				})
			},
      getSystemInfo: function () {
				uni.getSystemInfo({
					success: (res) => {
						this.systemInfo = res
					}
				})
			},
			clear: function () {
				this.hasNetworkType = false,
				this.networkType = '',
				this.connectedWifi = ''
			},
			// #ifdef MP-WEIXIN
			getConnectedWifi() {
				const that = this
				uni.startWifi({
					success: function() {
						uni.getConnectedWifi({
							success: function(res) {
								const { wifi } = res
								that.connectedWifi = JSON.stringify(wifi)
							},
							fail: function(res) {
							}
						})
					},
					fail: function(res) {
					}
				})
			}
			// #endif
		}
	}
</script>

<style>
.uni-pd {
		padding-left: 30rpx;
	}
  .input {
		height: 119rpx;
		line-height: 119rpx;
		font-size: 78rpx;
		border-bottom: 1rpx solid #E2E2E2;
		text-align:center;
	}
</style>
