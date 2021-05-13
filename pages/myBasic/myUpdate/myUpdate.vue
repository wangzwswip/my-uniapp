<template>
  <view class="update">
    <button type="primary" disabled="true" @click="getLatestVersion">检查更新</button>
  </view>
</template>

<script>
import checkVersionMixins from '../../../mixins/checkVersionMixins'
export default {
  mixins: [checkVersionMixins],
  onLoad () {

  },
  methods: {
    
  }
}
</script>

<style lang='scss' scoped>
.update {
  width: 100%;
  height: 300rpx;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
