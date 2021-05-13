<template>
  <view class="data-safety-wrap">
    <view class="panel-wrap">
      <view class="panel-title">echarts1</view>
      <view class="panel-content">
        <view class="charts-wrap"><canvas canvas-id="canvasArcbar" id="canvasArcbar" class="charts-arcbar"></canvas></view>
      </view>
    </view>
    <view class="panel-wrap data__laowurenyuanfenxi">
    <view class="panel-title">劳务人员分析</view>

    <view class="panel-content">
      <view class="charts-wrap"><canvas canvas-id="canvasColumn" id="canvasColumn" class="charts-column" @touchstart="touchColumn"></canvas></view>
    </view>
  </view>
  </view>
</template>

<script>
import uCharts from '../../../components/u-charts/u-charts.js'
var _self
let canvaColumn = null
export default {
  data() {
    return {
      safeStatistic: {},
      cWidth: '', //圆弧进度图
      cHeight: '', //圆弧进度图
      cWidth2: '', //圆弧进度图
      cHeight2: '', //圆弧进度图
      arcbarWidth: '', //圆弧进度图，进度条宽度,此设置可使各端宽度一致
      safeQuestion: [],
      questionRedo: [
        {
          count: 2,
          name: 'A'
        },  
        {
          count: 1,
          name: 'B'
        },
        {
          count: 3,
          name: 'C'
        }
      ],
    }
  },
  onLoad() {
    _self = this
    this.cWidth = uni.upx2px(660) //这里要与样式的宽高对应
    this.cHeight = uni.upx2px(350) //这里要与样式的宽高对应
    this.cWidth2 = uni.upx2px(660) //这里要与样式的宽高对应
    this.cHeight2 = uni.upx2px(500) //这里要与样式的宽高对应
    this.arcbarWidth = uni.upx2px(50)
    this.showArcbar('canvasArcbar', {
      series: [
        {
          name: '整改率',
          data: 50 / 100,
          color: '#3DC68B'
        }
      ]
    })
    this.showColumn('canvasColumn', {
      categories: ['a', 'b', 'c', 'd'],
      series: [
        {
          name: 'dd',
          data: [6, 4, 6, 7]
        }
      ]
    })
  },
  methods: {
    showArcbar(canvasId, chartData) {
      new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'arcbar',
        fontSize: 11,
        legend: false,
        subtitle: {
          name: Math.round(chartData.series[0].data * 100) + '%',
          color: chartData.series[0].color,
          fontSize: 25
        },
        title: {
          name: chartData.series[0].name,
          color: '#A3A3A3',
          fontSize: 15
        },
        extra: {
          arcbar: {
            type: 'circle', //整圆类型进度条图
            width: _self.arcbarWidth, //圆弧的宽度
            startAngle: 90 //整圆类型只需配置起始角度即可
          }
        },
        background: '#FFFFFF',
        pixelRatio: 1,
        series: chartData.series,
        animation: true,
        width: _self.cWidth,
        height: _self.cHeight,
        dataLabel: true
      })
    },
    showColumn(canvasId, chartData) {
      canvaColumn = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'column',
        legend: false,
        fontSize: 11,
        background: '#FFFFFF',
        pixelRatio: 1,
        animation: true,
        categories: chartData.categories,
        series: chartData.series,
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          format:(val)=>{return val.toFixed(1)}
          //disabled:true
        },
        dataLabel: true,
        width: _self.cWidth2,
        height: _self.cHeight2,
        extra: {
          column: {
            type: 'group',
            width: (_self.cWidth2 * 0.45) / chartData.categories.length
          }
        }
      })
    },
    touchColumn(e) {
      canvaColumn.showToolTip(e, {
        format: function(item, category) {
          if (typeof item.data === 'object') {
            return category + ' ' + item.name + ':' + item.data.value
          } else {
            return category + ' ' + item.name + ':' + item.data
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/common/common.scss';
.data-safety-wrap {
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  overflow: scroll;


  .charts-arcbar {
    width: 660rpx;
    height: 350rpx;
    background-color: #ffffff;
    position: relative;
    margin-bottom: 60rpx;
  }
  .charts-wrap {
    margin-top: 60rpx;
  }

  .charts-column {
    width: 660rpx;
    height: 500rpx;
    background-color: #fff;
  }
}
</style>
