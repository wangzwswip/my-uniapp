<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./common/common.scss";
	@import "./common/public.scss";
	
	body,
	page {
		font-size: $font_h5;
		min-height: 100%;
		display: flex;
		color: #333;
	}
	page {
  > view {
    width: 100%;
    background: #fff;
  }
}
</style>
