// components/pagemine/pagemine.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    title: '我的',
    userInfo: null,
    userImageNo: '/imgs/nouser.png',
    userImage: '/imgs/user.jpg',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    orderInfo: null,
    couponsInfo: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 我的初始化
    mineInit: function() {
      this.initUserInfo()
      // 订单
      const _orderInfo = [
        {id: 1, name: '待付款', icon: 'iconfont icondaifukuan'},
        {id: 2, name: '待收货', icon: 'iconfont icondaishouhuo'},
        {id: 3, name: '待评价', icon: 'iconfont icondaipingjia'},
        {id: 4, name: '退换/售后', icon: 'iconfont iconsh'},
      ]
      // 卡券
      const _couponsInfo = [
        {id: 1, name: '优惠券', qty: 0, unit: '张'},
        {id: 2, name: '代金券', qty: 0, unit: '张'},
        {id: 3, name: '红包', qty: 0, unit: '个'},
        {id: 4, name: '账户余额', qty: 0, unit: '元'},
      ]
      this.setData({
        orderInfo: _orderInfo,
        couponsInfo: _couponsInfo,
      })
    },
    // initUserInfo
    initUserInfo: function () {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse){
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    },
    // getUserInfo
    getUserInfo: function(e) {
      // console.log(e)
      if (e.detail.errMsg == 'getUserInfo:ok') {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
      } 
    },
    // exitUserInfo
    exitUserInfo: function() {
      app.globalData.userInfo = null
      this.setData({
        userInfo: null,
        hasUserInfo: false
      })
    },
    // showDetial
    showDetial: function() {
      wx.showToast({
        title: '都是空的',
        icon: 'none',
        duration: 1000,
      })
    }
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    ready: function () {
      this.mineInit()
    },
  }
})
