export default {
  data () {
    return {
      list: [],
      loading: false,
      mescroll: null,
      upOption: {
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 20 // 每页数据的数量,默认10
        },
        noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
        textNoMore: '没有更多数据了',
        empty: {
          fixed: true,
          top: "30%"
        }
      }
    }
  },
  methods: {
    mescrollInited (_mescroll) {
      this.mescroll = _mescroll
    },
    downCallback (_mescroll) {
      // 下拉事件
      this.getList('down', _mescroll)
    },

    upCallback (_mescroll) {
      // 上拉事件
      this.getList('up', _mescroll)
    },
    // 处理下拉，上拉逻辑
    getList (_action, _mescroll) {
      if (this.loading) {
        _mescroll.endSuccess()
        return
      }
      this.loading = true

      if (_action === 'down') {

        this.list = []

        _mescroll.resetUpScroll()

        this.getListService({
          pageSize: 20,
          pageNum: 1
        }, _mescroll)

      } else {

        if (this.list.length < 1) {
          _mescroll.endSuccess(this.list.length)
          return
        }

        this.getListService({
          pageSize: _mescroll.size,
          current: _mescroll.num
        }, _mescroll)
      }
    },
    loadSuccess (res, _page, _mescroll) {
      console.log(_mescroll)
      this.loading = false
      this.list = this.list.concat(res)
        _mescroll.endSuccess(res.length)
    },
    loadError (e, _page, _mescroll) {

      this.loading = false

      _mescroll.endErr()

      uni.showToast({
        icon: 'none',
        mask: true,
        title: '网络请求出错...'
      })
    }
  }
}
