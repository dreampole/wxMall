// components/typelist/typelist.js
const app = getApp()
const demodata = require('../../demodata/demodata.js')

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
    listType: null,
    listItems: null,
    scrollTop: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加载数据
    loadData: function() {
      const _listType = [
        { id: 1, text: '触摸一体机', tip: '猜你喜欢', active: true},
        { id: 2, text: '超市收款机', tip: '疯狂优惠', active: false},
        { id: 3, text: '小票打印机', tip: '猜你喜欢', active: false},
        { id: 4, text: '手持点菜机', tip: '猜你喜欢', active: false},
        { id: 5, text: '扫描设备', tip: '猜你喜欢', active: false},
        { id: 6, text: '餐饮软件', tip: '猜你喜欢', active: false},
        { id: 7, text: '超市软件', tip: '猜你喜欢', active: false},
        { id: 8, text: '条码秤', tip: '猜你喜欢', active: false},
        { id: 9, text: '收银秤', tip: '猜你喜欢', active: false},
        { id: 10, text: '条码打印机', tip: '猜你喜欢', active: false},
        { id: 11, text: '技术服务', tip: '猜你喜欢', active: false},
        { id: 12, text: '技术服务', tip: '猜你喜欢', active: false},
        { id: 13, text: '技术服务', tip: '猜你喜欢', active: false},
        { id: 14, text: '技术服务', tip: '猜你喜欢', active: false},
        { id: 15, text: '技术服务', tip: '猜你喜欢', active: false},
      ]
      this.setData({
        listType: _listType,
      })
      this.loadItems()
    },
    // 按类别查询
    switchType: function(e) {
      const _id = e.currentTarget.dataset.id
      const _listType = this.data.listType 
      // const _scrollTop = _id <= 3 ? 0 : (_id - 1) * 30
      for (let i in _listType) {
        if (_id == _listType[i].id) {
          _listType[i].active = true
        } else {
          _listType[i].active = false
        }
      }
      this.setData({
        listType: _listType,
        // scrollTop: _scrollTop,
      })
      this.loadItems()
    },
    // 查询商品数据
    loadItems: function(){
      const _this = this
      let _listItems = demodata.getdata('').reverse()
      _this.setData({
        listItems: [],
      })
      setTimeout(() => {
        _this.setData({
          listItems: _listItems,
        })
      }, 500)
    },
    // 商品详情页面
    goDetails: function(e) {
      const _id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/details/details?id='+ _id,
      })
    },
    // 下拉触底刷新数据
    refreshData: function() {
      console.log('到底')
    },
    // 加入购物车
    addCart: function() {
      wx.showToast({
        title: 'success',
      })
    }
  },
  lifetimes: {
    ready: function () {
      this.loadData()
    },
  }
})
