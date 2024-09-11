window.addEventListener('load',function(){
    (function(){
        //第一个饼图
    var chart1 = echarts.init(document.querySelector('.mainbox .chart1'));    

    option1 = {
    title: {
        text: '医疗保险欺诈类别饼状图',
        left: 'center',
        top: '3%',
        textStyle: {color:'#16CEB9',
                    fontWeight:'500'}
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
    },
    legend: {
        left: 'left',
        top: 'bottom',
        textStyle: {color:'#fff',
                    fontSize:'10'},
        data: ['挂床住院', '超限用药', '串换药品', '过度医疗','诱导就医','虚构医药服务','伪造医疗服务票据']
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            magicType: {
                show: true,
                type: ['pie', 'funnel']
            },
        }
    },
    series: [
        {
            type: 'pie',
            radius: [20, 100],
            roseType: 'radius',
            center: 'center',
            label: {
                show: false
            },
            emphasis: {
                label: {
                    show: true
                }
            },
            data: [
                {value: 180, name: '挂床住院'},
                {value: 63, name: '超限用药'},
                {value: 60, name: '串换药品'},
                {value: 86, name: '过度医疗'},
                {value: 105, name: '诱导就医'},
                {value: 155, name: '虚构医药服务'},
                {value: 144, name: '伪造医疗服务票据'}
            ]
        },
    ]
};
chart1.setOption(option1);
    })();

    (function(){
    var chart2 = echarts.init(document.querySelector('.mainbox .chart2'));    

    var data = [{
    "name": "综合欺诈",
    "value": 299
}, {
    "name": "非必要用药",
    "value": 209
}, {
    "name": "非必要住院",
    "value": 285
}];
var xData = [],
    yData = [];
var min = 150; 
data.map(function(a, b) {
    xData.push(a.name);
    if (a.value === 0) {
        yData.push(a.value + min);
    } else {
        yData.push(a.value);
    }
});
option2 = {
    title: {
        text: '欺诈监测结果分类柱状图',
        left: 'center',
        top: 'top',
        textStyle: {color:'#16CEB9',
                    fontWeight:'500'}
    },
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            lineStyle: {
                opacity: 0
            }
        },
        formatter: function(prams) {
            if (prams[0].data === min) {
                return "对应数量："
            } else {
                return "对应数量：" + prams[0].data
            }
        }
    },
    grid: {
        left: '0%',
        right: '5%',
        bottom: '5%',
        top: '11%',
        height: '85%',
        containLabel: true,
        z: 22
    },
    xAxis: [{
        type: 'category',
        gridIndex: 0,
        data: xData,
        axisTick: {
            alignWithLabel: true
        },
        axisLine: {
            lineStyle: {
                color: '#0c3b71',
            }
        },
        axisLabel: {
            show: true,
             color: 'rgb(170,170,170)',
             fontSize:14
        }
    }],
    yAxis: [{
            type: 'value',
            gridIndex: 0,
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            min: min,
            max: 300,
            axisLine: {
                lineStyle: {
                    color: '#0c3b71'
                }
            },
            axisLabel: {
                color: 'rgb(170,170,170)',
                formatter: '{value} '
            }
        },
        {
            type: 'value',
            gridIndex: 0,
            min: min,
            max:300,
            splitNumber: 12,
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
                }
            }
        }
    ],
    series: [{
            name: '对应数量',
            type: 'bar',
            barWidth: '30%',
            xAxisIndex: 0,
            yAxisIndex: 0,
            left: 'left',
            itemStyle: {
                normal: {
                    barBorderRadius: 30,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [{
                                offset: 0,
                                color: '#00feff'
                            },
                            {
                                offset: 0.5,
                                color: '#027eff'
                            },
                            {
                                offset: 1,
                                color: '#0286ff'
                            }
                        ]
                    )
                }
            },
            data: yData,
            zlevel: 11

        },
        {
            name: '背景',
            type: 'bar',
            barWidth: '50%',
            xAxisIndex: 0,
            yAxisIndex: 1,
            barGap: '-135%',
            data: [100, 100, 100, 100, 100, 100, 100],
            itemStyle: {
                normal: {
                    color: 'rgba(255,255,255,0.1)'
                }
            },
            zlevel: 9
        },
      
    ]
};

