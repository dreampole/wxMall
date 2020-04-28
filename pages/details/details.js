// pages/details/details.js
const app = getApp()
const demodetails = require('../../demodata/demodetails.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topbarShow: false,
    details: null,
    priceMain: 0,
    collectStatus: false,
    itemRights: null,
    btnShow: false,
    // 商品介绍
    introduceTitle: null,
    introduceIndex: 1,
    pdcImgHeight: 0,
    productIntroductionImgs: [],
    saledText: '售后政策',
    // 底部购买栏
    cartCount: 0,
    selectviewShow: false,
    selectItems: null,
    selectedItem: null,
    selectedQty: 1,
    cartTemp: null,
  },
  // 页面初始化
  detailsInit: function(options) {
    // 商品详情
    const _details = demodetails.itemDetails
    // itemRights
    const _itemRights = [
      { id: 1, title: '商家发货&售后' },
      { id: 2, title: '七天无理由退货' },
      { id: 3, title: '100%正品保证' },
      { id: 4, title: '48小时快速退款' },
    ]
    // 商品介绍功能title
    const _introduceTitle = [
      { id: 1, title: '商品介绍' },
      { id: 2, title: '商品属性' },
      { id: 3, title: '售后保障' },
    ]
    // 商品介绍图片
    const _productIntroductionImgs = _details.product_introduction_imgs
    // 售后政策
    const _saledText = '售后政策售后政策售后政策售后政策售后政策售后政策售后政策售后政策售后政策售后政策售后政策'
    // 商品规格型号颜色
    // 
    const _selectItems = [
      { id: 1, info: "【32G 固态 + 4G内存】 白色 17寸单屏", price: 1200, qty: 1, imgUrl: '/demodata/imgs/apple13.png', active: false},
      { id: 2, info: "【32G 固态 + 4G内存】 白色 17寸双屏", price: 1250, qty: 1, imgUrl: '/demodata/imgs/apple5.jpg', active: false},
      { id: 3, info: "【64G 固态 + 4G内存】 金色 17寸单屏", price: 1450, qty: 1, imgUrl: '/demodata/imgs/apple16.jpg', active: false},
      { id: 4, info: "【64G 固态 + 4G内存】 金色 17寸双屏", price: 1550, qty: 1, imgUrl: '/demodata/imgs/apple1.jpg', active: false},
      // { id: 5, info: "金色 17寸双屏", price: 1550, qty: 1, imgUrl: '/demodata/imgs/apple1.jpg', active: false},
      // { id: 6, info: "金色 17寸双屏", price: 1550, qty: 1, imgUrl: '/demodata/imgs/apple1.jpg', active: false},
      // { id: 7, info: "金色 17寸双屏", price: 1550, qty: 1, imgUrl: '/demodata/imgs/apple1.jpg', active: false},
      // { id: 8, info: "金色 17寸双屏", price: 1550, qty: 1, imgUrl: '/demodata/imgs/apple1.jpg', active: false},
    ]
    // 选中的商品
    _selectItems[0].active = true
    const _selectedItem = _selectItems[0]
    // 显示的价格
    const _priceMain = _selectedItem.price
    this.setData({
      details: _details,
      priceMain: _priceMain,
      itemRights: _itemRights,
      introduceTitle: _introduceTitle,
      productIntroductionImgs: _productIntroductionImgs,
      saledText: _saledText,
      selectItems: _selectItems,
      selectedItem: _selectedItem,
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
  // 返回上一页
  goBack: function() {
    wx.navigateBack({
      complete: (res) => {
        if (res.errMsg != 'navigateBack:ok') {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
      },
    })
  },
  // 商品收藏
  itemCollect: function() {
    const _title = this.data.collectStatus?'取消搜藏成功':'收藏成功'
    const _collectStatus = !this.data.collectStatus
    wx.showToast({
      title: _title,
      icon: 'none',
      duration: 1000,
    })
    this.setData({
      collectStatus: _collectStatus
    })
  },
  // 商品介绍选项卡切换 
  switchIntroduce: function(e) {
    const _id = e.currentTarget.dataset.id
    this.setData({
      introduceIndex: _id
    })
  },
  // 商品介绍图片加载获取宽高 
  pdcImageLoad: function(e) {
    const _productIntroductionImgs = this.data.productIntroductionImgs
    const _iNo = e.currentTarget.dataset.ino
    const _height = e.detail.height
    for (let i in _productIntroductionImgs) {
      if (_iNo == _productIntroductionImgs[i].iNo) {
        _productIntroductionImgs[i].height = _height
      }
    }
    this.setData({
      productIntroductionImgs: _productIntroductionImgs,
    })
  },
  // 显示规格数量选择界面
  showSelectView: function(e) {
    this.setData({
      selectviewShow: true,
    })
    const _f = e.currentTarget.dataset.f || null
    let _btnShow = false
    if (_f == 'cart') {
      _btnShow = true
    }
    this.setData({
      btnShow: _btnShow,
    })
  },
  // 关闭规格数量选择界面
  closeSelectView: function() {
    this.setData({
      selectviewShow: false,
    })
  },
  // 到首页
  goMainPage: function() {
    wx.redirectTo({
      url: '/pages/index/index?activeid=1',
    })
  },
  // 购物车
  goCartPage: function() {
    wx.navigateTo({
      url: '/pages/index/index?activeid=4',
    })
  },
  // 加入购物车
  joinToCart: function() {
    const _cartInfo = wx.getStorageSync('cartInfo') || []
    const _selectedItem = this.data.selectedItem
    _selectedItem.ino = _cartInfo.length
    _selectedItem.id = this.data.details.Id
    _selectedItem.name = this.data.details.name
    _selectedItem.description = this.data.details.description
    _cartInfo.push(_selectedItem)
    wx.setStorageSync('cartInfo',_cartInfo)
    this.setData({
      cartCount: _cartInfo.length,
    })
    this.closeSelectView()
    wx.showToast({
      title: '成功加入购物车',
      icon: 'success',
      duration: 1000,
    })
  },
  // 结算（立即购买）
  settleAccounts: function() {
    const _userInfo = app.globalData.userInfo
    console.log(_userInfo)
    if (_userInfo == null) {
      wx.navigateTo({
        url: '/pages/index/index?activeid=5',
      })
      return false
    }
    let _accountItems = this.data.selectedItem
    _accountItems.ino = 0
    _accountItems.id = this.data.details.Id
    _accountItems.name = this.data.details.name
    _accountItems.description = this.data.details.description
    wx.setStorageSync('accountItems', [_accountItems])
    wx.navigateTo({
      url: '/pages/accounts/accounts',
    })
  },
  // 选择颜色规格型号
  selectItem: function(e) {
    const _id = e.currentTarget.dataset.id
    const _selectItems = this.data.selectItems
    let _selectedItem = this.data.selectedItem
    for (let i in _selectItems) {
      _selectItems[i].active = false
      if (_id == _selectItems[i].id) {
        _selectItems[i].active = true
        _selectedItem = _selectItems[i]
      }
    }
    this.setData({
      selectItems: _selectItems,
      selectedItem: _selectedItem,
      priceMain: _selectedItem.price,
    })
  },
  // 数量
  qtyInput: function(e) {
    const _v = e.detail.value
    let _selectedItem = this.data.selectedItem
    _selectedItem.qty = _v
    this.setData({
      selectedQty: _v,
      selectedItem: _selectedItem,
    })
  },
  // 数量+
  qryPlus: function() {
    let _selectedQty = this.data.selectedQty
    _selectedQty = _selectedQty*1 + 1
    let _selectedItem = this.data.selectedItem
    _selectedItem.qty = _selectedQty
    this.setData({
      selectedQty: _selectedQty,
      selectedItem: _selectedItem,
    })
  },
  // 数量-
  qryMinus: function() {
    if (this.data.selectedQty == 1) {
      return false
    }
    let _selectedQty = this.data.selectedQty
    _selectedQty = _selectedQty*1 - 1
    let _selectedItem = this.data.selectedItem
    _selectedItem.qty = _selectedQty
    this.setData({
      selectedQty: _selectedQty,
      selectedItem: _selectedItem,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.detailsInit(options)
  },
  onShow: function () {
    this.refreshCart()
  },
  // 滚动条拉过图片显示标题栏
  onPageScroll:function(e){
    let _topbarShow = false
    if (e.scrollTop >= 375) {
      _topbarShow = true
    }
    this.setData({
      topbarShow: _topbarShow
    })
  }
})