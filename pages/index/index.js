import request from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperdata: [],
    catitems: [],
    floordata: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperdata()
    this.getCatitems()
    this.getFloordata()
  },
  // 获取轮播图数据
  async getSwiperdata() {
    let swiperdata = await request("/home/swiperdata")
    this.setData({
      swiperdata
    })
  },
  // 获取导航栏数据
  async getCatitems() {
    let catitems = await request("/home/catitems")
    this.setData({
      catitems
    })
  },
  // 获取楼层数据
  async getFloordata() {
    let floordata = await request("/home/floordata")
    let id = 0
    floordata.map(v => v.id = id++)
    this.setData({
      floordata
    })
  }
})