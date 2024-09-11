var nav_4chart1 = echarts.init(document.querySelector('#nav_4 .nav_4chart1'));
var nav_4chart2 = echarts.init(document.querySelector('#nav_4 .nav_4chart2left'));

// 假设后端返回的数据为 fraudData，结构为 [{'非欺诈', 0.3}, {'虚构事实', 0.6}, {'隐瞒真相', 0.03}, {'过度医疗', 0.07}]
// 更新饼图的数据
var pieData = [];
fraudData.forEach(function(item) {
    pieData.push({value: item.value, name: item.type});
});
var option = {
    title: {
        text: '欺诈检测结果分类',
        subtext: '谛听鉴保',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        top: '40%', // 顶部居中位置
        data: fraudData.map(function(item) {
            return item.type;
        })
    },
    series: [
        {
            name: '类型',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: pieData,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
nav_4chart1.setOption(option);

// 更新柱状图的数据
var option2 = {
    xAxis: {
        type: 'category',
        data: fraudData.map(function(item) {
            return item.type;
        })
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: fraudData.map(function(item) {
            return item.value;
        }),
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
        }
    }]
};
nav_4chart2.setOption(option2);
