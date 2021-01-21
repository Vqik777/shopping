import request from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsQsearch: [],
    isHideButton: true,
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  timeId: 0,
  // 获取商品搜索数据
  async getGoodsQsearch(qsearch) {
    let goodsQsearch = await request("/goods/qsearch", { query: qsearch })
    this.setData({
      goodsQsearch
    })
  },
  // 值改变事件
  handleInput(event) {
    let { value } = event.detail
    if (!value.trim()) {
      this.setData({
        goodsQsearch: [],
        isHideButton: true
      })
      return
    }
    this.setData({
      isHideButton: false
    })
    clearTimeout(this.timeId)
    this.timeId = setTimeout(() => {
      this.getGoodsQsearch(value)
    }, 300)
  },
  // 取消按钮事件
  handleButton() {
    this.setData({
      goodsQsearch: [],
      isHideButton: true,
      inputValue: ''
    })
  }
})