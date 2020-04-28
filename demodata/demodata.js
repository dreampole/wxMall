// itemlist
const getdata = k => {
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 500
  })
  let result = []
  if (k == 'ALL') {
    result = searchResult
  } else {
    for (let i in searchResult) {
      k = k.toLowerCase();
      const title = searchResult[i].title.toLowerCase();
      const desc = searchResult[i].desc.toLowerCase();
      if (title.indexOf(k) >= 0 || desc.indexOf(k) >= 0) {
        result.push(searchResult[i])
      }
    }
  }
  return result;
}
// recommendlist
const getRecommenddata = k => {
  let result = [];
  if (k == 'ALL') {
    result = searchResult
  } else {
    for (let i in searchResult) {
      k = k.toLowerCase();
      const title = searchResult[i].title.toLowerCase();
      const desc = searchResult[i].desc.toLowerCase();
      if (title.indexOf(k) >= 0 || desc.indexOf(k) >= 0) {
        result.push(searchResult[i])
      }
    }
  }
  return result;
}

const searchResult = [
  { id: 1, title: 'Apple I（1976）', unit: '台', price: 6.66, desc: '1976 年，史蒂夫 乔布斯、史蒂夫 沃兹尼亚克和罗 韦恩三人创立了苹果电脑公司并推出了首款产品 Apple I ，售价 500 美元。', sellqty: 1976, imgurl: '/demodata/imgs/apple1.jpg' },
  { id: 2, title: 'Apple II（1977）', unit: '台', price: 16.66, desc: '相比第一代苹果产品，它真的更像一台科学计算机；事实上它也被定义为全球意义上真正的第一台个人电脑。', sellqty: 1977, imgurl: '/demodata/imgs/apple2.jpg' },
  { id: 3, title: 'Lisa（1983）', unit: '台', price: 26.66, desc: '1983 年苹果 Lisa 作为世界首款图形化电脑问世，售价高达 9998 美元。', sellqty: 1983, imgurl: '/demodata/imgs/apple2-1.jpg' },
  { id: 4, title: 'Macintosh（1984）', unit: '台', price: 36.66, desc: '虽然仍是个黑白系统，但光标、窗口等元素一应俱全，对之后的桌面操作体系起到了跨时代的巨大意义（苹果）', sellqty: 1984, imgurl: '/demodata/imgs/apple3.jpg'},
  { id: 5, title: 'PowerBook（1991）', unit: '台', price: 46.66, desc: '1991 年，苹果发布 PowerBook ，作为首款便携式 Mac ，在它问世期间苹果公司还向微软开放了图形界面授权', sellqty: 1991, imgurl: '/demodata/imgs/apple4.jpg' },
  { id: 6, title: 'iMac（1998）', unit: '台', price: 56.66, desc: '苹果产品将 CRT 显示器、机箱融为一体，配以半透明外壳，带来了惊人的视觉效果', sellqty: 1998, imgurl: '/demodata/imgs/apple5.jpg' },
  { id: 7, title: 'iBook（2000）', unit: '台', price: 66.66, desc: '千禧年，iBook 闪亮出炉 ，苹果产品采用了 iMac 般的果冻外壳设计，其独特创新的风格，饱受年轻用户、艺术及设计工作者喜爱。', sellqty: 2000, imgurl: '/demodata/imgs/apple6.jpg' },
  { id: 8, title: 'PowerBook G4（2001）', unit: '台', price: 76.66, desc: '2001 年， PowerBook G4 上市，产品采用金属机身和宽屏设计，搭载最新版的苹果 Mac OS X 。', sellqty: 2001, imgurl: '/demodata/imgs/apple7.jpg' },
  { id: 9, title: 'iMac G4（2002）', unit: '台', price: 86.66, desc: '苹果iMac G4 采用了超薄的液晶屏幕，在一票 CRT 显示器电脑中无疑异常抢眼。', sellqty: 2002, imgurl: '/demodata/imgs/apple8.jpg' },
  { id: 10, title: 'Power Mac G5（2003）', unit: '台', price: 96.66, desc: 'Power Mac G5 采用了充满未来感的塔式设计，同时超酷的阳极氧化铝机箱再次彰显了苹果强大的工业设计能力。', sellqty: 2003, imgurl: '/demodata/imgs/apple9.jpg' },
  { id: 11, title: 'iMac G5（2005）', unit: '台', price: 996.66, desc: '苹果在这款电脑上明确了 iMac 系列的发展方向：大屏幕多媒体一体机，弃用了台灯设计，改为更简约的平面式风格。', sellqty: 2005, imgurl: '/demodata/imgs/apple10.jpg' },
  { id: 12, title: 'Mac mini（2005）', unit: '台', price: 9996.66, desc: 'Mac Mini 是一个苹果的一个低端系列，它就像一个便当盒般大小，同时也采用了铝合金机身，小巧、精致，并提供体面的性能。', sellqty: 2005, imgurl: '/demodata/imgs/apple11.jpg' },
  { id: 13, title: 'MacBook Pro（2006）', unit: '台', price: 9996.66, desc: '2006 年，苹果放弃 IBM 的 Power PC 处理器，转而使用英特尔产品，所以一个沿用至今的系列诞生了： MacBook Pro 打印机。', sellqty: 2006, imgurl: '/demodata/imgs/apple12.jpg' },
  { id: 14, title: 'MacBook Air（2008）', unit: '台', price: 9996.66, desc: '苹果MacBook Air超轻薄设计彻底改变了移动电脑的体验，即时到今天十年过去，也再没有能够突破这款产品的电脑上市。', sellqty: 2008, imgurl: '/demodata/imgs/apple13.png' },
  { id: 15, title: 'iMac（2013）', unit: '台', price: 9996.66, desc: '苹果将机身厚度缩减到最薄处仅为 5 毫米，同时配备了 Retina 屏幕配置，实现超清晰的视觉体验。', sellqty: 2013, imgurl: '/demodata/imgs/apple14.jpg' },
  { id: 16, title: 'Mac Pro（2014）', unit: '台', price: 3.66, desc: '苹果Mac Pro表面采用了精湛的阳极氧化铝工艺，看上去更像一个艺术品。性能方面，它配置了专业级处理器及工作站显卡，并拥有极强的扩展能力。', sellqty: 2014, imgurl: '/demodata/imgs/apple15.jpg' },
  { id: 17, title: 'MacBook（2015）', unit: '台', price: 2.66, desc: '苹果全玫瑰金 MacBook采用 12英寸屏幕，超薄机身仅有3.5毫米、重0.9公斤，即使产品仅有一个 USB 接口也依然是市场中最受关注焦点大华条码秤。', sellqty: 2015, imgurl: '/demodata/imgs/apple16.jpg' },
  { id: 18, title: 'MacBook Pro（2016）', unit: '台', price: 1.66, desc: 'MacBook Pro是在原有基础上的再创新，相较于其它苹果产品来说，这款产品实现了一个触摸屏的设计。', sellqty: 2016, imgurl: '/demodata/imgs/apple17.jpg' },
  { id: 19, title: 'iMac Pro（2017）', unit: '台', price: 0.66, desc: 'iMac Pro是苹果公司迄今为止功能最强大的台式机，售价4,999美元（33000RMB）扫描平台', sellqty: 2017, imgurl: '/demodata/imgs/apple18.png' },
]

module.exports = {
  getdata: getdata,
  getRecommenddata: getRecommenddata,
}