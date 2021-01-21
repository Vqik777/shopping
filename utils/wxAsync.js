export const showModal = (content = "要删除吗") => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            content,
            success: (result) => {
                resolve(result.confirm)
            }
        });
    })
}