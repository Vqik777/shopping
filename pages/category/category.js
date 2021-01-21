import request from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    leftMenu: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategories()
  },
  // 获取分类数据
  async getCategories(index = 0) {
    let categories = await request("/categories")
    let leftMenu = categories.map(v => v.cat_name)
    let rightContent = categories[index].children
    this.setData({
      categories,
      leftMenu,
      rightContent
    })
  },
  // 左侧菜单点击事件
  handleLeftMenuItem(event) {
    let { index } = event.currentTarget.dataset
    this.getCategories(index)
    this.setData({
      currentIndex: index,
      scrollTop: 0
    })
  }
})