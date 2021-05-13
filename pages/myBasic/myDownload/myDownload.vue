<template>
  <view class="data-drawing-wrap page-search-wrap">
    <view class="page-search">
      <view class="search-form">
        <view class="search-input">
          <view class="clear-search-item" v-if="form.name" @tap.stop="clearForm('name')"></view>
          <input type="text" :value="form.name" @input="handleSearchInput" data-key="name" placeholder="请输入名称" />
        </view>
      </view>

      <view class="search-btn" @tap="handleSearch">查询</view>
    </view>

    <view class="page-body">
      <mescroll-uni @init="mescrollInited" @down="downCallback" :up="upOption" @up="upCallback" :fixed="false">
        <view class="uni-list-ul">
          <view class="uni-list-li" v-for="item in list" :key="item.id" @tap="handleView(item)">
            <view class="uni-list-name">
              <view class="list-name-title">{{ item.name }}</view>
            </view>
            <view class="uni-list-content">
              <view>{{ item.des }}</view>
            </view>
          </view>
        </view>
      </mescroll-uni>
    </view>
  </view>
</template>

<script>
import MescrollUni from '../../../components/common/mescroll-uni/mescroll-uni.vue'
import scrollMixins from '../../../mixins/scrollMixins'
export default {
  components: {
    MescrollUni
  },
  mixins: [scrollMixins],
  data() {
    return {
      form: {
        type: '01', // 01: 电子图纸, 02: 标准规范
        name: ''
      }
    }
  },
  methods: {
    handleSearchInput(e) {
      this.form[e.target.dataset.key] = e.target.value
    },
    clearForm(_key) {
      this.form.name = ''
    },
    handleSearch(_e) {
      console.log(_e)
      if (this.mescroll) {
        this.mescroll.triggerDownScroll()
      }
    },
    getListService(_page, _mescroll) {
		// wangzw
      let res = {
        list: [
          {
            name: '第一项',
            des: '描述',
            id: '01'
          },
          {
            name: '第2项',
            des: '描述',
            id: '02'
          },
          {
            name: '第3项',
            des: '描述',
            id: '03'
          }
        ]
      }
			this.loadSuccess(res.list, _page, _mescroll)
    },
    handleView(_item) {
      uni.showLoading({
        title: '正在打开文件...'
      })

      uni.downloadFile({
        // url: this.fileUrl + _item.fileName,
        url: 'http://g.hiphotos.baidu.com/image/pic/item/6d81800a19d8bc3e770bd00d868ba61ea9d345f2.jpg',
        success: function(res) {
          uni.openDocument({
            filePath: res.tempFilePath,
            success: function(res) {
              uni.hideLoading()
              console.log('打开文档成功')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../../common/common.scss';
.data-drawing-wrap {
}
</style>
