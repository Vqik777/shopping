// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectNum:0,
    historyNum:0
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo = wx.getStorageSync("userInfo") || {};
    let collect=wx.getStorageSync("collect")||[];
    let history=wx.getStorageSync("history")||[];
    this.setData({
      userInfo,
      collectNum:collect.length,
      historyNum:history.length
    })
  },

})