const Koa = require('koa');
const fs = require('fs');

global.app = new Koa();
global.router = require('koa-router')();

app.use(require("koa-helmet")());
app.use(require('@koa/cors')());
app.use(require('koa-methodoverride')()); 
app.use(require( 'koa-bodyparser' )());
app.use(require('koa-compress')({
    filter: function(content_type) { 
      return /text/i.test(content_type);
    },
    threshold: 1024,
    flush: require('zlib').Z_SYNC_FLUSH 
  })
);
require('koa-qs')(app);


// app.use(async (ctx,next)=>{
//   console.log('a');
//   let a = await next();
//   console.log(a);
//   console.log('a1');
// });


let fil_arr = [];
var files_list = function (path) {
    let dir = fs.readdirSync(path);;
    for (const dirent of dir) {
        if(dirent !== 'node_modules' && dirent !== 'tests'){
            let state_file = fs.statSync(path + dirent);
            if(state_file.isDirectory()){
                files_list(path + dirent + '/');
            }else{
                fil_arr.push(path + dirent)
            }
        }
    }
}

var start = function(){
    files_list('./');
    fil_arr.forEach((item)=>{
        let test_js = /\.js$/;
        if(test_js.test(item) && item !== './index.js'){
            let star_js = require(item);
            if(star_js.start){
                if(star_js.start()){
                    app.use(router.routes()).use(router.allowedMethods()); 
                    app.listen(80, () => {
                    console.log('This server is running at http://localhost:' + 80);
                    })
                }else{
                    console.log('数据库连接失败,启动出错')
                }
            }
        }
    })
    
}
start();

