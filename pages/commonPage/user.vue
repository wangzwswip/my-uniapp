<template>
  <view class="admin-user-wrap page-search-wrap">
    <view class="page-search">
      <view class="search-form">
        <view class="search-input">
          <view class="clear-search-item"
            v-if="form.name"
            @tap.stop="clearForm('name')"></view>
          <input type="text"
            :value="form.name"
            @input="handleSearchInput"
            data-key="name"
            placeholder="请输入" />
        </view>
      </view>
      <view class="search-btn" @tap="handleSearch">查询</view>
    </view>
    <view class="page-body">
      <mescroll-uni @init="mescrollInited"
                    @down="downCallback"
                    :up="upOption"
                    @up="upCallback"
                    :fixed="false">
        <view class="uni-list-ul">
          <view class="uni-list-li"
                v-for="user in list"
                :key="user.id"
                @tap="handleTap(user)">
            <view class="uni-list-name">
              <view class="list-name-title">{{ user.nickname }}（{{ user.mobile }}）</view>
              <view class="list-status blue">{{ user.roles }}</view>
            </view>
          </view>
        </view>
      </mescroll-uni>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import MescrollUni from '@/components/common/mescroll-uni/mescroll-uni.vue'
import scrollMixins from '@/mixins/scrollMixins.js'
export default {
  components: {
    MescrollUni
  },
  mixins: [scrollMixins],
  data () {
    return {
      key: '',
      form: {
        name: ''
      },
      obj: {
        list: [
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          }
        ]
      },
      list: [
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '01',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '02',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '03',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '04',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '05',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '06',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '07',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '08',
            roles: 'a'
          }
        ]
    }
  },
  onLoad (_options) {
    this.key = _options.key
    // this.getFZR()
  },
  methods: {
    
    getFZR (_page, _mescroll) {
      const query = {
        current: 1,
        limit: 999,
        name: this.name,
        offset: 0
      }
      this.obj = {
        list: [
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            roles: 'a'
          }
        ]
      }
      this.loadSuccess(this.obj, _page, _mescroll)
      // this.$http.getshr(query).then(res => {
      //   console.log(res)
      //   this.obj.list = res.datas
      //   this.loadSuccess(this.obj, _page, _mescroll)
      // })
    },
    handleSearchInput (e) {
      this.form[e.target.dataset.key] = e.target.value
    },
    clearForm (_key) {
      this.form.name = ''
    },
    handleSearch (_e) {
      console.log(_e)
      if (this.mescroll) {
        this.mescroll.triggerDownScroll()
      }
    },
    handleTap (_item) {
      this.$store.dispatch('setUsers', {
        key: this.key,
        value: _item
      })
      uni.navigateBack()
    },
    getListService ( _page, _mescroll) {
      let res = [
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '01',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '02',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '03',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '04',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '05',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '06',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '07',
            roles: 'a'
          },
          {
            nickname: 'xxx',
            mobile: '1234',
            id: '08',
            roles: 'a'
          }
        ]
      this.loadSuccess (res, _page, _mescroll)
    }
  }
}
</script>

<style lang="scss">
@import "../../common/public.scss";
.admin-user-wrap {
}
</style>
