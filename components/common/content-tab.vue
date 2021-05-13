<template>
  <view class="content-tab__wrap clearfix"
        :class="[flex ? 'content-tab__flex-wrap' : '', theme]">
    <view v-for="(tab, index) in tabs"
          :key="index"
          @tap="handleTab(tab, index)"
          :class="action == index ? 'selected' : ''">
      <view class="text">
        {{ tab.title }}
        <view class="reddot-number"
              v-if="tab.dot && tab.dot > 0">{{ tab.dot }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'content-tab',
  props: {
    theme: {
      type: [String],
      default: function () {
        return ''
      }
    },
    flex: {
      type: [Boolean],
      default: function () {
        return false
      }
    },
    tabs: {
      type: [Array],
      default: function () {
        return []
      }
    },
    defaultAction: {
      type: [Number, String],
      default: function () {
        return 0
      }
    }
  },
  data () {
    return {
      action: 0
    }
  },
  watch: {
    defaultAction: function (v) {
      this.action = v
    }
  },
  mounted () {
    this.action = this.defaultAction
  },
  methods: {
    handleTab (_tab, _index) {
      console.log(_tab, _index)
      this.action = _index
      this.$emit('handle-tap', {
        tab: _tab,
        index: _index
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/common.scss";

.content-tab__wrap {
  width: 100%;
  display: flex;
  overflow-x: auto;
  &.content-tab__flex-wrap {
    > view {
      flex: 1;
      margin-right: 0;
      padding: 0;
    }
  }

  &.blue {
    background: $color_1;
    > view {
      color: #fff;
      &.selected {
        color: #fff;
        &:after {
          background: #fff;
        }
      }
    }
  }

  > view {
    margin-right: 30upx;
    padding: 0 30upx;
    font-size: $font_h4;
    text-align: center;
    line-height: 50upx;
    color: rgba($color: #000, $alpha: 0.5);

    &:last-child {
      margin-right: 0;
    }

    &.selected {
      color: $color_1;

      &:after {
        content: " ";
        display: block;
        width: 45upx;
        height: 4upx;
        background: $color_1;
        border-radius: 4upx;
        margin: auto;
      }
    }

    .text {
      position: relative;
      display: inline-block;
      white-space: nowrap;

      .reddot-number {
        position: absolute;
        right: -10upx;
        top: 0;
        margin-top: 10upx;
        height: 30upx;
        line-height: 30upx;
        padding: 0 10upx;
        border-radius: 30upx;
        background: #fb5959;
        color: #fff;
        font-size: $font_h7;
        text-align: center;
        transform: translateX(100%);
      }
    }
  }
}
</style>
