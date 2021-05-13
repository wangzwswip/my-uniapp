export default {
  data() {
    return {
      versionInfo: {},
      dialogOptions: {
        textAlign: '',
        confirmText: '',
        cancelText: '',
        showCancel: false,
        version: '',
        texts: ''
      },
      showUpdate: false
    }
  },
  methods: {
    getLatestVersion(_showToast) {
      this.$http
        .getLatestVersion()
        .then(res => {
          this.versionInfo = res

          plus.runtime.getProperty(plus.runtime.appid, (inf) => {
            // 检查当前版本是否是新版
            if (this.checkVersion(inf.version, res.version)) {
              if (_showToast) {
                this.showVersionDialog({
                  version: inf.version,
                  texts: ['当前已是最新版本!']
                })
              }

              return
            }

            // 更新弹框
            this.showNewDialog({
              version: res.version,
              texts: res.log
            })
          })

        })
        .catch(e => {
          uni.showToast({
            icon: 'none',
						mask: true,
            title: '检查更新请求出错...'
          })
        })
    },

    showVersionDialog(_info) {
      this.dialogOptions = {
        textAlign: 'center',
        confirmText: '我知道了',
        cancelText: '',
        showCancel: false,
        version: _info.version,
        texts: _info.texts
      }
      this.showUpdate = true
    },

    showNewDialog(_info) {

      let texts = []

      if (_info.texts) {
        texts = _info.texts.split(';')
      }

      this.dialogOptions = {
        textAlign: 'left',
        confirmText: '立即更新',
        cancelText: '跳过更新',
        showCancel: true,
        version: _info.version,
        texts: texts
      }
      this.showUpdate = true
    },
    getAppFileServer() {
			uni.getSystemInfo({
				success: function(e) {
					let appVersion = e.platform
					if (appVersion !== 'android') {
						let appleId= 1529086114
						plus.runtime.launchApplication({
								action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
						}, function(e) {
								console.log('Open system default browser failed: ' + e.message);
						});
					} else {
						this.$http
						  .getAppFileServer()
						  .then(res => {
								this.downloadApp(res, this.versionInfo.file)
						  })
						  .catch(e => {
						    uni.showToast({
						      icon: 'none',
									mask: true,
						      title: '网络请求出错...'
						    })
						  })
					}
				}
			})
    },
    downloadApp(_fileServer, _fileName) {
      let url = _fileServer + _fileName // 下载文件地址  
      let dtask = plus.downloader.createDownload(url, {}, (d, status) => {
        if (status == 200) { // 下载成功  
          let path = d.filename
          plus.runtime.install(path)
        } else { // 下载失败  
          uni.showToast({
            icon: 'none',
						mask: true,
            title: '下载新版本失败'
          })
        }
      });
      dtask.start()
    },

    handleDialog(_action) {
      this.showUpdate = false

      if (_action === 'confirm' && this.dialogOptions.showCancel) {
        this.getAppFileServer()
      }

    },
    // async getCurrentVersion() {
    //   let wgtVer = ''
    //   await
    //   return wgtVer
    // },
    checkVersion(currVersion, targetVersion) {
      if (!currVersion || !targetVersion) return false;
      var curr = currVersion.split('.');
      var target = targetVersion.split('.');
      for (var i = 0; i < curr.length; i++) {
        if (parseInt(curr[i]) > parseInt(target[i])) {
          return true
        }
        if (parseInt(curr[i]) < parseInt(target[i])) {
          return false
        }
      }
      return true
    }
  }
}
