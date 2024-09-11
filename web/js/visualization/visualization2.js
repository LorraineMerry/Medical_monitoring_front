function initChart2(chartContainer){
     //初始化实例
    var nav_4chart2 = echarts.init(document.querySelector(chartContainer));
    //进行相关配置
    option = {
                xAxis: {
                    type: 'category',
                    data: ['虚构事实', '隐瞒真相', '过度医疗']
                        },
                yAxis: {
                        type: 'value'
                        },
                series: [{
                        data: [0.5, 0.3, 0.2],
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                        color: 'rgba(220, 220, 220, 0.8)'
                            }
                        }]
                };
    //把配置给实例对象
    nav_4chart2.setOption(option);

}