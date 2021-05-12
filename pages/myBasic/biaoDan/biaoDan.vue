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
      <view class="uni-form-item">
				<view class="title">选人1</view>
				<view class="item" @tap="handleUser('rectify')">
					<text class="right-arrow"
						:class="form.rectifyName ? '' : 'custom-placeholder'">{{ form.rectifyName ? form.rectifyName : '请选择人' }}</text>
				</view>
			</view>

			<view class="uni-form-item">
				<view class="title">选人2</view>
				<view class="item" @tap="handleUser('leader')">
					<text class="right-arrow"
						:class="form.leaderName ? '' : 'custom-placeholder'">{{ form.leaderName ? form.leaderName : '请选择接人' }}</text>
				</view>
			</view>
    </view>
    <view class="uni-form">
      <view class="uni-form-item uni-form-item-textarea">
        <view class="title">文本</view> 
        <view class="item">
          <textarea class="uni-textarea" :value="form.describe" data-key="describe" placeholder="在此输入" />
        </view>
      </view>
    </view>
    <view class="uni-form mb0">
      <view class="uni-form-item uni-form-item-image">
        <view class="title">照片</view>
        <view class="item"><image-select v-on:on-choose="handleImage" :limit="9" module="labor"></image-select></view>
      </view>
    </view>
    <view class="uni-form-button"><button type="primary" @tap="handleAdd">提交</button></view>
  </view>
</template>

<script>
import dateMixins from '@/mixins/dateMixins.js'
import imageSelect from '../../../components/common/image-select'
import { mapState } from 'vuex'
export default {
  mixins: [dateMixins],
  components: {
    imageSelect
  },
  data () {
    return {
      form: {
        name: '',
        name2: '',
        date: '',
        flId: '',
        flName: '',
        rectifyName: '',
        rectifyId: '',
        leaderName: '',
        leaderId: '',
        describe: '',
        picture: ''
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
      zone: state => state.index.zone,
      users: state => state.user.users
    })
  },
  watch: {
		users: function(v, ov) {
      console.log('监听到的', v);
			if (v.key) {
				this.form[v.key + 'Name'] = v.value.nickname
				this.form[v.key + 'Id'] = v.value.id
        console.log(this.form[v.key + 'Name']);
			} else if (ov.key) {
				this.form[ov.key + 'Name'] = ''
				this.form[ov.key + 'Id'] = ''
			}
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
    bindPickerChange (e) {
      const targetObj = this.flList
      console.log('选择的', targetObj[e.target.value]);
			this.form[e.target.dataset.key + 'Id'] = targetObj[e.target.value].id
			this.form[e.target.dataset.key + 'Name'] = targetObj[e.target.value].value
    },
    handleZone() {
			uni.navigateTo({
				url: '../../commonPage/myTree'
			})
		},
    handleUser(_key) {
			uni.navigateTo({
				url: '../../commonPage/user?key=' + _key
			})
		},
    handleImage(_imageList) {
      this.form.picture = _imageList
    }
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
