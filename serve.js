const express = require('express');  
const path = require('path');  
const app = express();  
const port = 3000;  
  
// 托管静态文件  
app.use(express.static(path.join(__dirname, 'web')));  
  
// 设置路由  
app.get('/', (req, res) => {  
  res.sendFile(path.join(__dirname, 'web/index.html'));  
});  
  
// 启动服务器  
app.listen(port, () => {  
  console.log(`Server is running on port ${port}`);  
});