//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data: {
    userInfo: {},
    logged: false,
    buttonType: "",
    text_d:"",
    info:{
      "name":"",
      "place":"",
      "time":""
    }
  },
  onLoad:function(){
    var type = "";
    var today =0;
    var array = ['机械Z310(39人)', '逸夫YF601(70人)', '逸夫YF614(100人)', '东区DQ412(70人)', '东区DQ319(70人)', '九教北307B'];
    var multiArray = [["08","09","10","11","12","13","14","15","16","17","18","19","20","21","22"],["00"]];
    if ((new Date().getMonth()+1)<=9)
    {
      if (new Date().getDate()<=9)
        {
          today = parseInt(new Date().getFullYear()+"0"+(new Date().getMonth()+1)+"0"+new Date().getDate())
        }
      else{
        today = parseInt(new Date().getFullYear()+"0"+(new Date().getMonth()+1)+""+new Date().getDate()) 
      }
    }
    else {
      if (new Date().getDate()<=9)
        {
          today = parseInt(new Date().getFullYear()+""+(new Date().getMonth()+1)+"0"+new Date().getDate())
        }
      else{
        today = parseInt(new Date().getFullYear()+""+(new Date().getMonth()+1)+""+new Date().getDate()) 
      }
    }
    wx.checkSession({
      success:function(){
        wx.request({
          url: config.service.haveBooked,
          data:{"openId":wx.getStorageSync("userInfo_t").data.data['openId']},
          method:'POST',
          header:{
            'content-type': 'application/json'
          },
          success: function(response){
            console.log(response)
            if (response.data.code == 0)
            {
              type = "default";
            }
            else if (response.data.code == -1)
            {
              if (response.data.data['Date'] <= today)
              {
                type = "primary";
                getCurrentPages()[0].setData({
                  buttonType:type,
                  text_d:"完成",
                  info:{"name":response.data.data['Person'],
                          "time":response.data.data['Time'],
                          "time":response.data.data['Date']+" "+multiArray[0][response.data.data['Time']]+":00",
                          "place":array[response.data.data['Place']]}
                })
                console.log(getCurrentPages())
              }
              else
              {
                type = "warn";
                getCurrentPages()[0].setData({
                  buttonType:type,
                  text_d:"撤销",
                  info:{"name":response.data.data['Person'],
                          "time":response.data.data['Time'],
                          "time":response.data.data['Date']+" "+multiArray[0][response.data.data['Time']]+":00",
                          "place":array[response.data.data['Place']]}
                });
              }
            }
            else if (response.data.code == 1)
            {
              type = "default";
              getCurrentPages()[0].setData({
                buttonType:type,
                text_d:"完成",
                info:{"name":response.data.data['Person'],
                        "time":response.data.data['Time'],
                        "time":response.data.data['Date']+" "+multiArray[0][response.data.data['Time']]+":00",
                        "place":array[response.data.data['Place']]}
              })
            }
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
              url: config.service.haveBooked,
              data: {"openId":wx.getStorageSync("userInfo_t").data.data['openId']},
              method:'POST',
              header:{
                'content-type': 'application/json'
              },
              success: function(response){
                console.log(response)
              if (response.data.code == 0)
              {
                type = "default";
              }
              else if (response.data.code == -1)
              {
                if (response.data.data['Date'] <= today)
                  {
                    type = "primary";
                    getCurrentPages()[0].setData({
                      buttonType:type,
                      text_d:"完成",
                      info:{"name":response.data.data['Person'],
                      "time":response.data.data['Time'],
                      "time":response.data.data['Date']+" "+multiArray[0][response.data.data['Time']]+":00",
                      "place":array[response.data.data['Place']]} 
                    })
                  }
              else
                  {
                    type = "warn";
                    getCurrentPages()[0].setData({
                      buttonType:type,
                      text_d:"撤销",
                      info:{"name":response.data.data['Person'],
                          "time":response.data.data['Time'],
                          "time":response.data.data['Date']+" "+multiArray[0][response.data.data['Time']]+":00",
                          "place":array[response.data.data['Place']]}
                    })
                  }
              }
              else if (response.data.code == 1)
              {
                type = "default";
                getCurrentPages()[0].setData({
                  buttonType:type,
                  text_d:"完成",
                  info:{"name":response.data.data['Person'],
                          "time":response.data.data['Time'],
                          "time":response.data.data['Date']+" "+multiArray[0][response.data.data['Time']]+":00",
                          "place":array[response.data.data['Place']]}
                })
              }
              },
              fail:function(response){
                util.showModel("ERROR","Please contact Admin")
              }
            }) 
          }
        })
      }
    });
    this.setData({
      userInfo:wx.getStorageSync('END_t'),
      logged:true,
      buttonType:type 
    })
  },
  onShow:function(){
    var type = "";
    var today =0;
    var array = ['机械Z310(39人)', '逸夫YF601(70人)', '逸夫YF614(100人)', '东区DQ412(70人)', '东区DQ319(70人)','九教北307B'];
    var multiArray = [["08","09","10","11","12","13","14","15","16","17","18","19","20","21","22"],["00"]];
    if ((new Date().getMonth()+1)<=9)
    {
      if (new Date().getDate()<=9)
        {
          today = parseInt(new Date().getFullYear()+"0"+(new Date().getMonth()+1)+"0"+new Date().getDate())
        }
      else{
        today = parseInt(new Date().getFullYear()+"0"+(new Date().getMonth()+1)+""+new Date().getDate()) 
      }
    }
    else {
      if (new Date().getDate()<=9)
        {
          today = parseInt(new Date().getFullYear()+""+(new Date().getMonth()+1)+"0"+new Date().getDate())
        }
      else{
        today = parseInt(new Date().getFullYear()+""+(new Date().getMonth()+1)+""+new Date().getDate()) 
      }
    }
    wx.checkSession({
      success:function(){
        wx.request({
          url: config.service.haveBooked,
          data:{"openId":wx.getStorageSync("userInfo_t").data.data['openId']},
          method:'POST',
          header:{
            'content-type': 'application/json'
          },
          success: function(response){
            console.log(response)
            if (response.data.code == 0)
            {
              type = "default";
            }
            else if (response.data.code == -1)
            {
              if (response.data.data['Date'] <= today)
                {
                  type = "primary";
                  getCurrentPages()[0].setData({
                    buttonType:type,
                    text_d:"完成",
                    info:{"name":response.data.data['Person'],
                          "time":response.data.data['Time'],
                          "time":response.data.data['Date']+" "+multiArray[0][response.data.data['Time']]+":00",
                          "place":array[response.data.data['Place']]}
                  })
                }
              else
                {
                  type = "warn";
                  getCurrentPages()[0].setData({
                    buttonType:type,
                    text_d:"撤销",
                    info:{"name":response.data.data['Person'],
                          "time":response.data.data['Time'],
                          "time":response.data.data['Date']+" "+multiArray[0][response.data.data['Time']]+":00",
                          "place":array[response.data.data['Place']]}
                  })
                }
            }
            else if (response.data.code == 1)
            {
              type = "default";
              getCurrentPages()[0].setData({
                buttonType:type,
                text_d:"完成",
                info:{"name":response.data.data['Person'],
                        "time":response.data.data['Time'],
                        "time":response.data.data['Date']+" "+multiArray[0][response.data.data['Time']]+":00",
                        "place":array[response.data.data['Place']]}
              })
            }
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
              url: config.service.haveBooked,
              data: {"openId":wx.getStorageSync("userInfo_t").data.data['openId']},
              method:'POST',
              header:{
                'content-type': 'application/json'
              },
              success: function(response){
                console.log(response)
              if (response.data.code == 0)
              {
                type = "default";
              }
              else if (response.data.code == -1)
              {
                if (response.data.data['Date'] <= today)
                  {
                    type = "primary";
                    getCurrentPages()[0].setData({
                      buttonType:type,
                      text_d:"完成",
                      info:{"name":response.data.data['Person'],
                          "time":response.data.data['Time'],
                          "time":response.data.data['Date']+" "+multiArray[0][response.data.data['Time']]+":00",
                          "place":array[response.data.data['Place']]}
                    })
                  }
              else
                {
                  type = "warn";
                  getCurrentPages()[0].setData({
                    buttonType:type,
                    text_d:"撤销",
                    info:{"name":response.data.data['Person'],
                          "time":response.data.data['Time'],
                          "time":response.data.data['Date']+" "+multiArray[0][response.data.data['Time']]+":00",
                          "place":array[response.data.data['Place']]}
                  })
                }
              }
              else if (response.data.code == 1)
              {
                type = "default";
                getCurrentPages()[0].setData({
                  buttonType:type,
                  text_d:"完成",
                  info:{"name":response.data.data['Person'],
                          "time":response.data.data['Time'],
                          "time":response.data.data['Date']+" "+multiArray[0][response.data.data['Time']]+":00",
                          "place":array[response.data.data['Place']]}
                })
              }
              },
              fail:function(response){
                util.showModel("ERROR","Please contact Admin")
              }
            }) 
          }
        })
      }
    });
    this.setData({
      userInfo:wx.getStorageSync('END_t'),
      logged:true,
      buttonType:type
    }) 
  },
  warn: function(e){
    var del = 0;
    if(this.data.buttonType != "default")
    {
      if (this.data.buttonType == "warn")
      {
        del = 1;
      }
      wx.checkSession({
        success:function(){
          wx.request({
            url: config.service.finishBooked,
            data: {"openId":wx.getStorageSync("userInfo_t").data.data['openId'],
                "del":del},
            method:'POST',
            header:{
              'content-type': 'application/json'
            },
            success: function(response){
              console.log(response)
              if (response.data.code == 0)
              {
                getCurrentPages()[0].setData({
                  buttonType:"default"
                })
              }
            },
            fail:function(response){
              console.log(response)
            }
          })
        }
      })
    }
  }
})
