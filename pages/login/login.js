// pages/login/login.js
Page({
  handleGetuserinfo(event){
    let userInfo=event.detail.userInfo
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})