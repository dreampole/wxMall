//app.js
App({
  // 获取登录信息(发送 res.code 到后台换取 openId, sessionKey, unionId)
  login: function() {
    const _this = this
    wx.login({
      success: res => {
        console.log(res)
      }
    })
  },
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // this.login()
  },
  globalData: {
    // 购物车数量
    cartCount: 0,
    // 基本属性
    appId: wx.getAccountInfoSync().miniProgram.appId,
    appDefaultName: '高仿微商城',
    userInfo: null,
    openId: null,
    unionid: null,
  }
})