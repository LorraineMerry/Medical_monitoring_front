window.addEventListener('load',function(){
    //获取提交按钮
    var submitpersonButton = document.getElementById('submitpersonButton');

    // 点击按钮时触发
    submitpersonButton.addEventListener('click', function(){
        var datapersonList = document.querySelectorAll('.datapersonInput');
        var dataperson = {};
        var featureNames = ['一天去两家医院的天数','月就诊天数_MAX','月统筹金额_MAX','医院_就诊天数_MAX','顺序号_NN', 'ALL_SUM', '药品费自费金额_SUM', '贵重药品发生金额_SUM', '治疗费发生金额_SUM']; 

        // 检查每个输入框是否为空值
        var hasEmptyValue = false;
        for (var i = 0; i < datapersonList.length; i++) {  
            var input = datapersonList[i];
            // 如果输入框的值为空或者只包含空格，则认为是空值
            if (!input.value.trim()) {
                hasEmptyValue = true;
                break;
            }
        }

        if (hasEmptyValue) {
            alert('数据包含空值，请重新填写。');
            return; // 如果有空值，则停止提交数据到后端
        }

        // 确保数量一致
        if (datapersonList.length !== featureNames.length) {  
            console.error('Input elements do not match the number of feature names.');  
            return;  
        }  
    
        // 循环遍历每个input，将其值按照正确的列名添加到dataperson对象中  
        for (var i = 0; i < datapersonList.length; i++) {  
            var input = datapersonList[i];  
            var name = featureNames[i];  
            var value = parseFloat(input.value); // 尝试将值转换为浮点数  
          
            // 检查值是否成功转换（不是NaN），并且不是无限大或无限小  
            if (!isNaN(value) && isFinite(value)) {  
                dataperson[name] = value;  
            } else {  
                console.error('Invalid value for feature', name, ':', input.value);  
                // 可以选择在这里阻止提交或进行其他错误处理  
            }  
        } 
        // 如果没有空值，则继续将数据传输到后端
        //发送post请求到后端
        fetch('http://localhost:8000/process_data', {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'//告知服务器发送的是JSON格式的数据
            },
            body: JSON.stringify(dataperson)
        })
        .then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        // .then(dataperson => {
        //     console.log('Response from Flask:',dataperson);
        //     //处理从flask返回的数据
        // })
        .then(dataperson => {
            console.log('Response from Flask:',dataperson);
            // 在这里处理后端返回的数据
            var fraudData = dataperson; // 假设后端返回的数据存储在变量data中

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
                pieData.push({ value: item.probability * 100, name: item.category, itemStyle: { color: originalColors[index] } }); // 保持原有的颜色设置
                xAxisData.push(item.category);  
                yAxisData.push(item.probability); // 使用概率值而不是value  
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
                <span>非欺诈：${fraudData[0].probability.toFixed(4)}</span> <!-- 使用toFixed来格式化小数 -->  
                <span>非必要用药：${fraudData[1].probability.toFixed(4)}</span>  
                <span>非必要住院：${fraudData[2].probability.toFixed(4)}</span>  
                <span>综合欺诈：${fraudData[3].probability.toFixed(4)}</span>  
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
            console.error('There was a problem with the fetch operation:',error);
        })
    })
})