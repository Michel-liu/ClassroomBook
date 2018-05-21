var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data: {
    login: wx.getStorageSync('firstlogin'),
    title:"&emsp;&emsp;本系统是为北京交通大学计算机学院开发的，针对人群是计算机学院各个班级、社团组织的负责人，为大家提供方便的在线预约教室功能。"
    +"\n&emsp;&emsp;您在首次使用时会出现这个界面，本程序因为涉及到分配问题，需要大家的信息来确定教室的负责人，所以需要大家点击下方的授权登陆按钮"+
    "\n&emsp;&emsp;您在使用中有任何建议，可以联系团委提出。我们在后续的改进中会逐步完善。谢谢您的使用。",
    listData: [
      { "time": "8:00\n|\n9:00", "innerHTML": ["","","","","","",""], "index": "0" },
      { "time": "9:00\n|\n10:00", "innerHTML": ["", "", "", "", "", "", ""], "index": "1"  },
      { "time": "10:00\n|\n11:00", "innerHTML": ["", "", "", "", "", "", ""], "index": "2"  },
      { "time": "11:00\n|\n12:00", "innerHTML": ["", "", "", "", "", "", ""], "index": "3"  },
      { "time": "12:00\n|\n13:00", "innerHTML": ["", "", "", "", "", "", ""], "index": "4"  },
      { "time": "13:00\n|\n14:00", "innerHTML": ["", "", "", "", "", "", ""], "index": "5"  },
      { "time": "14:00\n|\n15:00", "innerHTML": ["", "", "", "", "", "", ""], "index": "6"  },
      { "time": "15:00\n|\n16:00", "innerHTML": ["", "", "", "", "", "", ""], "index": "7"  },
      { "time": "16:00\n|\n17:00", "innerHTML": ["", "", "", "", "", "", ""], "index": "8"  },
      { "time": "17:00\n|\n18:00", "innerHTML": ["", "", "", "", "", "", ""], "index": "9"  },
      { "time": "18:00\n|\n19:00", "innerHTML": ["", "", "", "", "", "", ""], "index": "10"  },
      { "time": "19:00\n|\n20:00", "innerHTML": ["", "", "", "", "", "", ""], "index": "11"  },
      { "time": "20:00\n|\n21:00", "innerHTML": ["", "", "", "", "", "", ""], "index": "12"  },
      { "time": "21:00\n|\n22:00", "innerHTML": ["", "", "", "", "", "", ""], "index": "13"  }
    ],
    array: ['机械Z310(39人)', '逸夫YF601(70人)', '逸夫YF614(100人)', '东区DQ412(70人)','东区DQ319(70人)',"九教北307B"],
    objectArray: [
      {
        id: 0,
        name: '机械Z310(39人)'
      },
      {
        id: 1,
        name: '逸夫YF601(70人)'
      },
      {
        id: 2,
        name: '逸夫YF614(100人)'
      },
      {
        id: 3,
        name: '东区DQ412(70人)'
      },
      {
        id :4,
        name: '东区DQ319(70人)'
      },
      {
        id:5,
        name: '九教北307B'
      }
    ],
    index: 0,
    data:["","","","","","",""],
    detail:["","","","","","",""],
    bookInfo:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
  },
  onLoad:function(e) {
    qcloud.setLoginUrl(config.service.loginUrl)
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess("登录成功")
          wx.setStorageSync("END_t", result);
          qcloud.request({
            url: config.service.requestUrl,
            success: function (response) {
              wx.setStorageSync('userInfo_t', response)
            }
          })
        }
      },
      fail(error) {
        wx.setStorageSync('firstlogin','false')
        console.log('Login error', error)
      }
    })
  },
  onShow:function(e){
   var data=["","","","","","",""];
   var detail = ["","","","","","",""];
   var day_chaina = [6,0,1,2,3,4,5]
   var day = new Date();
   for (var i = day_chaina[day.getDay()]; i < 7; i++)
   {
      detail[i] = (new Date(new Date().setDate(new Date().getDate() + i - day_chaina[day.getDay()])).getMonth() + 1) + "/" + new Date(new Date().setDate(new Date().getDate() + i - day_chaina[day.getDay()])).getDate();
   }
   for (var i = 0; i < day_chaina[day.getDay()]; i++)
   {
      data[i] = "下";
      detail[i] = ((new Date(new Date().setDate(new Date().getDate() + i + 7 - day_chaina[day.getDay()]))).getMonth() + 1) + "/" + (new Date(new Date().setDate(new Date().getDate() + i + 7 - day_chaina[day.getDay()]))).getDate();
   }
   this.setData({
     data: data,
     detail:detail,
     index:0
   })

   var timeZoon = [[],[],[],[],[],[],[]];
   var temp = [[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
   wx.checkSession({
    success:function(){
      wx.request({
        url: config.service.searchClass,
        data: {
          "place":0
        },
        method:'POST',
        header:{
          'content-type': 'application/json'
        },
        success: function(response){
          console.log(response)
          timeZoon[0] = response.data.data['monday'];
          timeZoon[1] = response.data.data['tuesday'];
          timeZoon[2] = response.data.data['wednessday'];
          timeZoon[3] = response.data.data['thursday'];
          timeZoon[4] = response.data.data['friday'];
          timeZoon[5] = response.data.data['saturday'];
          timeZoon[6] = response.data.data['sunday'];
          console.log(timeZoon);
          for (var i = 0; i <= 13; i++)
          {
            for (var j = 0; j <= 6; j++)
            {
              if (timeZoon[j]['time'+String(i+1)]==1)
              {
                temp[i][j] = "占用";
              } else {
                temp[i][j] = "";
              }
            }
          }
          console.log(temp);
          getCurrentPages()[0].setData({
            listData:[
              { "time": "8:00\n|\n9:00", "innerHTML": temp[0], "index": "0" },
              { "time": "9:00\n|\n10:00", "innerHTML": temp[1], "index": "1"  },
              { "time": "10:00\n|\n11:00", "innerHTML": temp[2], "index": "2"  },
              { "time": "11:00\n|\n12:00", "innerHTML": temp[3], "index": "3"  },
              { "time": "12:00\n|\n13:00", "innerHTML": temp[4], "index": "4"  },
              { "time": "13:00\n|\n14:00", "innerHTML": temp[5], "index": "5"  },
              { "time": "14:00\n|\n15:00", "innerHTML": temp[6], "index": "6"  },
              { "time": "15:00\n|\n16:00", "innerHTML": temp[7], "index": "7"  },
              { "time": "16:00\n|\n17:00", "innerHTML": temp[8], "index": "8"  },
              { "time": "17:00\n|\n18:00", "innerHTML": temp[9], "index": "9"  },
              { "time": "18:00\n|\n19:00", "innerHTML": temp[10], "index": "10"  },
              { "time": "19:00\n|\n20:00", "innerHTML": temp[11], "index": "11"  },
              { "time": "20:00\n|\n21:00", "innerHTML": temp[12], "index": "12"  },
              { "time": "21:00\n|\n22:00", "innerHTML": temp[13], "index": "13"  }
            ]
          })
        },
        fail:function(response){
          console.log(response)
        }
      })
    },
    fail:function(){
      qcloud.setLoginUrl(config.service.loginUrl)
      qcloud.login()
    }
  });
  // for (var i = 0;i <=13;i++)
  // {
  //   for (var j = 0; j <= 6; j++)
  //   {
  //     if (timeZoon[j]["time1"]==1)
  //     {
  //       this.data.listData[i]["innerHTML"][j] = "占用";
  //     } else {
  //       this.data.listData[i]["innerHTML"][j] = ""; 
  //     }
  //   }
  // }
  },
  bindPickerChange: function (e) {
    var timeZoon = [[],[],[],[],[],[],[]];
   var temp = [[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    wx.checkSession({
      success:function(){
        wx.request({
          url: config.service.searchClass,
          data: {
            "place":e.detail.value
          },
          method:'POST',
          header:{
            'content-type': 'application/json'
          },
          success: function(response){
            console.log(response)
          timeZoon[0] = response.data.data['monday'];
          timeZoon[1] = response.data.data['tuesday'];
          timeZoon[2] = response.data.data['wednessday'];
          timeZoon[3] = response.data.data['thursday'];
          timeZoon[4] = response.data.data['friday'];
          timeZoon[5] = response.data.data['saturday'];
          timeZoon[6] = response.data.data['sunday'];
          console.log(timeZoon);
          for (var i = 0; i <= 13; i++)
          {
            for (var j = 0; j <= 6; j++)
            {
              if (timeZoon[j]['time'+String(i+1)]==1)
              {
                temp[i][j] = "占用";
              } else {
                temp[i][j] = "";
              }
            }
          }
          console.log(temp);
          getCurrentPages()[0].setData({
            listData:[
              { "time": "8:00\n|\n9:00", "innerHTML": temp[0], "index": "0" },
              { "time": "9:00\n|\n10:00", "innerHTML": temp[1], "index": "1"  },
              { "time": "10:00\n|\n11:00", "innerHTML": temp[2], "index": "2"  },
              { "time": "11:00\n|\n12:00", "innerHTML": temp[3], "index": "3"  },
              { "time": "12:00\n|\n13:00", "innerHTML": temp[4], "index": "4"  },
              { "time": "13:00\n|\n14:00", "innerHTML": temp[5], "index": "5"  },
              { "time": "14:00\n|\n15:00", "innerHTML": temp[6], "index": "6"  },
              { "time": "15:00\n|\n16:00", "innerHTML": temp[7], "index": "7"  },
              { "time": "16:00\n|\n17:00", "innerHTML": temp[8], "index": "8"  },
              { "time": "17:00\n|\n18:00", "innerHTML": temp[9], "index": "9"  },
              { "time": "18:00\n|\n19:00", "innerHTML": temp[10], "index": "10"  },
              { "time": "19:00\n|\n20:00", "innerHTML": temp[11], "index": "11"  },
              { "time": "20:00\n|\n21:00", "innerHTML": temp[12], "index": "12"  },
              { "time": "21:00\n|\n22:00", "innerHTML": temp[13], "index": "13"  }
            ]
          })
          },
          fail:function(response){
            console.log(response)
          }
        })
      },
      fail:function(){
        qcloud.setLoginUrl(config.service.loginUrl)
        qcloud.login()
      }
    })
  },
  bindGetUserInfo:function (e) {
    console.log(e.detail)
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.setStorageSync('firstlogin','true')
      this.setData({
        login: 'true'
      })
      qcloud.setLoginUrl(config.service.loginUrl)
      qcloud.login({
        success(result) {
          if (result) {
            util.showSuccess("登录成功")
            wx.setStorageSync("END_t", result);
            qcloud.request({
              url: config.service.requestUrl,
              success: function (response) {
                wx.setStorageSync('userInfo_t', response)
              }
            })
          }
        },
        fail(error) {
          console.log('Login error', error)
        }
      })
    }
  }
})