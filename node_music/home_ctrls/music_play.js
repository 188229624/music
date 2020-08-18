const classSong = require('../data_schema/classSong_schema.js');
const Song = require('../data_schema/song_schema.js');
const fly = require("flyio");
const doParams = require('../comm/wyyid');

router.get('/song',async (ctx)=>{  
    ctx.compress = true
    let name = ctx.query.name;
    let name2 = name + '的音乐';
    let obj_send = {};
    let obj_fn = (docs,obj_send,ctx)=>{
      let obj = docs.map((value)=>{
        let arr = value.song_arr.filter((song_obj)=>{
          return song_obj.name === name;
        })        
        return {
          name:value.song_name,
          song_name:arr
        }
      })      
      obj_send['song'] = obj; 
      ctx.body = obj_send;
    }
    let obj = {};
    let arr4 = await Song.find({$or:[{song_name:{$regex:name, $options: 'i'}},{song_name:{ $regex:name2, $options: 'i' }}]},'song_name song_img song_arr');
    // obj.foreach(item =>{
    //     if(item.song_name === name2){
    //       item.song_name = name;
    //     }
    
    // })    
      arr4 = arr4.reduce(function(a, b) {
          if(b.song_name === name2){
            b.song_name = name;
          }          
          obj[b.song_name] ? '' : obj[b.song_name] = true && a.push(b);
          return a;
      }, [])     
    obj_send['name'] = arr4;
    let obj2 = await Song.find({'song_arr.name':{$regex:name, $options: 'i'}},'song_arr song_name');   
    obj2 = obj2.reduce(function(a, b) {
      let str = b.song_name.replace('的音乐', ''); 
      b.song_name = str;                
      obj[b.song_name] ? '' : obj[b.song_name] = true && a.push(b);
      return a;
  }, [])
    obj_fn(obj2,obj_send,ctx);
});
    
// //  Room.
// //   find({ name: 'aabb' }).
// //   exec(function (err, story) {
// //     if (err) return handleError(err);
//     // console.log(story);
// //     story[0].populate('hua');
// //   });
//   ctx.body = {};
// })

// router.get('/drawing/:id',async (ctx)=>{
//     // Room.up();
//     // let ro = new Room();
//     // ro.set();
//     ctx.body = await Room.findById(ctx.params.id);
// })

router.post('/music',async (ctx)=>{
    ctx.compress = true
    const rb = ctx.request.body;
    let d = {'ids':[rb.id],'br':128000,'csrf_token':''};
    let pa = doParams(d);
    let obj = await fly.post('https://music.163.com/weapi/song/enhance/player/url',{
    params: pa.params,
    encSecKey: pa.encSecKey
    },
      {
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/602.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/602.1'
        }
    })
    // ctx.status = 201;
    ctx.body = obj;
      // .then(function (response) {
      //   console.log(response['data']);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    // ctx.status = 201;
    // ctx.body = await Room.create( ctx.request.body );
})


// router.put('/drawing/:id',async (ctx)=>{
//     Room.schema.path('comments').validate(function (value){
//         return value.length <= 1;
//     },'length_err');
//     let opts = { runValidators: true };
    
//     let res = await Room.findByIdAndUpdate(ctx.params.id,ctx.request.body,opts);
//     ctx.body = null;
// })

// router.delete('/drawing/:id',async (ctx)=>{
//     let res = await Room.findByIdAndRemove(ctx.params.id);
//     ctx.body = null;
// })

