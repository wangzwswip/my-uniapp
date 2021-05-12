<template>
  <view class="biao-dan-wrap">
    <view class="uni-form">
      <view class="uni-form-item">
				<view class="title">名称手动</view>
				<view class="item"><input class="uni-input" :value="form.name" data-key="name" @input="onKeyInput" placeholder="请输入" /></view>
			</view>
      <view class="uni-form-item">
				<view class="title">名称自动</view>
				<view class="item"><input class="uni-input" :value="form.name2" placeholder="请输入" /></view>
			</view>
      <view class="uni-form-item">
        <view class="title">时间</view>
        <view class="item">
          <picker mode="date" data-key="date" :start="startDate" :end="endDate" @change="bindDateChange">
            <view class="uni-input">{{ form.date }}</view>
          </picker>
        </view>
      </view>
      <view class="uni-form-item">
				<view class="title">交底分类</view>
				<view class="item">
					<picker @change="bindPickerChange" data-key="fl" :range="flList" range-key="value">
						<view class="uni-input" :class="form.flName ? '' : 'custom-placeholder'">{{ form.flName ? form.flName : '请选择分类' }}</view>
					</picker>
				</view>
			</view>
      <view class="uni-form-item">
				<view class="title">选择跳转</view>
				<view class="item" @tap="handleZone">
					<text class="right-arrow"
						:class="zone.zoneName ? '' : 'custom-placeholder'">{{ zone.zoneName ? zone.zoneName : '请选择' }}</text>
				</view>
			</view>
    </view>
    <view class="uni-form-button"><button type="primary" @tap="handleAdd">提交</button></view>
  </view>
</template>

<script>
import dateMixins from '@/mixins/dateMixins.js'
	import { mapState } from 'vuex'
export default {
  mixins: [dateMixins],
  data () {
    return {
      form: {
        name: '',
        name2: '',
        date: '',
        flId: '',
        flName: ''
      },
      flList: [
        {
          value: '分类一',
					id: '1'
        },
        {
          value: '分类2',
					id: '2'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      zone: state => state.index.zone
    })
  },
  methods: {
    handleAdd () {
      uni.showToast({
        title: '提交成功',
        success: () => {
          uni.navigateBack()
        }
      })
    },
    onKeyInput(e) {
      this.form[e.target.dataset.key] = e.target.value
    },
    bindDateChange(e) {
      console.log(e.target.value)
      this.form[e.target.dataset.key] = e.target.value
    },
    bindPickerChange (e) {
      const targetObj = this.options[e.target.dataset.key]
				const nameKey = {
					rectify: 'realName',
					leader: 'leaderName'
				}
				const keys = nameKey[e.target.dataset.key]
				console.log(keys)
				this.form[e.target.dataset.key + 'Id'] = targetObj[e.target.value].id
				this.form[e.target.dataset.key + 'Name'] = targetObj[e.target.value].value || targetObj[e.target.value][
					keys
				]
    },
    handleZone() {
			uni.navigateTo({
				url: '../../commonPage/myTree'
			})
		},
  }
}
</script>

<style lang='scss' scoped>
.biao-dan-wrap {
  .uni-form {
			.title {
				width: 160rpx;
			}
		}
}
</style>
