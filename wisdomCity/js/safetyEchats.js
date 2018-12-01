$(function(){
    

			// 底部图表展示部分
            var myChart = echarts.init(document.getElementById('main-left'));
            var myChart1 = echarts.init(document.getElementById('main-right'));
            var optionLeft,optionRight;
    // 圆形
            optionLeft = {
                legend: {  // 图例标记和文本的对齐
                        orient: 'horizontal',
                        // 'left': '0%',
                        'bottom':20,
                        width: '100%',
                        data:[{
                                name: '人工处置',
                                icon: 'circle',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 12
                                }
                            },
                            {
                                name: '智能处置',
                                icon: 'circle',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 12
                                }
                            }],
                        padding: [0, 30]
                    },
                title: [
                {
                    text: '事件趋势分析',
                    left: '35%',
                    top: '10%',
                    textAlign: 'center',
                    textStyle: {
                        color: '#fff',
                        fontSize: 22
                    }
                }],
                tooltip: {
                    trigger: 'item'
                },
                toolbox: {
                    "show": false,
                    feature: {
                        saveAsImage: {}
                    }
                },
                series: [
                {
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: ['50%', '65%'],
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [
                        {
                        value: 435, // 需要改变的值
                        name: '人工处置',
                        itemStyle: {
                            normal: {
                                color: '#BB4D2A'
                            }
                        },
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: 12
                                },
                                formatter: ''
                            }
                        }
                    },
                    {
                        value: 100, // 需要改变的值
                        name: '智能处置',
                        itemStyle: {
                            normal: {
                                color: '#2175B6'
                            }
                        },
                        label: {
                            normal: {
                                formatter: '{d} %',
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: 16
                                }
                            }
                        }
                    }]
                },
                ]
            }
        
        // 折线 与 柱状图
        optionRight = {
                title: {
                    show: true,
                    // text: '改进建议统计',
                    left: '40%',
                    top: '10%',
                    textStyle: {
                        color: '#fff',
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                grid: {
                    //show:true,
                    left: '10%',
                    right: '6%',
                    top: '25%',
                    bottom: '5%',
                    containLabel: true
                },
                toolbox: {
                    "show": false,
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true, //false时X轴从0开始
                    axisLine: {
                        lineStyle: {
                            color: '#B1B1B3'
                        },
                        onZero: true
                    },
                    // x周坐标 名称
                    data: ['平台呼出', '短信推送', '微信通知', '室内信息发布', '室外大屏发布'],
                    axisLabel : {
                        color: '#fff',
                        fontSize: 15,
                        formatter : function(params){
                        var newParamsName = "";// 最终拼接成的字符串
                                    var paramsNameNumber = params.length;// 实际标签的个数
                                    var provideNumber = 2;// 每行能显示的字的个数
                                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                                
                                    if (paramsNameNumber > provideNumber) {
                                        /** 循环每一行,p表示行 */
                                        for (var p = 0; p < rowNumber; p++) {
                                            var tempStr = "";// 表示每一次截取的字符串
                                            var start = p * provideNumber;// 开始截取的位置
                                            var end = start + provideNumber;// 结束截取的位置
                                            // 此处特殊处理最后一行的索引值
                                            if (p == rowNumber - 1) {
                                                tempStr = params.substring(start, paramsNameNumber);
                                            } else {
                                                tempStr = params.substring(start, end) + "\n";
                                            }
                                            newParamsName += tempStr;
                                        }

                                    } else {
                                        newParamsName = params;
                                    }
                                    return newParamsName
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#B1B1B3'
                        }, 
                        show: false,
                        onZero: true
                    }
                },
                series: [
                    {
                        name: '统计',
                        smooth: true, // 平滑
                        type: 'line',
                        lineStyle: {  // 线性 的样式
                            normal: {
                                color: '#cdd',
                                opacity: 10,
                                ZIndex: 9
                            }
                        },
                        areaStyle: {  // 线形图 曲线下面颜色
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#2277AC'
                                }, {
                                    offset: 1,
                                    color: 'rgba(7, 18, 38, 0)'
                                }])
                            }
                        },
                        symbolSize: 5,
                        data: [20, 15, 39, 18,28],
                    }
                ]
        }
            myChart.setOption(optionLeft, true);
            myChart1.setOption(optionRight, true);

            //底部 折线与柱状图
            var myYuJChart1 = echarts.init(document.getElementById('yujCharts'));
      
            // 折线 与 柱状图
            YuOptionRight = {
                  title: {
                      show: true,
                      text: '预警分类统计',
                      left: '6%',
                      top: '6%',
                      textStyle: {
                          color: '#fff',
                          fontSize: 17,
                          fontWeight: 'bold'
                      }
                  },
                  grid: {
                      //show:true,
                      left: '10%',
                      right: '6%',
                      top: '25%',
                      bottom: '5%',
                      containLabel: true
                  },
                  toolbox: {
                      "show": false,
                      
                  },
                  tooltip : {
                      trigger: 'axis',
                      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                      }
                  },
                  xAxis: [{
                      type: 'category',
                      boundaryGap: true, //false时X轴从0开始
                      axisLine: {
                          lineStyle: {
                              color: 'rgba(212,212,218, 0.7)'
                          },
                          onZero: true
                      },
                      // x周坐标 名称
                      data: ['井设备', '果皮箱', '果皮箱', '噪音检测', '路灯', '异味监测']
                      
                  }],
                  yAxis: [
                      {
                      type: 'value',
                      axisLine: {
                          show:false,
                          lineStyle: {
                              color: 'rgba(212,212,218, 0.7)'
                          },
                          onZero: true
                      },
                  }
              ],
                  series: [
                      {
                          name: '预警',
                          smooth: true, // 平滑
                          type: 'line',
                          lineStyle: {  // 线性 的样式
                              normal: {
                                  color: '#cdd',
                                  opacity: 10,
                                  ZIndex: 9
                              }
                          },
                          areaStyle: {  // 线形图 曲线下面颜色
                              normal: {
                                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                      offset: 0,
                                      color: '#186dd6'
                                  }, {
                                      offset: 1,
                                      color: '#4576b3'
                                  }])
                              }
                          },
                          symbolSize: 0,
                          data: [5, 20, 15, 10, 5, 10],
                      }, 
                  
                      {
                          name: '统计',
                          smooth: true,
                          type: 'bar',
                          symbolSize: 8,
                          barWidth: '40%',
                          itemStyle:{  // 柱状图 颜色 设置
                              normal: {
                                  barBorderRadius: 2,
                                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                      offset: 0,
                                      color: '#d0764b'
                                  }, {
                                      offset: 1,
                                      color: '#af4a1a'
                                  }])
                              }
                          },
                          data: [15, 20, 15, 10, 25, 10]
                      }, 
                  ]
          }
              
          myYuJChart1.setOption(YuOptionRight, true);

});