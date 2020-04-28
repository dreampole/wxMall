// components/pagerecommend/pagerecommend.js
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
    title: '商品推荐'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // recommend-list下拉触底刷新数据
    refreshRListData: function() {
      const recommendList = this.selectComponent('#recommendListInRPage')
      if (recommendList != undefined && recommendList != null) {
        recommendList.refreshData()
      }
    },
  }
})
