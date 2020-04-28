const item_details = { //产品product
  "Id": "01001", //产品Id
  "name": "E5双屏触摸屏", //产品名
  "product_tags": [ //产品标签，从类别拉取
    "颜色",
    "内存",
    "尺寸",
    "硬盘",
    "重量"
  ],
  "description": "Win7操作系统，17寸触摸屏",
  "iOrderAsc": 2, //排序序号
  "product_type_id": "0002", //类别Id
  "iStopSale": 0, //是否停售
  "product_linkids": [ //关联产品Id
    "01002",
    "01007"
  ],
  "product_images": [ //产品图片
    {
      "iNo": 1, //排序序号
      "img_url": "/demodata/imgs/apple16.jpg"
    },
    {
      "iNo": 2,
      "img_url": "/demodata/imgs/apple18.png"
    },
    {
      "iNo": 3,
      "img_url": "/demodata/imgs/apple12.jpg"
    },
    {
      "iNo": 4,
      "img_url": "/demodata/imgs/apple5.jpg"
    },
    {
      "iNo": 5,
      "img_url": "/demodata/imgs/apple11.jpg"
    },
    {
      "iNo": 6,
      "img_url": "/demodata/imgs/apple13.png"
    },
  ],
  "product_introduction_imgs": [ //产品介绍图片
    {
      "iNo": 1,
      "img_url": "/demodata/imgs/introduction1.jpg"
    },
    {
      "iNo": 2,
      "img_url": "/demodata/imgs/introduction2.jpg"
    },
    {
      "iNo": 3,
      "img_url": "/demodata/imgs/introduction3.jpg"
    },
    {
      "iNo": 4,
      "img_url": "/demodata/imgs/introduction4.jpg"
    },
    {
      "iNo": 5,
      "img_url": "/demodata/imgs/iphone.jpg"
    },
  ],
  "cover_image_url": "http://0.jpg",
  "product_price": { //产品价格，指定某个商品价格作为产品价格
    "Id": "shidhe277aask4af0fih", //价格Id
    "base_price": 1200, //基本价格(从ERP拉取的标准价)
    "online_price": 1195, //商城展示价格
    "member_price": 1190,//会员价
    "sell_price": 1190 //实际销售价
  },
  "product_additions": [ //产品附加属性：包装清单，注意事项质保期等
    {
      "param_type": "包装清单",
      "param_data": [
        {
          "Tag": "触摸屏",
          "Value": "1台"
        },
        {
          "Tag": "电源线",
          "Value": "1根"
        },
        {
          "Tag": "产品手册",
          "Value": "1本"
        }
      ]
    },
    {
      "param_type": "注意事项",
      "param_data": [
        {
          "Tag": "电源",
          "Value": "需接地"
        },
        {
          "Tag": "显示屏",
          "Value": "易碎，不得挤压变形"
        },
        {
          "Tag": "质保",
          "Value": "整体3年，显示屏1年"
        }
      ]
    }
  ],
  "product_remark": [ //产品标记，与类别类似，但可以更加灵活，主要用于检索及归类
    "收款机",
    "触摸屏",
    "电子秤"
  ],
  "update_emp": "张三",
  "update_date": "2020-04-10 09:00:00.421",
  //商品Item
  "items": [
    {
      "Id": "248gx73asfh2884ausaif", //商品Id
      "Name": "双屏触摸屏",
      "item_erp": { //ERP商品
        "erp_id": "010006",
        "erp_name": "双屏触摸屏"
      },
      "price": {
        "Id": "shidhe277aask4af0fih", //价格Id
        "price_tag": "白色4G内存",// 商品价格对应的规格标签，例如：黑色4G内存、白色256G固态硬盘，不同的规格标签对应不同的商品及价格,由用户选择配置规格
        "base_price": 1200, //基本价格(从ERP拉取的标准价)
        "online_price": 1195, //商城展示价格
        "member_price": 1190, //会员价格
        "sell_price": 1190, //实际销售价
        "score": 10, //所得积分
        "setting_tags": [ //参数数组
          {
            "Tag": "颜色",
            "Vale": "白"
          },
          {
            "Tag": "内存",
            "Vale": "4G"
          },
          {
            "Tag": "硬盘",
            "Vale": "32G 固态"
          },
          {
            "Tag": "显示屏",
            "Vale": "单屏 17寸"
          }
        ]
      },
      "limit_qty": 200, //商品限购数量，0：不限购，大于0：限购数量
      "isTC": 1, //是否套餐，0：非，1：是，默认0
      "isSecKill": 1,//是否秒杀商品，0：非，1：是，默认0
      "secKillInfo": { //秒杀信息 相同设置（售价、限购等)以秒杀信息为主
        "Id": "3jsa7swt2sbawzam0abf", //秒杀Id
        "seckill_price": 1050, //秒杀价，秒杀商品售价
        "limit_qty": 2, //秒杀商品限购数量 限购数量，0：不限购，大于0：限购数量
        "start_time": "2020-04-10 09:00:00.421",//秒杀开始时间
        "end_time": "2020-04-10 09:30:00.421",//秒杀截止时间
        "update_emp": "某人",
        "update_date": "2020-04-10 09:00:00.421"
      },
      "item_package": [ //套餐内容
          {
            "Id": "278dxbjageosjaak3ita", //入套餐商品Id
            "name": "新大陆D2扫描枪",
            "quantity": 1,
            "img_url": "https://005",
            "description": "条码二维码通用扫描枪"
          },
          {
            "Id": "asjq23ujjagq73sagq7aha2am",
            "name": "芯烨58IIH小票打印机",
            "quantity": 1,
            "img_url": "https://007",
            "description": "小票打印机"
          }
        ],
      "item_fullCut": { //满减信息
        "Id": "sksywqieo2956sdks367as", //满减设置Id
        "whileDoValues": [ //满减设置
          {
            "while_value": 500,
            "do_value": 50
          },
          {
            "while_value": 1000,
            "do_value": 120
          },
          {
            "while_value": 2000,
            "do_value": 260
          }
        ],
        "start_time": "2020-04-10 09:00:00.421",
        "end_time": "2020-04-20 09:00:00.421"
      },
      "update_emp": "张三",
      "update_date": "2020-04-10 09:00:00.421"
    }
  ]
}

module.exports = {
  itemDetails: item_details,
}