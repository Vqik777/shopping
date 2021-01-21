import { showModal } from "../../utils/wxAsync"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    allNumber: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取收货地址
    let address = wx.getStorageSync("address") || {};
    // 获取购物车商品
    let cart = wx.getStorageSync("cart") || [];
    this.calc(cart)
    this.setData({
      address
    })
  },
  // 添加收货地址
  handleAddressButton() {
    wx.chooseAddress({
      success: (result) => {
        wx.setStorageSync("address", result);
      }
    });
  },
  // 计算总价,总数量,全选
  calc(cart) {
    // 全选
    let allChecked = cart.length ? cart.every(v => v.checked) : false
    // 总价格和总数量
    let totalPrice = 0
    let allNumber = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num
        allNumber += v.num
      }
    })
    this.setData({
      cart,
      allChecked,
      totalPrice,
      allNumber
    })
    wx.setStorageSync("cart", cart);
  },
  // 单选
  handleDanXuan(event) {
    let { id } = event.currentTarget.dataset
    let { cart } = this.data
    let index = cart.findIndex(v => id == v.goods_id)
    cart[index].checked = !cart[index].checked
    this.calc(cart)
  },
  // 全选
  handleQuanXuan() {
    let { allChecked, cart } = this.data
    cart.forEach(v => v.checked = !allChecked)
    this.calc(cart)
  },
  // 编辑数量
  async handleEdit(event) {
    let { type, id } = event.currentTarget.dataset
    let { cart } = this.data
    let index = cart.findIndex(v => id == v.goods_id)
    if (cart[index].num == 1 && type == -1) {
      let confirm = await showModal()
      if (confirm) {
        cart.splice(index, 1)
      }
    } else {
      cart[index].num += type
    }
    this.calc(cart)
  },
  // 结算
  handlePay() {
    let { address, allNumber, totalPrice } = this.data
    if (!address.userName) {
      wx.showToast({
        title: '请先添加收货地址',
        icon: 'none'
      });
      return
    }
    if (!allNumber) {
      wx.showToast({
        title: '请先选购商品',
        icon: 'none'
      });
      return
    }
    wx.showToast({
      title: `支付了${totalPrice}元`,
      icon: 'none',
      mask: true,
    });
  }
})