chart2.setOption(option2);
    })();
    
    (function(){
        //地球图
    var chart3 = echarts.init(document.querySelector('.mainbox .chart3'));    
    //地图注册
    // echarts.registerMap('china',jsonData)

    option3 = {
    title: {
        text: '全国省份医疗保险指数（万人）',
        left: 'center',
        top: '4%',
        textStyle: {color:'#16CEB9',
                    fontWeight:'500',
                    fontSize:'23'}
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: '10%',
        top: '4%',
        textStyle: {color:'#ffffff'},
        data:['2020','2021','2022']
    },
    visualMap: {
        min: 200,
        max: 12000,
        left: '10%',
        bottom: '1%',
        text: ['高','低'],    
        textStyle: {color:'#ffffff'},      
        calculable: true
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: '2020',
            type: 'map',
            mapType: 'china',
            roam: false,
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                },
            },
            data:[
                {name: '北京',value: 2139.9},
                {name: '天津',value: 1164.1},
                {name: '上海',value: 1943.2},
                {name: '重庆',value: 3266.7},
                {name: '河北',value: 6938.8},
                {name: '山西',value: 3245.1},
                {name: '山东',value: 9697.8},
                {name: '河南',value: 10349.5},
                {name: '云南',value: 4581.3},
                {name: '辽宁',value: 3867.5},
                {name: '吉林',value: 2461.9},
                {name: '黑龙江',value: 2827.0},
                {name: '湖南',value: 6731.8},
                {name: '湖北',value: 5583.0},
                {name: '安徽',value: 6704.6},
                {name: '山东',value: 9697.8},
                {name: '江苏',value: 7967.7},
                {name: '浙江',value: 5556.5	},
                {name: '江西',value: 4780.0},
                {name: '陕西',value: 3899.7},
                {name: '四川',value: 8591.7	},
                {name: '福建',value: 3840.5},
                {name: '贵州',value: 4194.4},
                {name: '广东',value: 10991.4},
                {name: '广西',value: 5217.2	},
                {name: '甘肃',value: 2590.4},
                {name: '青海',value: 563.3	},
                {name: '内蒙古',value: 2183.9},
                {name: '新疆',value: 2316.8	},
                {name: '西藏',value: 342.8},
                {name: '宁夏',value: 658.8},
                {name: '海南',value: 934.0}
            ]
        },
                
        {
            name: '2021',
            type: 'map',
            mapType: 'china',
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {name: '北京',value: 1886.9},
                {name: '天津',value: 1175.0},
                {name: '上海',value: 1978.5},
                {name: '重庆',value: 3261.7},
                {name: '河北',value: 7091.0},
                {name: '山西',value: 3246.0},
                {name: '山东',value: 9732.4},
                {name: '河南',value: 10339.2},
                {name: '云南',value: 4521.9},
                {name: '辽宁',value: 3808.3},
                {name: '吉林',value: 2290.3},
                {name: '黑龙江',value: 2821.1},
                {name: '湖南',value: 6748.7},
                {name: '湖北',value: 5619.7},
                {name: '安徽',value: 6661.9},
                {name: '山东',value: 9732.4},
                {name: '江苏',value: 8063.8},
                {name: '浙江',value: 5654.5},
                {name: '江西',value: 4689.1},
                {name: '陕西',value: 3891.6},
                {name: '四川',value: 8586.2},
                {name: '福建',value: 3872.1},
                {name: '贵州',value: 4214.5},
                {name: '广东',value: 11271.9},
                {name: '广西',value: 5249.3},
                {name: '甘肃',value: 2587.2},
                {name: '青海',value: 567.0},
                {name: '内蒙古',value: 2192.2},
                {name: '新疆',value: 2326.4	},
                {name: '西藏',value: 346.0},
                {name: '宁夏',value: 663.4},
                {name: '海南',value: 938.8}
            ]
        },
        {
            name: '2022',
            type: 'map',
            mapType: 'china',
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {name: '北京',value: 1900.5},
                {name: '天津',value: 1176.4},
                {name: '上海',value: 1989.6},
                {name: '重庆',value: 3206.6},
                {name: '河北',value: 7020.3	},
                {name: '山西',value: 3222.7},
                {name: '山东',value: 9633.1},
                {name: '河南',value: 10093.9},
                {name: '云南',value: 4559.8},
                {name: '辽宁',value: 3748.6},
                {name: '吉林',value: 2262.6},
                {name: '黑龙江',value: 2767.8},
                {name: '湖南',value: 6523.2},
                {name: '湖北',value: 5593.0},
                {name: '安徽',value: 6506.7},
                {name: '山东',value: 9633.1},
                {name: '江苏',value: 8119.5},
                {name: '浙江',value: 5577.2},
                {name: '江西',value: 4648.2},
                {name: '陕西',value: 3668.3},
                {name: '四川',value: 8393.9},
                {name: '福建',value: 3863.5},
                {name: '贵州',value: 4221.2},
                {name: '广东',value: 11153.2},
                {name: '广西',value: 5201.9},
                {name: '甘肃',value: 2555.1	},
                {name: '青海',value: 559.6},
                {name: '内蒙古',value: 2169.9},
                {name: '新疆',value: 2332.9	},
                {name: '西藏',value: 339.6},
                {name: '宁夏',value: 662.8},
                {name: '海南',value: 920.9}
            ]
        }
    ]
};
chart3.setOption(option3);
    })();

    (function(){
    var chart4 = echarts.init(document.querySelector('.mainbox .chart4'));
    option4 = {
        title: {
            text: '中国医疗保险欺诈统计',
            top: '3%',
            left: '20%',
            textStyle: {
                color: '#16CEB9',
                fontWeight: '500'
            }
        },
        grid: {  
            left: '13%',   
            right: '13%',
            bottom: '10%',
            top:'22%',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            top: '12%',
            data: ['全国法院一审审结数量（件）', '同比增长率'],
            textStyle: {
                color:'#fff',
                fontSize:'11'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2021', '2022', '2023'],
            axisLabel: {
                color: "#fff",
                fontSize: "10"
            },
            axisTick: {
                show: false // 去除刻度线
            },
            axisLine: {
                lineStyle: {
                    color: "#fff",
                    type: "solid"
                }
            }
        },
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    color: "#fff",
                    fontSize: "12"
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#fff",
                        type: "solid"
                    }
                },
                splitLine:{
                    show: false,
                }
            },
            {
                type: 'value',
                axisLabel: {
                    color: "#fff",
                    fontSize: "12",
                    formatter: '{value}%'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#fff",
                        type: "solid"
                    }
                },
                splitLine:{
                    show: false,
                }
            }
        ],
        series: [
            {
                name: '全国法院一审审结数量',
                type: 'line',
                data: [306, 407, 500],
                top: 'bottom',
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            },
            {
                name: '同比增长率',
                type: 'line',
                data: [102.65, 33.01, 22.85],
                top: 'bottom',
                yAxisIndex: 1, // 指定使用右侧的 Y 轴
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            }
        ]
    };
    chart4.setOption(option4);
})();


    (function(){
       var chart5 = echarts.init(document.querySelector('.mainbox .chart5')); 

option5 = {
    title: {
        text: '关键词',
        x: 'center',
        textStyle: {
            fontSize: 20,
            color:'#16CEB9',
            fontWeight:'500'
        }

    },
    tooltip: {
        show: true
    },
    series: [{
        name: '关键词',
        type: 'wordCloud',
        sizeRange: [6, 66],
        rotationRange: [0, 90],
        rotationStep: 90,       
        textPadding: 0,
      
        textStyle : {
            fontFamily: 'PingFangSC-Semibold',
            fontWeight: 400,
            color: function () {
            return 'rgb(' + [
               Math.round(100+Math.random() * 160), 
               Math.round(100+Math.random() * 160), 
               Math.round(100+Math.random() * 160)
        ].join(',') + ')' ;
                                    
    },
},
    }]
};

var JosnList = [];

JosnList.push({
    name: "医疗保险监测",
    value: "999"
}, {
    name: "盗刷医疗",
    value: "888"
}, {
    name: "倒卖特病药",
    value: "777"
}, {
    name: "伪造医疗文书和票据",
    value: "688"
}, {
    name: "虚假就医、购药",
    value: "588"
}, {
    name: "串换药品",
    value: "516"
}, {
    name: "串换诊疗项目和服务设施",
    value: "515"
}, {
    name: "谎报病种骗取医保金",
    value: "483"
}, {
    name: "非法收购",
    value: "462"
}, {
    name: "窃他人医疗保障凭证",
    value: "449"
}, {
    name: "社会保障与福利",
    value: "429"
}, {
    name: "商业医疗保险",
    value: "407"
}, {
    name: "分解住院",
    value: "406"
}, {
    name: "为参保人员提供虚假发票",
    value: "406"
}, {
    name: "加强医保基金常态化监管",
    value: "386"
}, {
    name: "点上突破",
    value: "385"
}, {
    name: "线上推进",
    value: "375"
}, {
    name: "面上成网",
    value: "355"
}, {
    name: "为非定点医药机构提供刷卡记账服务",
    value: "355"
});

option5.series[0].data = JosnList;


 chart5.setOption(option5);
    })();
    
})