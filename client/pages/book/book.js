var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data: {
    array: ['机械Z310(39人)', '逸夫YF601(70人)', '逸夫YF614(100人)', '东区DQ412(70人)', '东区DQ319(70人)','九教北307B'],
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
        id: 4,
        name: '东区DQ319(70人)'
      },
      {
        id:5,
        name: '九教北307B'
      }
    ],
    index: 0,
    endtime: '',
    multiArray:[["08","09","10","11","12","13","14","15","16","17","18","19","20","21","22"],["00"]],
    multiIndex_start:[0,0],
    multiIndex_end:[1,0],
    book_day:new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate(),
    start_date: new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate(),
    date:new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate(),
    end_date: (new Date(new Date().setDate(new Date().getDate()+6))).getFullYear()+"-"+((new Date(new Date().setDate(new Date().getDate()+6))).getMonth()+1)+"-"+(new Date(new Date().setDate(new Date().getDate()+6))).getDate(),
  },
  bookInfo: {
    "openId":"",
    "title":"",
    "place":0,
    "date":0,
    "time":0,
    "headerName":"",
    "contact":0,
    "class":"",
    "bookId":"",
    "dayWeek":0
  },
  titleChange: function (e){
   this.bookInfo.title = e.detail.value
   console.log('title is '+e.detail.value)
  },
  bindPickerChange: function(e){
    console.log('place is ' + e.detail.value)
    this.bookInfo.place = e.detail.value
    this.setData({
      index:e.detail.value
    })
    if (e.detail.value == 5) {
      util.showModel("特别提示","307B的预约要以团委纸质版申请为准，此系统正在改进加入审核模块，后期支持307！")
    }
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.book_day = String(e.detail.value);
    this.bookInfo.date = parseInt(String(e.detail.value).replace(/-/g,""));
    console.log(this.bookInfo.date);
    this.setData({
      date: e.detail.value
    })
  },
  startbindTimeChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex_start: this.data.multiIndex_start,
      multiIndex_end: this.data.multiIndex_end
    };
    if (e.detail.value==14){
      data.multiIndex_start[e.detail.column] = e.detail.value - 1;
      data.multiIndex_end[e.detail.column] = e.detail.value; 
    } else {
      data.multiIndex_start[e.detail.column] = e.detail.value;
    data.multiIndex_end[e.detail.column] = e.detail.value + 1;
    }
    this.bookInfo.time = data.multiIndex_start[e.detail.column];
    // console.log(this.bookInfo.time);
    // console.log(this.bookInfo.endTime)
    this.setData(data);
  },
  headerNameChange: function (e) {
    console.log("header's name is "+e.detail.value)
    this.bookInfo.headerName = e.detail.value
  },
  contactChange: function (e) {
    console.log('phone is '+e.detail.value)
    this.bookInfo.contact = parseInt(e.detail.value)
  },
  classChange: function (e) {
    console.log('class is '+e.detail.value)
    this.bookInfo.class = e.detail.value
  },
  primary: function(e) {
    var day_china = [6,0,1,2,3,4,5]
    console.log(String(this.data.book_day).replace(/-/g,"/"));
    var t = String(this.data.book_day).replace(/-/g,"/");
    this.bookInfo.dayWeek = day_china[new Date(t).getDay()];
    if (wx.getStorageSync('userInfo').length == 0)
    {
      util.showModel("登录失败","请重新登录小程序")
    }
    if (this.bookInfo.title.length==0) {
      util.showModel("请输入活动名称","活动名称不能为空")
      return
    }
    if (this.bookInfo.headerName.length>=5 || this.bookInfo.headerName == 0)
    {
      util.showModel("负责人姓名有误","用户名限制为2-4个汉字")
      return
    }
    if (String(this.bookInfo.contact).length != 11)
    {
      util.showModel("联系方式有误","联系人限制为11位手机号码")
      return
    }
    if (this.bookInfo.class.length != 6 && this.bookInfo.class.length !=7)
    {
      util.showModel("班级输入有误","示例：计算机1601或计科1601")
      return
    }
    this.bookInfo.openId = wx.getStorageSync("userInfo_t").data.data['openId'];
    console.log(wx.getStorageSync("userInfo"));
    if (this.bookInfo.date == 0)
    {
      if ((new Date().getMonth()+1)<=9)
    {
      if (new Date().getDate()<=9)
        {
          this.bookInfo.date = parseInt(new Date().getFullYear()+"0"+(new Date().getMonth()+1)+"0"+new Date().getDate())
        }
      else{
        this.bookInfo.date = parseInt(new Date().getFullYear()+"0"+(new Date().getMonth()+1)+""+new Date().getDate()) 
      }
    }
    else {
      if (new Date().getDate()<=9)
        {
          this.bookInfo.date = parseInt(new Date().getFullYear()+""+(new Date().getMonth()+1)+"0"+new Date().getDate())
        }
      else{
        this.bookInfo.date = parseInt(new Date().getFullYear()+""+(new Date().getMonth()+1)+""+new Date().getDate()) 
      }
    }
  }
    if (this.bookInfo.time <= 9)
      {
        this.bookInfo.bookId = this.bookInfo.date + "0" +this.bookInfo.time + "" + this.bookInfo.place;
      }
    else {
      this.bookInfo.bookId = this.bookInfo.date + "" +this.bookInfo.time + "" + this.bookInfo.place;
    }
    console.log(this.bookInfo);
    util.showBusy("正在提交");
    var data = this.bookInfo;
    wx.checkSession({
      success:function(){
        wx.request({
          url: config.service.uploadBookInfo,
          data: data,
          method:'POST',
          header:{
            'content-type': 'application/json'
          },
          success: function(response){
            console.log(response)
            if (response.data.code == 0)
              {
                util.showSuccess("预约成功");
              }
            else if (response.data.code == -2)
              util.showModel("时间冲突","请检查预约时间段")
            else if (response.data.code == -1)
              util.showModel("已有预约","请撤销或完成已有预约")
          },
          fail(response){
            util.showModel("ERROR","Please contact Admin")
          }
        })
      },
      fail:function(){
        qcloud.setLoginUrl(config.service.loginUrl)
        qcloud.login({
          success:function(res)
          {
            wx.request({
              url: config.service.uploadBookInfo,
              data: data,
              method:'POST',
              header:{
                'content-type': 'application/json'
              },
              success: function(response){
                console.log(response)
                if (response.data.code == 0)
                  {
                    util.showSuccess("预约成功");
                  }
                else if (response.data.code == -2)
                  util.showModel("时间冲突","请检查预约时间段")
                else if (response.data.code == -1)
                  util.showModel("已有预约","请撤销或完成已有预约")
              },
              fail(response){
                util.showModel("ERROR","Please contact Admin")
              }
            }) 
          }
        })
      }
    })
    
  },
})