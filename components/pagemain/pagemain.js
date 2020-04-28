// components/pagemain/pagemain.js
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
    title: '',
    ggImgs:[
      {id: 1, url: '/imgs/gg/gg1.jpg'},
      {id: 2, url: '/imgs/gg/gg2.jpg'},
      {id: 3, url: '/imgs/gg/gg3.jpg'},
    ],
    contactInfo: {
      logo: '/imgs/user.jpg',
      phone: '133****5566',
      addr: '辽宁省沈阳市和平区三好街',
      wxAppId: '1'
    },
    fastBtn: [
      [
        {id: 1, icon: '促销', title: '促销1', bgcolor: 'rgb(0, 152, 207)'},
        {id: 2, icon: '促销', title: '促销2', bgcolor: 'rgb(21, 220, 155)'},
        {id: 3, icon: '促销', title: '促销3', bgcolor: 'rgb(248, 156, 49)'},
        {id: 4, icon: '促销', title: '促销4', bgcolor: 'rgb(243, 59, 45)'},
      ],
      [
        {id: 5, icon: '促销', title: '促销5', bgcolor: 'rgb(253, 63, 67)'},
        {id: 6, icon: '促销', title: '促销6', bgcolor: 'rgb(254, 103, 154)'},
        {id: 7, icon: '促销', title: '促销7', bgcolor: 'rgb(79, 190, 253)'},
        {id: 8, icon: '促销', title: '促销8', bgcolor: 'rgb(116, 223, 50)'},
      ]
    ],
    hotWords: [
      { id:1, word: '打印机' },
      { id:2, word: '触摸屏' },
      { id:3, word: '条码秤' },
      { id:4, word: '扫描平台' },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 组件初始化
    mainInit: function() {
      this.setData({
        title: app.globalData.appDefaultName,
      })
    },
    // 跳转到地图
    goMap: function() {
      wx.navigateTo({
        url: '/pages/map/map',
      })
    },
    // 拨打电话
    callMe: function() {
      const _phoneNumber = this.data.contactInfo.phone
      wx.makePhoneCall({
        phoneNumber: _phoneNumber,
      })
    },
    // 跳转到代理商中心小程序
    wxMe: function() {
      const _appId = this.data.contactInfo.wxAppId
      wx.navigateToMiniProgram({
        appId: _appId,
        envVersion: 'develop',
        success(res) {
          console.log('跳转成功');
        },
        fail(res) {
          console.log(res);
          wx.showToast({
            title: res.errMsg,
            icon: 'none',
            duration:2000,
          })
        }
      })
    },
    // 点击热搜关键字搜索
    hotSearch: function(e) {
      const _word = e.currentTarget.dataset.word
      wx.navigateTo({
        url: '/pages/search/search?f=search&keyword=' + _word,
      })
    },
    // 点击促销按钮
    showFastBtn: function(e) {
      const _id = e.currentTarget.dataset.id
      wx.showToast({
        title: '还没有促销' + _id,
        icon: 'none',
        duration: 1000,
      })
    },
    // recommend-list下拉触底刷新数据
    refreshRListData: function() {
      const recommendList = this.selectComponent('#recommendList')
      if (recommendList != undefined && recommendList != null) {
        recommendList.refreshData()
      }
    },
    // 设置recommend-list组件类别栏为fixed
    setFixed: function(scrollTop) {
      const recommendList = this.selectComponent('#recommendList')
      if (recommendList != undefined && recommendList != null) {
        recommendList.setFixed(scrollTop, 1)
      }
    },
  },
  /**
   * 组件的生命周期
   */
  lifetimes: {
    ready: function () {
      this.mainInit()
    },
  }
})
