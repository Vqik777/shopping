import request from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "全部",
      isActive: true
    },
    {
      id: 1,
      value: "销量",
      isActive: false
    },
    {
      id: 2,
      value: "价格",
      isActive: false
    }],
    goodsList: [],
    refresherTriggered: false
  },
  params: {
    query: "",
    cid: 0,
    pagenum: 1,
    pagesize: 10
  },
  totalPage: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.params.cid = options.cid
    this.getGoodsList()
  },
  // 获取商品列表数据
  async getGoodsList() {
    let goodsList = await request("/goods/search", this.params)
    // 总页数=Math.ceil(总数量/页码)
    // 获取总数量
    let total = goodsList.total
    // 获取总页数
    this.totalPage = Math.ceil(total / this.params.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...goodsList.goods],
      refresherTriggered: false
    })
  },
  // 获取子组件传过来的值
  tabsItemEvent(event) {
    let { tabs } = this.data
    let { index } = event.detail
    tabs.forEach((v, i) => {
      i == index ? v.isActive = true : v.isActive = false
    })
    this.setData({
      tabs
    })
  },
  // 上拉加载
  handleScrolltolower() {
    if (this.totalPage <= this.params.pagenum) {
      wx.showToast({
        title: '没有更多数据',
        icon: 'none'
      });
    } else {
      this.params.pagenum++
      this.getGoodsList()
    }
  },
  // 下拉刷新
  handleRefresherrefresh() {
    this.setData({
      goodsList: []
    })
    this.params.pagenum = 1
    this.getGoodsList()
  }
})