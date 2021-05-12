<template>
  <view class="content">
    <view class="mix-tree-list">
      <block v-for="(item, index) in treeList" :key="index">
        <view class="mix-tree-item"
          :style="[
            {
              paddingLeft: item.rank * 15 + 'px',
              zIndex: item.rank * -1 + 50
            }
          ]"
          :class="{
            border: treeParams.border === true,
            show: item.show,
            last: item.lastRank,
            showchild: item.showChild
          }"
          @click.stop="treeItemTap(item, index)">
          <image class="mix-tree-icon" :src="item.lastRank ? treeParams.lastIcon : item.showChild ? treeParams.currentIcon : treeParams.defaultIcon">
          </image>
          {{ item.name }}
        </view>
      </block>
    </view>
  </view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			params: {
				type: Object,
				default () {
					return {}
				}
			},
			onlyLast: {
				type: Boolean,
				default () {
					return false
				}
			},
			specialKey: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				treeList: [],
				treeParams: {
					defaultIcon: '/static/images/tree/i2.png', // 默认图标
					currentIcon: '/static/images/tree/i1.png', // 展开图标
					lastIcon: '/static/images/tree/i3.png', //最后一级图标
					border: true // 边框
				}
			}
		},
		watch: {
			list(list) {
				this.treeParams = Object.assign(this.treeParams, this.params)
				this.treeList = []
				this.renderTreeList(list)
			}
		},
	  methods: {
			//扁平化树结构
			renderTreeList(list = [], rank = 0, parentId = []) {
				list.forEach(item => {
					let obj = {
						id: item.id,
						name: item.name,
						rate: item.rate,
						parentId, // 父级id数组
						rank, // 层级
						showChild: true, //子级是否显示
						show: true // 自身是否显示
					}
					// 如果传入了控制字段，添加筛选字段，没这个字段的项点击不返回
					if (this.specialKey) {
						obj[this.specialKey] = item[this.specialKey]
					}
					this.treeList.push(obj)
					if (Array.isArray(item.children) && item.children.length > 0) {
						let parents = [...parentId]
						parents.push(item.id)
						this.renderTreeList(item.children, rank + 1, parents)
					} else {
						this.treeList[this.treeList.length - 1].lastRank = true
					}
				})
			},
			// 点击
			treeItemTap(item) {
				let list = this.treeList
				let id = item.id
				if (this.onlyLast) {
					if (this.specialKey) {
							if (item.lastRank && item[this.specialKey]) {
								this.$emit('treeItemClick', item)
							}
					} else {
						if (item.lastRank) {
							this.$emit('treeItemClick', item)
						}
					}
					
				} else {
					if (this.specialKey) {
							if (item[this.specialKey]) {
								this.$emit('treeItemClick', item)
							}
					} else {
						this.$emit('treeItemClick', item)
					}
				}
			}
		}
	}
</script>

<style lang="scss">
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.mix-tree-list {
	width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 30rpx;
}

.mix-tree-item {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  color: #333;
  height: 0;
  opacity: 0;
  transition: 0.2s;
  position: relative;
}

.mix-tree-item.border {
  border-bottom: 1px solid #eee;
}

.mix-tree-item.show {
  height: 80rpx;
  opacity: 1;
}

.mix-tree-icon {
  width: 26rpx;
  height: 26rpx;
  margin-right: 8rpx;
  opacity: 0.9;
}

.mix-tree-item.showchild:before {
  transform: rotate(90deg);
}

.mix-tree-item.last:before {
  opacity: 0;
}
</style>
