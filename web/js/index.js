window.addEventListener('load',function(){
    // 获取所有的a标签
    var links = document.querySelectorAll('#cleft a');
    // 遍历所有的a标签，为其绑定点击事件
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            var pageID = this.getAttribute('data-page'); // 获取目标页面的ID
            showPage(pageID); // 调用显示页面的函数
        });
    });

    //遍历第二页上方的所有span
    var spans = document.querySelectorAll('#nav_2 span');
    var movebox = document.querySelector('.movebox');
    //遍历，为其绑定点击事件
    spans.forEach(function(span){
        span.addEventListener('click',function(){
            // 获取点击的span元素的位置
            const position = Array.from(spans).indexOf(this) * 100;
            // 设置滑块的位置
            movebox.style.left = position + 'px';
            // 添加.active类到被点击的span元素
            removeActiveClass();
            this.classList.add('active');

            var partID = this.getAttribute('data-part');//获取目标ID
            showPart(partID); //调用相关部分显示函数
        })
    })

    // 遍历span元素并为每个元素添加鼠标悬停事件监听器
    spans.forEach(span => {
        span.addEventListener('mouseenter', function() {
            // 获取悬停的span元素的位置
            const position = Array.from(spans).indexOf(this) * 100;
            // 设置滑块的位置
            movebox.style.left = position + 'px';
        });
    });

    // 移除所有span元素的.active类
    function removeActiveClass() {
        spans.forEach(span => {
            span.classList.remove('active');
        });
    }

    //首页按钮跳转
    var nav1_button1 = document.querySelector('#cright .nav_1but1');
    var nav1_button2 = document.querySelector('#cright .nav_1but2');
    nav1_button1.addEventListener('click',function(){
        showPage('nav_2');
    })
    nav1_button2.addEventListener('click',function(){
        showPage('nav_6');
    })

    //获得结果按钮跳转
    var resultbtn = document.getElementById('resultButton');
    resultbtn.addEventListener('click',function(){
        showPage('nav_4');
    })

    //保证输入为数字
    var datanumberList = document.querySelectorAll('.datapersonInput');
    datanumberList.forEach(function(input){
        input.addEventListener('input',function(event){
            var currentValue = this.value;
            // 匹配所有非数字字符以及除了一个小数点之外的所有小数点  
            var regex = /[^\d.]|(\..*?)\./g;  
            if(regex.test(currentValue)){
                alert('只能输入数字！');
                // 移除所有非数字字符  
                this.value = currentValue.replace(regex, '');  
            }
        })
    })

    //保证批量检测时输入的是csv文件
    // 获取文件输入框元素
    var fileInput = document.getElementById('file');

    // 添加change事件监听器(当用户选择一个文件并点击"打开"按钮时，change 事件就会触发。)
    fileInput.addEventListener('change', function(event) {
        // 获取用户选择的文件
        var selectedFile = event.target.files[0];
    
        // 检查文件类型是否为CSV
        if (selectedFile && selectedFile.type !== 'text/csv') {
            // 文件类型不是CSV，显示警告消息
            alert('请上传CSV文件！');
            // 清除文件输入框中的已选文件
            fileInput.value = '';
        }
    });

    //成为会员切换按钮
    var changebtn = document.getElementById('nav_2changebtn');
    changebtn.addEventListener('click',function(){
        //获得需要隐藏的页面和需要展示的页面部分
        var hiddenpage = document.querySelector('.nav_221');
        var newshowpage = document.querySelector('.nav_222');
        hiddenpage.style.display='none';
        newshowpage.style.display='block';
    })

    //显示聊天界面按钮
    // var contactbtn = document.getElementById('contactbtn');
    // contactbtn.addEventListener('click', function(){
    //     var showContact = document.querySelector('.nav_3contact');
    //     showContact.style.display='block';
    // }) 

})

    // 点击侧边栏事件
    function showPage(pageID) {
        var pages = document.querySelectorAll('.page');
        for(var i = 0; i < pages.length; i++) {
            pages[i].style.display = 'none';
        }
        document.getElementById(pageID).style.display = 'block';   
    }

    //第二页上方选择栏
    function showPart(partID){
        var parts = document.querySelectorAll('.part');
        for(var i=0 ; i<parts.length ; i++) {
            parts[i].style.display='none';
        }
        document.getElementById(partID).style.display = 'block';
    }
