<template>
  <view>
      <page-head :title="title"></page-head>
      <view class="uni-padding-wrap uni-common-mt">
            <button type="primary">页面主操作 Normal</button>
            <button type="primary" :loading="loading">页面主操作 Loading</button>
            <button type="primary" disabled="true">页面主操作 Disabled</button>
            <view class="button-sp-area">
                <button type="primary" plain="true">按钮</button>
                <button type="primary" disabled="true" plain="true">不可点击的按钮</button>
            </view>
      </view>
      <view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title uni-common-mt">默认样式</view>
			<view>
				<checkbox-group>
					<label>
						<checkbox value="cb" checked="true" />选中
					</label>
					<label>
						<checkbox value="cb" />未选中
					</label>
				</checkbox-group>
			</view>
			<view class="uni-title uni-common-mt">不同颜色和尺寸的checkbox</view>
			<view>
				<checkbox-group>
					<label>
						<checkbox value="cb" checked="true" color="#FFCC33" style="transform:scale(0.7)" />选中
					</label>
					<label>
						<checkbox value="cb" color="#FFCC33" style="transform:scale(0.7)" />未选中
					</label>
				</checkbox-group>
			</view>
		</view>
		
		<view class="uni-padding-wrap">
			<view class="uni-title uni-common-mt">
				推荐展示样式
				<text>\n使用 uni-list 布局</text>
			</view>
		</view>
		<view class="uni-list">
			<checkbox-group @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
					<view>
						<checkbox :value="item.value" :checked="item.checked" />
					</view>
					<view>{{item.name}}</view>
				</label>
			</checkbox-group>
		</view>
    <view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">姓名</view>
					<input class="uni-input" name="nickname" placeholder="请输入姓名" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">性别</view>
					<radio-group name="gender">
						<label>
							<radio value="男" /><text>男</text>
						</label>
						<label>
							<radio value="女" /><text>女</text>
						</label>
					</radio-group>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">爱好</view>
					<checkbox-group name="loves">
						<label>
							<checkbox value="读书" /><text>读书</text>
						</label>
						<label>
							<checkbox value="写字" /><text>写字</text>
						</label>
					</checkbox-group>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">年龄</view>
					<slider value="20" name="age" show-value></slider>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">保留选项</view>
					<view>
						<switch name="switch" />
					</view>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">Submit</button>
					<button type="default" form-type="reset">Reset</button>
				</view>
			</form>
		</view>
    <view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title">显示当前value</view>
			<view>
				<slider value="50" @change="sliderChange" show-value />
			</view>
			
			<view class="uni-title">设置步进step跳动</view>
			<view>
				<slider value="60" @change="sliderChange" step="5" />
			</view>

			<view class="uni-title">设置最小/最大值</view>
			<view>
				<slider value="100" @change="sliderChange" min="50" max="200" show-value />
			</view>
			
			<view class="uni-title">不同颜色和大小的滑块</view>
			<view>
				<slider value="50" @change="sliderChange" activeColor="#FFCC33" backgroundColor="#000000" block-color="#8A6DE9" block-size="20" />
			</view>
		</view>
    <view class="uni-title uni-common-pl">输入区域高度自适应，不会出现滚动条</view>
		<view class="uni-textarea">
			<textarea @blur="bindTextAreaBlur" auto-height />
		</view>
		<view class="uni-title uni-common-pl">占位符字体是红色的textarea</view>
		<view class="uni-textarea">
			<textarea placeholder-style="color:#F76260" placeholder="占位符字体是红色的"/>
		</view>
  </view>
</template>
<script>
    export default {
        data() {
            return {
                title: 'button',
                loading: false,
                items: [{
                  value: 'USA',
                  name: '美国'
                },
                {
                  value: 'CHN',
                  name: '中国',
                  checked: 'true'
                },
                {
                  value: 'BRA',
                  name: '巴西'
                },
                {
                  value: 'JPN',
                  name: '日本'
                },
                {
                  value: 'ENG',
                  name: '英国'
                },
                {
                  value: 'FRA',
                  name: '法国'
                }
              ]
            }
        },
        onLoad() {
            this._timer = null;
        },
        onShow() {
            this.clearTimer();
            this._timer = setTimeout(() => {
                this.loading = true;
            }, 300)
        },
        onUnload() {
            this.clearTimer();
            this.loading = false;
        },
        methods: {
          bindTextAreaBlur: function (e) {
            console.log(e.detail.value)
          },
          sliderChange(e) {
            console.log('value 发生变化：' + e.detail.value)
          },
          openTypeError(error) {
              console.error('open-type error:', error);
          },
          clearTimer() {
              if (this._timer != null) {
                  clearTimeout(this._timer);
              }
          },
          checkboxChange: function (e) {
          var items = this.items,
            values = e.detail.value;
          for (var i = 0, lenI = items.length; i < lenI; ++i) {
            const item = items[i]
            if(values.indexOf(item.value) >= 0){
              this.$set(item,'checked',true)
            }else{
              this.$set(item,'checked',false)
            }
          }
        }
      }
    }
</script>

<style>
    button {
        margin-top: 30rpx;
        margin-bottom: 30rpx;
    }

    .button-sp-area {
        margin: 0 auto;
        width: 60%;
    }

    .mini-btn {
        margin-right: 10rpx;
    }
    .uni-list-cell {
      justify-content: flex-start
    }
</style>
