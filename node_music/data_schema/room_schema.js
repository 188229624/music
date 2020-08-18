// //const Book = require('./book_schema');
// var Schema = mongoose.Schema;

// var room = new Schema({
//   name:{
//     type:String,
//     required:true
//   },
//   title:{
//     type:String
//     // validate:{
//     //   isAsync: true,
//     //   validator: function (req,cb) {
//     //     let flag = req.length >= 3;
//     //     cb(flag,'title' + flag);
//     //   }
//     // }
    
//   },
//   author: String,
//   body:   String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//    },
//   // book_url:{ type: Schema.Types.ObjectId, ref:'Book' },
//   book_arr:[{ type: Schema.Types.ObjectId, ref: 'Book' }]
// },{ collection: 'gmhRoom' })


// room.methods.add = function(){

// }

// room.methods.set = function(){
//     //console.log(this);
// }

// room.statics.del = function(){

// }

// room.statics.up = function(){
//    //console.log(this);
// }

// room.query.toName = function(req){

// }


// room.virtual('getName').
// get(function(){

// }).
// set(function(v){

// })

// room.pre('save',async function(next){
//     //console.log('a');
//     next();
// })

// room.pre('save',async function(next){
//     //console.log(arguments);
//     //console.log('b');
//     next();
// })

// room.post('save', function(doc, next) {
//   setTimeout(function() {
//     //console.log(arguments);
//     //console.log(doc);
//     //console.log('post1');
//     next('post_save');
//   }, 10);
// });

// room.index({name:1,type:1});
// room.set('toObject',{virtual:true});
// room.set('toJSON',{virtual:true});







// module.exports = mongoose.model('Room', room);

// var storySchema = Schema({
//   author: { type: Schema.Types.ObjectId, ref: 'Person' },
//   title: String,
//   fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
// });

// module.exports = mongoose.model('Story', storySchema);