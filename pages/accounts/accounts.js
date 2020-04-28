// pages/accounts/accounts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: null,
    receiver: null,
    accountItems: null,
    cargoTerminal: null,
    cargoTerminalIndex: 0,
    couponsInfo: null,
    costInfo: null,
    realAmount: null,
    preAmount: null,
  },
  // 页面初始化
  accountsInit: function(options) {
    console.log(options)
    const _flag = options.flag || ''
    // 收货人信息
    const _receiver = {name: '收货人', phone: '133****5612', addr: '辽宁省沈阳市和平区三好街54号'}
    // 订单商品信息
    const _accountItems = wx.getStorageSync('accountItems') || []
    // 快递货站信息
    const _cargoTerminal = ['请选择配送方式','金正','百世','雨佳','顺丰','申通','德邦','EMS','自提']
    // 优惠劵信息
    const _couponsInfo = [
      {id: 1, name: '优惠劵', amount: 0},
      {id: 2, name: '代金劵', amount: 0},
      {id: 3, name: '红包', amount: 0},
    ]
    // 费用信息
    let _costInfo = [
      {id :1, name: '商品金额', sign: '', amount: 0},
      {id :2, name: '优惠额', sign: '-', amount: 0},
      {id :3, name: '运费', sign: '+', amount: 0},
    ] 
    // 应收金额
    let _realAmount = 0
    // 优惠额
    let _preAmount = 0
    // 初始化计算各种金额
    for (let i in _accountItems) {
      _realAmount = _realAmount + _accountItems[i].qty * _accountItems[i].price
    }
    _costInfo[0].amount = _realAmount
    this.setData({
      flag: _flag,
      receiver: _receiver,
      accountItems: _accountItems,
      cargoTerminal: _cargoTerminal,
      couponsInfo: _couponsInfo,
      costInfo: _costInfo,
      realAmount: _realAmount,
      preAmount: _preAmount,
    })

    const _title = '确认订单'
    wx.setNavigationBarTitle({
      title: _title,
    })
  },
  // 选择快递货站
  cargoTerminalChange: function(e) {
    const _index = e.detail.value
    // console.log(_index)
    const _cargoTerminal = [
      {id: 0, name: '请选择配送方式', cost: 0},
      {id: 1, name: '金正', cost: 10},
      {id: 2, name: '百世', cost: 11},
      {id: 3, name: '雨佳', cost: 12},
      {id: 4, name: '顺丰', cost: 13},
      {id: 5, name: '申通', cost: 14},
      {id: 6, name: '德邦', cost: 15},
      {id: 7, name: 'EMS', cost: 16},
      {id: 8, name: '自提', cost: 0},
    ]
    let _realAmount = this.data.realAmount
    let _costInfo = this.data.costInfo
    for (let i in _cargoTerminal) {
      if (_index == _cargoTerminal[i].id) {
        _costInfo[2].amount = _cargoTerminal[i].cost
      }
    }
    _realAmount = _costInfo[0].amount - _costInfo[1].amount + _costInfo[2].amount
    this.setData({
      cargoTerminalIndex: _index,
      costInfo: _costInfo,
      realAmount: _realAmount,
    })
  },
  // 显示地址编辑界面
  showAddr: function() {
    wx.showToast({
      title: '暂时无法编辑地址',
      icon: 'none',
      duration: 1000,
    })
  },
  // 显示优惠劵界面
  showCoupons: function(e) {
    const _name = e.currentTarget.dataset.name
    wx.showToast({
      title: '无可用' + _name,
      icon: 'none',
      duration: 1000,
    })
  },
  // 付款
  goPay: function() {
    if (this.data.cargoTerminalIndex == 0) {
      wx.showToast({
        title: '请选择配送方式',
        icon: 'none',
        duration: 1000,
      })
      return false
    }
    if (this.data.flag == 'cart') {
      const _cartInfo = wx.getStorageSync('cartInfo')
      let new_cartInfo = []
      for (let i in _cartInfo) {
        console.log(_cartInfo[i].active)
        if (!_cartInfo[i].active) {
          new_cartInfo.push(_cartInfo[i])
        }
      }
      for (let i in new_cartInfo) {
        new_cartInfo[i].ino  = i
      }
      wx.setStorageSync('cartInfo', new_cartInfo)
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.accountsInit(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})