<template>
  <view class="safety-check-wrap">
    <view>
      <darkCalendar :open="calendar.open"
                    :signeddates="calendar.signedDates"
                    @on-click="handleClick"></darkCalendar>
    </view>
    <view class="no-data-wrap"
          v-if="list.length < 1">
      <image src="/static/images/bg_nodata.png"
             mode="widthFix"></image>
    </view>
  </view>
</template>

<script>
import darkCalendar from '../../../components/common/dark-calendar/dark-calendar'

export default {
  components: {
    darkCalendar
  },
  data () {
    return {
      list: [],
      calendar: {
        open: false,
        signedDates: []
      }
    }
  },
  methods: {
    handleClick (_date) {
      console.log(_date);
    }
  }
}
</script>

<style lang="scss">
@import "../../../common/common.scss";
.safety-check-wrap {
  .uni-list-li {
    position: relative;
  }
  .remove {
    width: 180upx;
    height: 100%;
    background-color: #e52222;
    color: white;
    position: absolute;
    top: 0;
    right: -250upx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16upx;
  }
}
</style>
