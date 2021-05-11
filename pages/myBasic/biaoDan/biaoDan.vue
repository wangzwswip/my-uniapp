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
    </view>
    <view class="uni-form-button"><button type="primary" @tap="handleAdd">提交</button></view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        name2: '',
        date: ''
      }
    }
  },
  computed: {
    startDate() {
      return this.getDate('start')
    },
    endDate() {
      return this.getDate('end')
    }
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
    getDate(type) {
      const date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()

      return `${year}-${month}-${day}`
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
