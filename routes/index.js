const router = require('koa-router')();
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : '127.0.0.1',   // 数据库地址
  user     : 'root',    // 数据库用户
  password : '' ,  // 数据库密码
  database : 'test'  // 选中数据库
});
let data = null;
router.get('/', async (ctx, next) => {
  
  // 执行sql脚本对数据库进行读写 
  await connection.query('SELECT * FROM articles',  (error, results, fields) => {
    
    if (error) throw error
    // connected! 
    // results = JSON.stringify(results);
    // results = JSON.parse(results);
    // data=results;
    console.log(results.count());
    // 结束会话
    connection.end();
  });
  await ctx.render('index', {
    data
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
