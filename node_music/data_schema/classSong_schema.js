var Schema = mongoose.Schema;

var classSong = new Schema({
  _id: Schema.Types.ObjectId,
  class:{
      type:String,
      require:true
  },
  name_class:{
    type:String,
    require:true
  },
  song_name:{
    type:String,
    require:true
  },
  song_img:{
    type:String,
    require:true
  },
  songs:[{ type: Schema.Types.ObjectId, ref: 'Song' }]
},{ collection: 'classSong' })


module.exports = mongoose.model('classSong', classSong);