import { showModal } from "../../utils/wxAsync"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let history = wx.getStorageSync("history") || [];
    this.setData({
      history
    })
  },
  // 清空历史足迹
  async handleClearButton() {
    let confirm = await showModal()
    if (confirm) {
      wx.setStorageSync("history", []);
      this.setData({
        history: []
      })
    }
  }
})