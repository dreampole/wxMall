// components/itemlist/itemlist.js
const util = require('../../utils/util.js')
const demodata = require('../../demodata/demodata.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchData: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 排序栏顶部位置
    sortTop: '90rpx',
    // 列表顶部位置
    listMTop:'170rpx',
    listPTop:'0',
    listRow: 1,
    searchResult: [],
    searchBaseResult: [],
    resultSort: [
      { id: 1, name: '名称'},
      { id: 2, name: '价格'},
      { id: 3, name: '销量'},
      { id: 4, name: '最新'},
    ],
    resultNull: false,
    activeSortId: 1,
    sortArrow: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加载数据
    loadData: function(str) {
      const _this = this
      const _listPTop = _this.data.listRow == 1?'0':'10rpx'
      let _searchResult = demodata.getdata(str);
      let _resultNull = _searchResult == null || _searchResult.length <=0
      setTimeout(function () {
        _this.setData({
          searchResult: _searchResult,
          searchBaseResult: _searchResult,
          resultNull: _resultNull,
          listPTop: _listPTop,
        });
      },500);
    },
    // 结果数据排序 
    resultSortAction: function(e) {
      let _activeSortId = e.currentTarget.dataset.id;
      let sorttitle = 'title';
      if (_activeSortId == 1) sorttitle = 'title';
      if (_activeSortId == 2) sorttitle = 'price';
      if (_activeSortId == 3) sorttitle = 'sellqty';
      if (_activeSortId == 4) sorttitle = 'sellqty';
      let _sortArrow = '↑';
      let _searchResult = util.sortAsc(this.data.searchBaseResult, sorttitle);
      if (this.data.sortArrow == '↑') {
        _sortArrow = '↓';
        _searchResult = util.sortDesc(this.data.searchBaseResult, sorttitle);
      };
      this.setData({
        activeSortId: _activeSortId,
        sortArrow: _sortArrow,
        searchResult: _searchResult
      });
    },
    // 商品详情页面
    goDetails: function(e) {
      const _id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/details/details?id='+ _id,
      })
    },
    // 加入购物车
    addCart: function() {
      wx.showToast({
        title: 'success',
      })
    },
  },
  lifetimes: {
    ready: function () {
      // console.log('ready:在组件在视图层布局完成后执行')
      const _searchData = this.properties.searchData
      this.loadData(_searchData.keyWord)
    },
  }
})
