// components/pagecart/pagecart.js
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
    title: '购物车',
    cartInfo: null,
    showExpand: false,
    totalAmount: 0,
    totalQty: 0,
    selectAll: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 购物车初始化
    cartInit: function() {
      const _cartInfo = wx.getStorageSync('cartInfo') || []
      let _totalAmount = 0
      let _totalQty = 0
      let _selectAll = _cartInfo.length >0?true:false
      for (let i in _cartInfo) {
        _cartInfo[i].showExpand = false
        if (_cartInfo[i].active) {
          _totalQty = _totalQty*1 + _cartInfo[i].qty*1
          _totalAmount = _totalAmount + _cartInfo[i].qty*_cartInfo[i].price
        } else {
          _selectAll = false
        }
      }
      this.setData({
        cartInfo: _cartInfo,
        totalAmount: _totalAmount,
        totalQty: _totalQty,
        selectAll: _selectAll,
      })
    },
    // 修改输入数量
    qtyInput: function(e) {
      const _v = e.detail.value || 1
      const _ino = e.currentTarget.dataset.ino
      const _cartInfo = this.data.cartInfo
      let _totalAmount = 0
      let _totalQty = 0
      for (let i in _cartInfo) {
        if (_ino == _cartInfo[i].ino) {
          _cartInfo[i].qty = _v
        }
        if (_cartInfo[i].active) {
          _totalQty = _totalQty*1 + _cartInfo[i].qty*1
          _totalAmount = _totalAmount + _cartInfo[i].qty*_cartInfo[i].price
        }
      } 
      this.setData({
        cartInfo: _cartInfo,
        totalAmount: _totalAmount,
        totalQty: _totalQty,
      })
      this.write2Storage(_cartInfo)
    },
    // 修改数量+1
    qryPlus: function(e) {
      const _ino = e.currentTarget.dataset.ino
      const _cartInfo = this.data.cartInfo
      let _totalAmount = 0
      let _totalQty = 0
      for (let i in _cartInfo) {
        if (_ino == _cartInfo[i].ino) {
          _cartInfo[i].qty = _cartInfo[i].qty + 1
        }
        if (_cartInfo[i].active) {
          _totalQty = _totalQty*1 + _cartInfo[i].qty*1
          _totalAmount = _totalAmount + _cartInfo[i].qty*_cartInfo[i].price
        }
      } 
      this.setData({
        cartInfo: _cartInfo,
        totalAmount: _totalAmount,
        totalQty: _totalQty,
      })
      this.write2Storage(_cartInfo)
    },
    // 修改数量-1
    qryMinus: function(e) {
      const _ino = e.currentTarget.dataset.ino
      const _cartInfo = this.data.cartInfo
      let _totalAmount = 0
      let _totalQty = 0
      for (let i in _cartInfo) {
        if (_ino == _cartInfo[i].ino) {
          if (_cartInfo[i].qty <= 1) {
            _cartInfo[i].qty = 1
          } else {
            _cartInfo[i].qty = _cartInfo[i].qty - 1
          } 
        }
        if (_cartInfo[i].active) {
          _totalQty = _totalQty*1 + _cartInfo[i].qty*1
          _totalAmount = _totalAmount + _cartInfo[i].qty*_cartInfo[i].price
        }
      } 
      this.setData({
        cartInfo: _cartInfo,
        totalAmount: _totalAmount,
        totalQty: _totalQty,
      })
      this.write2Storage(_cartInfo)
    },
    // 选中单个购物车商品
    selectItemCart: function(e) {
      const _ino = e.currentTarget.dataset.ino
      const _cartInfo = this.data.cartInfo
      let _selectAll = true
      let _totalAmount = 0
      let _totalQty = 0
      for (let i in _cartInfo) {
        if (_ino == _cartInfo[i].ino) {
          _cartInfo[i].active = !_cartInfo[i].active
        }
        if (!_cartInfo[i].active) {
          _selectAll = false
        } else {
          _totalQty = _totalQty + _cartInfo[i].qty
          _totalAmount = _totalAmount + _cartInfo[i].qty*_cartInfo[i].price
        }
      }
      this.setData({
        cartInfo: _cartInfo,
        selectAll: _selectAll,
        totalAmount: _totalAmount,
        totalQty: _totalQty,
      })
      this.write2Storage(_cartInfo)
    },
    // 全选
    selectAllCart: function() {
      const _cartInfo = this.data.cartInfo
      if (_cartInfo == null || _cartInfo.length <=0) {
        return false
      }
      let _selectAll = this.data.selectAll
      let _totalAmount = 0
      let _totalQty = 0
      for (let i in _cartInfo) {
        if (!_selectAll) {
          _totalQty = _totalQty + _cartInfo[i].qty
          _totalAmount = _totalAmount + _cartInfo[i].qty*_cartInfo[i].price
        }
        _cartInfo[i].active = !_selectAll
      }
      this.setData({
        cartInfo: _cartInfo,
        selectAll: !_selectAll,
        totalAmount: _totalAmount,
        totalQty: _totalQty,
      })
      this.write2Storage(_cartInfo)
    },
    // 长按显示扩展功能
    showExpandFun: function(e) {
      const _ino = e.currentTarget.dataset.ino
      const _cartInfo = this.data.cartInfo
      for (let i in _cartInfo) {
        _cartInfo[i].showExpand = false
        if (_ino == _cartInfo[i].ino) {
          _cartInfo[i].showExpand = true
        }
      }
      this.setData({
        cartInfo: _cartInfo,
      })
    },
    // 关闭扩展功能
    closeExpandFun: function() {
      const _cartInfo = this.data.cartInfo
      for (let i in _cartInfo) {
        _cartInfo[i].showExpand = false
      }
      this.setData({
        cartInfo: _cartInfo,
      })
    },
    // 查相似
    searchConform: function(e) {
      const _ino = e.currentTarget.dataset.ino
      const _cartInfo = this.data.cartInfo
      for (let i in _cartInfo) {
        if (_ino == _cartInfo[i].ino) {
          wx.showToast({
            title: '未发现与['+ _cartInfo[i].name + ']相似的商品',
            icon: 'none',
            duration: 1500,
          })
        }
      }
    },
    // 查配套
    searchAssort: function(e) {
      const _ino = e.currentTarget.dataset.ino
      const _cartInfo = this.data.cartInfo
      for (let i in _cartInfo) {
        if (_ino == _cartInfo[i].ino) {
          wx.showToast({
            title: '未发现与['+ _cartInfo[i].name + ']配套的商品',
            icon: 'none',
            duration: 1500,
          })
        }
      }
    },
    // 从购物车中删除
    removeCart: function(e) {
      const _this = this
      const _ino = e.currentTarget.dataset.ino
      const _title = _ino == 'all'?'是否清空购物车':'是否确认删除'
      const _confirmText = _ino == 'all'?'确认清空':'确认删除'
      wx.showModal({
        title: _title,
        confirmText: _confirmText,
        confirmColor: '#F33B2D',
        success (res) {
          if (res.confirm) {
            _this.removeCartDone(_ino)
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    },
    // 确认删除
    removeCartDone: function(_ino) {
      const _cartInfo = this.data.cartInfo
      const new_cartInfo = []
      let _totalAmount = 0
      let _totalQty = 0
      let _selectAll = _cartInfo.length >0?true:false
      if (_ino != 'all') {
        for (let i in _cartInfo) {
          if (_ino != _cartInfo[i].ino) {
            new_cartInfo.push(_cartInfo[i])
          }
        }
        for (let i in new_cartInfo) {
          new_cartInfo[i].ino = i
          if (new_cartInfo[i].active) {
            _totalQty = _totalQty + new_cartInfo[i].qty
            _totalAmount = _totalAmount + new_cartInfo[i].qty*new_cartInfo[i].price
          } else {
            _selectAll = false
          }
        }
      } else {
        _selectAll = false
      }
      this.setData({
        cartInfo: new_cartInfo,
        totalAmount: _totalAmount,
        totalQty: _totalQty,
        selectAll: _selectAll,
      })
      this.write2Storage(new_cartInfo)
    },
    // 写入storage（及数据库）
    write2Storage: function(cartInfo) {
      wx.setStorageSync('cartInfo', cartInfo)
      this.triggerEvent('comRefreshCart', cartInfo.length)
    },
    // 商品详情页面
    goDetails: function(e) {
      const _id = e.currentTarget.dataset.id
      const _ino = e.currentTarget.dataset.ino
      wx.navigateTo({
        url: '/pages/details/details?id='+ _id + '&ino=' + _ino,
      })
    },
    // 结算
    settleAccounts: function() {
      const _userInfo = app.globalData.userInfo
      console.log(_userInfo)
      if (_userInfo == null) {
        wx.navigateTo({
          url: '/pages/index/index?activeid=5',
        })
        return false
      }
      const _cartInfo = this.data.cartInfo || []
      if (_cartInfo.length <=0) {
        return false
      }
      let _accountItems = []
      for (let i in _cartInfo) {
        if (_cartInfo[i].active) {
          _accountItems.push(_cartInfo[i])
        }
      }
      wx.setStorageSync('accountItems', _accountItems)
      wx.navigateTo({
        url: '/pages/accounts/accounts?flag=cart',
      })
    },
  },
  /**
   * 组件的生命周期
   */
  lifetimes: {
    ready: function () {
      this.cartInit()
    },
  }
})
