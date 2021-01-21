let flag = 0
export default (url, data = {}, method = "GET") => {
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    flag++
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + url,
            data,
            method,
            success: (result) => {
                resolve(result.data.message)
                flag--
                if (flag == 0) {
                    wx.hideLoading()
                }
            },
            fail: (err) => {
                reject(err)
            }
        });
    })
}