
// const Story = require('../data_schema/room_schema.js');
// const Person = require('../data_schema/book_schema');

// router.get('/drawing',async (ctx)=>{
//     // ctx.body = await Room.find(ctx.query);
//     // console.log(ctx.body);
    
//     var author = new Person({
//         _id: new mongoose.Types.ObjectId(),
//         name: 'Ian Fleming 3',
//         age: 80
//       });
      
//       await author.save();
       

//       var story1 = new Story({
//         title: 'ya',
//         author: author._id    // assign the _id from the person
//       });
    
//      await story1.save();

//      Story.
//   findOne({ title: 'ya' }).
//   populate('author').
//   exec(function (err, story) {
//     if (err) return handleError(err);
//     console.log('The author is %s', story.author.name);
//     // prints "The author is Ian Fleming"
//   });
    
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

// router.post('/drawing',async (ctx)=>{
//     ctx.status = 201;
//     ctx.body = await Room.create( ctx.request.body );
// })


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

