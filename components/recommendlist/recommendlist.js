// components/recommendlist/recommendlist.js
const app = getApp()
const demodata = require('../../demodata/demodata.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    viewFixed: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    listType: null,
    listItems: null,
    viewMTop: 0,
    scrollLeft: 0,
    showLoading: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加载数据
    loadData: function() {
      const _viewMTop = this.properties.viewFixed?'90rpx':'0'
      const _listType = [
        { id: 1, text: '精选', tip: '猜你喜欢', active: true},
        { id: 2, text: '秒杀', tip: '疯狂优惠', active: false},
        { id: 3, text: '打印机', tip: '猜你喜欢', active: false},
        { id: 4, text: 'POS机', tip: '猜你喜欢', active: false},
        { id: 5, text: '扫描枪', tip: '猜你喜欢', active: false},
        { id: 6, text: '触摸屏', tip: '猜你喜欢', active: false},
        { id: 7, text: '条码称', tip: '猜你喜欢', active: false},
        { id: 8, text: '收银秤', tip: '猜你喜欢', active: false},
        { id: 9, text: '条码机', tip: '猜你喜欢', active: false},
      ]
      this.setData({
        listType: _listType,
        viewMTop: _viewMTop,
      })
      this.loadItems()
    },
    // 按类别查询
    switchType: function(e) {
      const _id = e.currentTarget.dataset.id
      const _listType = this.data.listType 
      const _scrollLeft = _id <= 3 ? 0 : (_id - 1) * 60
      for (let i in _listType) {
        if (_id == _listType[i].id) {
          _listType[i].active = true
        } else {
          _listType[i].active = false
        }
      }
      this.setData({
        listType: _listType,
        scrollLeft: _scrollLeft,
      })
      this.loadItems()
    },
    // 查询商品数据
    loadItems: function(){
      const _this = this
      let _listItems1 = []
      let _listItems2 = []
      let data = demodata.getRecommenddata('').reverse()
      // for (let i in data) {
      //   if ((data[i].id)%2 == 1) {
      //     _listItems1.push(data[i])
      //   } else {
      //     _listItems2.push(data[i])
      //   }
      // }
      const _listItems = this.data.listItems
      if (_listItems == null) {
        let data = demodata.getRecommenddata('').reverse()
        for (let i in data) {
          if ((data[i].id)%2 == 1) {
            _listItems1.push(data[i])
          } else {
            _listItems2.push(data[i])
          }
        }
      } else {
        _listItems1 = _listItems[0].reverse()
        _listItems2 = _listItems[1].reverse()
      }
      _this.setData({
        listItems: [ _listItems1, _listItems2],
      })
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
    // 设置类别栏固定
    setFixed: function(scrolltop, pageIndex) {
      // console.log('scroll:'+scrolltop)
      const _this = this
      if (pageIndex == 1) {
        if (scrolltop >= 300) {
          _this.setData({
            viewFixed: true,
          })
        } else {
          _this.setData({
            viewFixed: false
          })
        }
      }
      /*
      const recommendList = _this.createSelectorQuery()
      recommendList.select('#typeView').boundingClientRect()
      recommendList.exec(function (res) {
        console.log('top:'+res[0].top)
        if (res[0].top <= 110) {
          _this.setData({
            viewFixed: true
          })
        }
      })
      */
    },
  },
  lifetimes: {
    ready: function () {
      this.loadData()
    },
  }
})

