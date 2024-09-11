window.addEventListener('load', function() {  
    // 获取文件输入元素  
    var fileInput = document.getElementById('file');  
    
    // 为文件输入元素添加change事件监听器  
    fileInput.addEventListener('change', function() {  
        // 用户选择了文件，执行上传逻辑  
        var file = this.files[0]; // 获取用户选择的文件  

        if (!file) {  
            alert('请选择文件！');  
            return;  
        }  
          
        if (file) {  
            // 创建FormData对象  
            const formData = new FormData();  
            formData.append('file', file);  
              
            // 发送POST请求到Flask接口  
            fetch('http://127.0.0.1:8000/process_filedata', {  
                method: 'POST',  
                body: formData  
            })  
            .then(response => {
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
            console.log('Response from Flask:',data);
            // 在这里处理后端返回的数据
            var fraudData = data; // 假设后端返回的数据存储在变量data中

            // 更新饼图和柱状图的数据
            var pieData = [];
            var option = {
                                title: {
                                    text: '欺诈检测结果分类',
                                    left: 'center',
                                    textStyle: {
                                        fontSize: 22
                                    }
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                                },
                                legend: {
                                    orient: 'vertical',
                                    left: 'right',
                                    top: '40%', // 顶部居中位置
                                    data: ['非欺诈', '与医院工作人员合谋', '服务未提供但已索赔', '串换诊疗项目和药物'],
                                    fontStyle: {
                                        fontSize: 18
                                    }
                                },
                                series: [
                                    {
                                        name: '类型',
                                        type: 'pie',
                                        radius: '65%',
                                        center: ['50%', '55%'],
                                        data: [
                                            { value: 335, name: '非欺诈' , itemStyle: { color: '#284777' } },
                                            { value: 310, name: '与医院工作人员合谋' ,  itemStyle: { color: '#f8e287' } },
                                            { value: 234, name: '服务未提供但已索赔' , itemStyle: { color: '#c23531' } },
                                            { value: 135, name: '串换诊疗项目和药物' , itemStyle: { color: '#d48265' } },
                                        ],
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
            var xAxisData = [];
            var yAxisData = [];
            var option2 = {
                            color: ['rgb(65, 84, 122)'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'category',
                                data: ['虚构事实', '隐瞒真相', '过度医疗'],
                                axisTick: {
                                    alignWithLabel: true
                                }
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
                                },
                                animation:true
                            }]
                        };

            // 保存原有的颜色设置
            var originalColors = option.series[0].data.map(function(item) {
                return item.itemStyle.color;
            });

            // 填充饼图和柱状图的数据  
            fraudData.forEach(function(item, index) {  
                pieData.push({ value: item.percentage * 100, name: item.category, itemStyle: { color: originalColors[index] } }); // 保持原有的颜色设置
                xAxisData.push(item.category);  
                yAxisData.push(item.percentage); // 使用概率值而不是value  
            });  
            // 从 fraudData 中提取所有独特的类别，并设置图例数据  
            var legendData = fraudData.map(function(item) {  
                return item.category;  
                }).filter(function(value, index, self) {  
                return self.indexOf(value) === index;  
            }); 

            // 更新HTML中的内容  
            document.querySelector('.nav_4chart2right').innerHTML = `  
                <h4>各种欺诈概率情况：</h4>  
                <span>非欺诈：${fraudData[0].percentage.toFixed(4)}</span> <!-- 使用toFixed来格式化小数 -->  
                <span>非必要用药：${fraudData[2].percentage.toFixed(4)}</span>  
                <span>非必要住院：${fraudData[3].percentage.toFixed(4)}</span>  
                <span>综合欺诈：${fraudData[1].percentage.toFixed(4)}</span>  
            `;  

            // 更新饼图和柱状图的数据
            option.series[0].data = pieData;
            option.legend.data=legendData;
            option2.xAxis.data = xAxisData;
            option2.series[0].data = yAxisData;

            // 更新图表
            nav_4chart1.setOption(option);
            nav_4chart2.setOption(option2);
        }) 
            .catch(error => {  
                console.error('Error:', error);  
            });  
        } else {  
            console.log('没有选择文件');  
        }  
    });  
});  
