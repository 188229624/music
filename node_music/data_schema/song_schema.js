var Schema = mongoose.Schema;

var Song = new Schema({
  _id: Schema.Types.ObjectId,
  song_name:{
    type:String,
    require:true
  },
  song_img:{
    type:String,
    require:false
  },
  song_arr:[
      {
        name:{
            type:String,
            require:true
        },
        song_id:{
          type:String,
          require:true
        },
        song_zj:{
          type:String,
          require:false
        },
        song_time:{
          type:String,
          require:false
        }       
      }
  ],  
  class:[{ type: Schema.Types.ObjectId, ref: 'classSong' }]
},{ collection: 'Song' })


module.exports = mongoose.model('Song', Song);