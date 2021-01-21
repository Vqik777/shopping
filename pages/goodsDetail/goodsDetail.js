import request from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    isCollect: false
  },
  params: {
    goods_id: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1]
    let options = currentPage.options
    this.params.goods_id = options.goodsid
    this.getGoodsDetail()
  },
  // 获取商品详情数据
  async getGoodsDetail() {
    let goodsDetail = await request("/goods/detail", this.params)
    // 是否收藏
    let collect = wx.getStorageSync("collect") || [];
    let isCollect = collect.some(v => v.goods_id == goodsDetail.goods_id)
    // 历史足迹
    let history = wx.getStorageSync("history") || [];
    let isHistory = history.some(v => v.goods_id == goodsDetail.goods_id)
    if (!isHistory) {
      history.push(goodsDetail)
    }
    wx.setStorageSync("history", history);
    this.setData({
      goodsDetail,
      isCollect
    })
  },
  // 图片预览
  handlePreviewImage(event) {
    let { goodsDetail } = this.data
    let { index } = event.currentTarget.dataset
    let urls = goodsDetail.pics.map(v => v.pics_mid)
    wx.previewImage({
      current: urls[index],
      urls
    });

  },
  // 加入购物车
  handleCart() {
    let { goodsDetail } = this.data
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id == goodsDetail.goods_id)
    if (index == -1) {
      goodsDetail.num = 1
      goodsDetail.checked = true
      cart.push(goodsDetail)
    } else {
      cart[index].num++
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入购物车',
      mask: true
    });

  },
  // 收藏
  handleCollect() {
    let { isCollect, goodsDetail } = this.data
    let collect = wx.getStorageSync("collect") || [];
    let index = collect.findIndex(v => v.goods_id == goodsDetail.goods_id)
    if (!isCollect) {
      collect.push(goodsDetail)
      isCollect = true
    } else {
      collect.splice(index, 1)
      isCollect = false
    }
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    })
  },
  // 立即购买
  handleBuy(){
    let {goodsDetail}=this.data
    wx.showToast({
      title: `支付了${goodsDetail.goods_price}元`,
      icon: 'none',
      mask: true
    });
      
      
  }
})