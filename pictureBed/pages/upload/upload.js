// pages/upload/upload.js
const qiniuUploader = require("../../utils/qiniuUploader");
// 初始化七牛相关参数
function initQiniu() {
    var options = {
        region: 'SCN', // 
        uptoken: 'EgWJOo-144oVkEGua-A5j06LT8-vHCDHeVtA78Y6:k5LVpCSv-9tyFc9Kh1P_bfIy2_k=:eyJzY29wZSI6ImJpbmctaGVhbHRoLXNwYWNlIiwiZGVhZGxpbmUiOjE2NTQ5NDA0NDh9',
        // uptoken: 'xxxx',
        domain: 'http://cdn.bing6749.cn/',
        // bucket:'bing-health-space'
    };
    qiniuUploader.init(options);
}
//获取应用实例
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        src: "",
        imageObject: {}
    },

    gotoShow: function () {
        var _this = this
        wx.chooseImage({
            count: 1, // 最多可以选择的图片张数，默认9
            sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function (res) {
                // success
                console.log(res)
                _this.setData({
                    src: res.tempFilePaths
                })
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log('onLoad')
        var that = this;
    },
    didPressChooesImage: function () {
        var that = this;
        didPressChooesImage(that);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },
    copyImageUrl: function () {
        console.log(this.data.imageObject.imageURL)
       wx.setClipboardData({
         data: this.data.imageObject.imageURL,
         success: function (res) {
           wx.getClipboardData({
             //这个api是把拿到的数据放到电脑系统中的
             success: function (res) {
               console.log(res.data) // data
               wx.showToast({
                 title: '复制成功',
               })
             }
           })
         }
       })
     },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    
});

function didPressChooesImage(that) {
    initQiniu();
    // 微信 API 选文件
    wx.chooseImage({
            count: 1,
            success: function (res) {
                var filePath = res.tempFilePaths[0];
                // 交给七牛上传
                qiniuUploader.upload(filePath, (res) => {
                    that.setData({
                        'imageObject': res
                    });
                }, (error) => {
                    console.error('error: ' + JSON.stringify(error));
                });
            }
        }
        // , {
        //   region: 'ECN',
        //   domain: 'balxqjka.btk.clouddn.com',
        //   uptokenURL: 'myServer.cpm/api/uptoken'
        // }
    )
}