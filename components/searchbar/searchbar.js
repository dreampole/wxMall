// components/searchbtn/searchbtn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btn1Show:Boolean,
    btn2Show:Boolean,
    darkColor: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 到搜索页
    goSearchPage: function() {
      wx.navigateTo({
        url: '/pages/search/search?f=search',
      })
    },
    // 到筛选页
    goFilterPage: function() {
      wx.navigateTo({
        url: '/pages/search/search?f=filter',
      })
    }, 
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    created: function () {
      // 在组件实例刚刚被创建时执行
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    ready: function () {
      // 在组件在视图层布局完成后执行
    },
    moved: function () {
      // 在组件实例被移动到节点树另一个位置时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
    error: function () {
      // 每当组件方法抛出错误时执行
    }
  },
  // 组件所在页面的生命周期
  pageLifetimes:{
    show(){
      // show
    }
  }
})
