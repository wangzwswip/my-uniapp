<template>
  <view class="image-select-wrap">
    <view class="upload-img">
      <view class="img-wrap" v-for="(item, index) in imageList" :key="index" @tap="handlePreview(index)">
        <image mode="aspectFill" :src="item"></image>

        <view class="remove-btn" @tap.stop="handleRemove(index)"></view>
      </view>
      <view class="choose-img" v-if="imageList.length < limit" @tap="handleImage">+</view>
    </view>

    <view class="image-tips">{{ imageList.length }}/{{ limit }}</view>

    <!-- <view class="upload-img" v-if="defaultImage && !image"><image mode="aspectFill" :src="defaultImage" :data-src="defaultImage"></image></view> -->
  </view>
</template>

<script>
export default {
  props: {
    defaultImage: {
      type: [String],
      default: function() {
        return ''
      }
    },
    url: {
      type: [String],
      default: function() {
        return 'https://jsonplaceholder.typicode.com/posts/'
      }
    },
    module: {
      type: [String],
      default: function() {
        return ''
      }
    },
    limit: {
      type: [Number],
      default: function() {
        return 3
      }
    }
  },
  data() {
    return {
      imageList: [],
      fileNames: [],
      header: {},
      fileUrl: ''
    }
  },
  mounted () {
    this.initUploadHeader()
  },
  methods: {
    // 文件上传header
    initUploadHeader () {
      // TODO 上线需改为正式用户
      let userToken = 'bearer 7eaae4df-c699-425b-a90b-d88e955c65f2'
      
      this.header = {
        Authorization: userToken
      }
    },
    handleImage() {
      uni.chooseImage({
        sizeType: ['compressed'],
        count: this.limit - this.imageList.length,
        success: res => {
          // 上传图片
          res.tempFilePaths.map((item, index) => {
            this.uploadFile(item)
          })
        }
      })
    },

    uploadFile(_path) {
      
      uni.uploadFile({
        url: this.url,
        filePath: _path,
        name: 'file',
        header: this.header,
        formData: {
          module: this.module
        },
        success: uploadFileRes => {
          console.log(uploadFileRes)
          let data = JSON.parse(uploadFileRes.data)
          this.imageList.push(data.reName)
          this.fileNames.push(data.reName)
          this.$emit('on-choose', this.fileNames.join(','))
          // if (data.code === 200) {
          //   console.log(JSON.parse(uploadFileRes.data))

          //   this.imageList.push(appConfig.ApiUrl + this.url + _path)
          //   this.fileNames.push(data.data)

          //   this.$emit('on-choose', this.fileNames.join(','))
          // }
        }
      })
    },
    handlePreview(_index) {
      uni.previewImage({
        current: _index,
        urls: this.imageList
      })
    },
    handleRemove(_index) {
      this.imageList.splice(_index, 1)
      this.$emit('on-choose', this.imageList)
    }
  }
}
</script>

<style lang="scss">
@import '@/common/common.scss';
.image-select-wrap {
  position: relative;
  padding-bottom: 20upx;
  width: 100%;
  .upload-img {
    display: flex;
    flex-wrap: wrap;
    > view {
      margin-bottom: 20upx;
      margin-right: 3.5%;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }

  .img-wrap {
    font-size: 0;
    image {
      height: 100%;
      width: 100%;
      border-radius: 20upx;
    }
  }

  .choose-img,
  .img-wrap {
    position: relative;
    width: 31%;
    height: 160upx;
    border-radius: 20upx;
    overflow: hidden;
  }

  .choose-img {
    border: 1upx dashed #c8c7cc;
    box-sizing: border-box;
    font-size: 80upx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ebebeb;
  }

  .remove-btn {
    position: absolute;
    right: 0;
    top: 0;
    height: 40upx;
    line-height: 40upx;
    width: 40upx;
    text-align: center;
    background: red;
    color: #fff;
    border-radius: 0 0 0 10upx;
    &:after {
      font-family: 'iconfont' !important;
      line-height: 40upx;
      width: 40upx;
      font-size: 30upx;
      font-style: normal;
      content: '\e63c';
    }
  }

  .image-tips {
    position: absolute;
    right: 0;
    bottom: 0;
    color: rgba($color: #000000, $alpha: 0.4);
    font-size: $font_h5;
    line-height: $font_h5;
  }
}
</style>
