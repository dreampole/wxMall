// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSearch: false,
    isFilter: false,
    isResult: false,
    searchObj: null,
    // search-page 数据
    keyWord: '',
    searchHistory: null,
    searchHot: null,
    // filter-page 数据
    conditionsPrice: null,
    leftPrice: '',
    rightPrice: '',
    filterConditions: null,
    showBackBtn: false,
    // result-page 数据
    btn1Show: false,
    btn2Show: true,
    darkColor: false,

  },
  // 页面初始化
  searchInit: function(options) {
    const _isSearch = options.f == 'search'? true : false
    const _title = options.f == 'search'? '关键字查询' : '条件查询'
    const _keyword = options.keyword || null
    this.setData({
      isSearch: _isSearch,
      isFilter: !_isSearch,
      isResult: false,
    })
    wx.setNavigationBarTitle({
      title: _title,
    })
    if (_isSearch) {
      this.loadHistory()
      this.loadHot()
      this.autoKeySearch(_keyword)
    } else {
      this.laodConditions()
    }    
  },
  /**
   * 搜索页面
   */
  // 获取搜索框输入内容
  searchInput: function(e) {
    const _v = e.detail.value.trim()
    this.setData({
      keyWord: _v,
    })
  },
  // 搜索
  searchGo: function() {
    let _searchObj = {}
    _searchObj.mode = 'search'
    _searchObj.keyWord = this.data.keyWord
    this.saveHistory(this.data.keyWord)
    this.setData({
      searchObj: _searchObj,
      isSearch: false,
      isFilter: false,
      isResult: true,
      darkColor: true,

    })
    wx.setNavigationBarTitle({
      title: '关键字查询结果',
    })
  },
  // 清空搜索框
  clearKeyWord:function() {
    this.setData({
      keyWord: '',
    })
  },
  // 外部关键词连接自动搜索
  autoKeySearch: function(keyword) {
    if (keyword == null || keyword.length <=0) {
      return false
    }
    this.setData({
      keyWord: keyword
    })
    setTimeout(() => {
      this.searchGo()
    }, 100)
  },
  // 加载搜索历史
  loadHistory: function() {
    const _searchHistory= wx.getStorageSync('searchHistory') || []
    this.setData({
      searchHistory: _searchHistory
    })
  },
  // 保存搜索历史
  saveHistory: function(word) {
    if (word == undefined || word == null || word.length <=0) {
      return false
    }
    const _searchHistory= wx.getStorageSync('searchHistory') || []
    let repeated = false
    for (let i in _searchHistory) {
      if (word == _searchHistory[i].word) {
        repeated = true
      }
    }
    if (!repeated) {
      _searchHistory.push({word: word})
    }
    this.setData({
      searchHistory: _searchHistory
    })
    wx.setStorageSync('searchHistory', _searchHistory)
  },
  // 清空搜索历史
  clearHistory: function() {
    wx.removeStorageSync('searchHistory')
    this.setData({
      searchHistory: []
    })
  },
  // 按搜索历史或热搜关键字搜索
  searchByWord:function(e) {
    const _keyWord = e.currentTarget.dataset.word
    if (_keyWord == undefined || _keyWord == null) {
      return false
    }
    this.setData({
      keyWord: _keyWord
    })
    this.searchGo()
  },
  // 加载热搜商品
  loadHot: function() {
    const _searchHot1 = [
      {word: '打印机'},{word: '刷卡器'},{word: '扫描枪'},{word: '扫描平台'},{word: '触摸屏'},{word: 'pos机'},{word: '一体秤'},{word: '收银秤'},{word: '条码秤'},{word: '条码打印机'},{word: '餐饮软件'},{word: '超市软件'}
    ]
    const _searchHot2 = [
      {word: 'apple'},{word: '苹果'},{word: '大屏幕多媒体一体机'},{word: '阳极氧化铝机箱'},{word: 'Mac'},{word: 'iBook'},{word: 'MacBook'},{word: 'OS'},{word: '台式机'},{word: '笔记本'},{word: '英特尔'},{word: 'PC'},{word: '超清晰'},{word: '专业级处理器'},{word: '艺术'},
    ]
    const _searchHot = this.data.searchHot == null || this.data.searchHot.length == 15 ? _searchHot1 : _searchHot2
    this.setData({
      searchHot: _searchHot
    })
  }, 
  /**
   * 筛选页面（条件查询）
   */
  // 筛选
  filterGo: function() {
    let _searchObj = {}
    _searchObj.mode = 'search'
    _searchObj.keyWord = ''
    // _searchObj.filter1 = ''
    // _searchObj.filter2 = ''
    // _searchObj.filter3 = ''
    this.setData({
      searchObj: _searchObj,
      isSearch: false,
      isFilter: false,
      isResult: true,
      darkColor: true,
      showBackBtn: false,
    })
    wx.setNavigationBarTitle({
      title: '条件查询结果',
    })
  },
  // 加载筛选条件
  laodConditions: function() {
    const _conditionsPrice = [
      {id: 1, text: '0-500', price1: 0, price2: 500, selected: false},
      {id: 2, text: '500-1000', price1: 500, price2: 1000, selected: false},
      {id: 3, text: '1000-5000', price1: 1000, price2: 5000, selected: false},
      {id: 4, text: '5000-10000', price1: 5000, price2: 10000, selected: false},
      {id: 5, text: '10000-50000', price1: 10000, price2: 50000, selected: false},
    ]
    const _filterConditions = [
      {
        id: 1, 
        title: '品牌', 
        words: [
          {word: '新大陆', selected: false},
          {word: '佳博', selected: false},
          {word: '新野', selected: false},
          {word: '大华', selected: false},
          {word: '顶尖', selected: false},
          {word: '苹果', selected: false},
        ]
      },
      {
        id: 2, 
        title: '规格', 
        words: [
          {word: '80mm', selected: false},
          {word: '58mm', selected: false},
          {word: '30kg', selected: false},
          {word: '15kg', selected: false},
          {word: '12寸', selected: false},
        ]
      },
      {
        id: 3, 
        title: '功能', 
        words: [
          {word: '打印', selected: false},
          {word: '扫描', selected: false},
          {word: '称重', selected: false},
          {word: '触摸', selected: false},
          {word: '液晶屏幕', selected: false},
          {word: '图形界面', selected: false},
          {word: 'USB', selected: false},
          {word: '超清晰', selected: false},
        ]
      },
    ]
    this.setData({
      conditionsPrice: _conditionsPrice,
      filterConditions: _filterConditions,
    })
  },
  // 选中价格区间 
  priceSelected: function(e) {
    const _id = e.currentTarget.dataset.id
    const _conditionsPrice = this.data.conditionsPrice
    let _leftPrice = ''
    let _rightPrice = ''
    for(let i in _conditionsPrice) {
      _conditionsPrice[i].selected = false
      if (_id == _conditionsPrice[i].id) {
        _conditionsPrice[i].selected = ! _conditionsPrice[i].selected
        _leftPrice = _conditionsPrice[i].price1
        _rightPrice = _conditionsPrice[i].price2
      }
    }
    this.setData({
      conditionsPrice: _conditionsPrice,
      leftPrice: _leftPrice,
          rightPrice: _rightPrice,
    })
  },
  // 选中筛选条件
  wordSelected: function(e) {
    const _word = e.currentTarget.dataset.word
    if (_word == undefined || _word == null) {
      return false
    } 
    const _filterConditions = this.data.filterConditions
    for(let i in _filterConditions) {
      for(let j in _filterConditions[i].words) {
        if (_word == _filterConditions[i].words[j].word) {
          _filterConditions[i].words[j].selected = !_filterConditions[i].words[j].selected
        }
      }
    }
    this.setData({
      filterConditions: _filterConditions,
    })
  },
  // 重置筛选条件
  resetSelected: function() {
    const _filterConditions = this.data.filterConditions
    for(let i in _filterConditions) {
      for(let j in _filterConditions[i].words) {
        _filterConditions[i].words[j].selected = false
      }
    }
    const _conditionsPrice = this.data.conditionsPrice
    for(let i in _conditionsPrice) {
      _conditionsPrice[i].selected = false
    }
    this.setData({
      filterConditions: _filterConditions,
      conditionsPrice: _conditionsPrice,
      leftPrice: '',
      rightPrice: '',

    })
  },
  // 关闭筛选界面
  closeFilter: function() {
    this.setData({
      isSearch: false,
      isFilter: false,
      isResult: true,
    })
  },
  /**
   * other
   */
  // 显示搜索页面
  goSearchPage: function() {
    let options = {}
    options.f = 'search'
    this.searchInit(options)
  },
  // 显示筛选页面
  goFilterPage: function() {
    let options = {}
    options.f = 'filter'
    this.searchInit(options)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.searchInit(options)
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