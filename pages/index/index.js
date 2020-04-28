//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    langues: null,
    tabBar: null,
    activeId: 1,
    noScroll: false,
    cartCount: 0,
  },
  // 初始化
  indexInit: function(option) {
    let langues = wx.getStorageSync('langues') || 'zh'
    if (langues == 'zh') {
      this.loadZh()
    } else if (langues == 'en') {
      this.loadEn()
    }
    const _activeId = option.activeid || 1
    this.setData({
      activeId: _activeId
    })
  },
  // 加载购物车数量
  refreshCart: function() {
    const _cartInfo = wx.getStorageSync('cartInfo') || []
    app.globalData.cartCount = _cartInfo.length
    this.setData({
      cartCount: app.globalData.cartCount
    })
  },
  // 组件变化刷新购物车数量
  comRefreshCart: function(e) {
    // console.log(e)
    this.refreshCart()
  },
  // 加载中文界面
  loadZh: function() {
    const _tabBar = [
      {
        id:1,
        title:'首页',
        icon:'iconfont iconshouye1'
      },
      {
        id: 2,
        title: '分类',
        icon: 'iconfont iconshangpin'
      },
      {
        id: 3,
        title: '推荐',
        icon: 'iconfont icontubiao303'
      },
      {
        id: 4,
        title: '购物车',
        icon: 'iconfont icongwc'
      },
      {
        id: 5,
        title: '我的',
        icon: 'iconfont iconyonghudianji'
      }
    ]
    this.setData({
      tabBar: _tabBar,
      langues: 'English'
    })
    wx.setStorageSync('langues', 'zh')
    app.globalData.appName = '企帮微商城'
    wx.setNavigationBarTitle({
      title: app.globalData.appName
    })
  },
  // 加载英文界面
  loadEn: function() {
    const _tabBar = [
      {
        id:1,
        title:'Home',
        icon:'iconfont iconshouye1'
      },
      {
        id: 2,
        title: 'Goods',
        icon: 'iconfont iconshangpin'
      },
      {
        id: 3,
        title: 'recommend',
        icon: 'iconfont icontubiao303'
      },
      {
        id: 4,
        title: 'Cart',
        icon: 'iconfont icongwc'
      },
      {
        id: 5,
        title: 'Mine',
        icon: 'iconfont iconyonghudianji'
      }
    ]
    this.setData({
      tabBar: _tabBar,
      langues: '中文'
    })
    wx.setStorageSync('langues', 'en')
    app.globalData.appName = 'QBminiMall'
    wx.setNavigationBarTitle({
      title: app.globalData.appName
    })
  },
  // 切换语言
  setLangues: function() {
   const langues = this.data.langues
   if (langues == '中文') {
      this.loadZh()
    } else if (langues == 'English') {
      this.loadEn()
    }
  },
  //切换tabbar
  switchTab: function(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    let _noScroll = id == 2?true:false
    this.setData({ 
      activeId: id,
      activeTitle: title,
      noScroll: _noScroll,
    })
    if (id == 1) {
      title = app.globalData.appName
    }
    wx.setNavigationBarTitle({
      title
    })
  },
  /**
   * 生命周期
   */
  onLoad: function (option) {
    // console.log(option)
    this.indexInit(option)
  },
  onShow: function () {
    this.refreshCart()
  },
  onReachBottom: function () {
    // recommend-list下拉触底刷新数据
    // 首页
    const pageMain = this.selectComponent('#pageMain')
    if (pageMain != undefined && pageMain != null && this.data.activeId == 1) {
      pageMain.refreshRListData()
    }
    // 推荐页
    const pageRecommend = this.selectComponent('#pageRecommend')
    if (pageRecommend != undefined && pageRecommend != null && this.data.activeId == 3) {
      pageRecommend.refreshRListData()
    }
  },
  onPageScroll:function(e){
    // 设置recommend-list组件类别栏为fixed
    // 首页
    const pageMain = this.selectComponent('#pageMain')
    if (pageMain != undefined && pageMain != null && this.data.activeId == 1) {
      pageMain.setFixed(e.scrollTop)
    }
  }, 
})
