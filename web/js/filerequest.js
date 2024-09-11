window.addEventListener('load', function() {  
    // 获取文件输入元素  
    var fileInput = document.getElementById('file');  
    // 标记是否已经弹出了空值警告
    var hasEmptyValueAlerted = false;
    
    // 为文件输入元素添加change事件监听器  
    fileInput.addEventListener('change', function() {  
        // 用户选择了文件，执行上传逻辑  
        var file = this.files[0]; // 获取用户选择的文件  

        if (!file) {  
            alert('请选择文件！');  
            return;  
        }  

        //对文件内容进行处理（空值和异常值）
        var reader = new FileReader();
        reader.onload = function(event){
            var fileContent = event.target.result;

            var lines = fileContent.split('\n');
            //检查是否有空值，异常值
            var nonNumericValues = [];
            for(var i = 1; i<lines.length;i++){
                var fields = lines[i].split(',');
                for(var j=0;j<fields.length;j++){
                    if(j==0) continue;
                    var fieldValue = fields[j].trim();
                    if(fieldValue==""){
                        if(!hasEmptyValueAlerted){
                            alert('文件包含空值，我们已将其置为0！');
                            hasEmptyValueAlerted=true;
                        }
                        fields[j]="0";
                    }
                    else if(isNaN(parseFloat(fieldValue))){
                        nonNumericValues.push(fieldValue);
                    }
                }
                lines[i] = fields.join(',');
            }
            if (nonNumericValues.length>0){
                alert('文件包含异常值，请检查文件内容！');
                return;
            }
        }

        
            if (file) {  
            // 创建FormData对象  
            const formData = new FormData();  
            formData.append('file', file);  
              
            // 发送POST请求到Flask接口  
            fetch('http://127.0.0.1:8000/process_file', {  
                method: 'POST',  
                body: formData  
            })  
            .then(response => {  
                if (!response.ok) {  
                    throw new Error('Network response was not ok');  
                }  
                return response.blob(); // 直接处理响应体为二进制数据  
            })  
            .then(blob => {  
                // 创建一个URL指向blob对象，并创建一个链接以下载文件  
                const url = window.URL.createObjectURL(blob);  
                const a = document.createElement('a');  
                a.href = url;  
                a.download = 'predictions.csv';  
                document.body.appendChild(a);  
                a.click();  
                window.URL.revokeObjectURL(url);  
            })  
            .catch(error => {  
                console.error('Error:', error);  
            });  
        } else {  
            console.log('没有选择文件');  
            }  
    });  
});  
