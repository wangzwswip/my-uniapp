<template>
  <view class="area-wrap">
    <mix-tree :list="zones" @treeItemClick="treeItemClick" :onlyLast="true" ></mix-tree>
  </view>
</template>

<script>
import mixTree from '@/components/mix-tree'
export default {
  components: {
    mixTree
  },
  data () {
    return {
      zones: []
    }
  },
  onLoad () {
    this.getZoneTree()
  },
  methods: {
    getZoneTree () {
      setTimeout(() => {
        this.zones = [
        {
          id: '01',
          name: 'A',
          rate: 1,
          children: [
            {
              id: '0101',
              name: 'b',
              rate: 3
            },
            {
              id: '0102',
              name: 'c',
              rate: 3
            }
          ]
        },
        {
          id: '02',
          name: 'D',
          rate: 1,
          children: [
            {
              id: '0201',
              name: 'e',
              rate: 3
            },
            {
              id: '0202',
              name: 'f',
              rate: 3
            }
          ]
        }
      ]
      }, 200)
    //   this.$http
    //     .getAllZone()
    //     .then(res => {
    //       console.log(res)
    //       this.zones = res.datas
    //     })
    //     .catch(e => {
    //       uni.showToast({
    //         icon: 'none',
    //         title: '网络请求出错...'
    //       })
    //     })
    },
    treeItemClick (_zone) {
      this.$store.dispatch('setZone', {
        zoneName: _zone.name,
        zoneId: _zone.id
      })
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss"></style>
