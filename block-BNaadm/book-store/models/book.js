var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var bookSchema=new Schema({
  title:{type:String,required:true},
  description:{type:String},
  price:{type:Number},
  author:{type:String},
  comments:[{type:Schema.Types.ObjectId, ref:"Comment"}]

},{timestamps:true});

var Book=mongoose.model('Book',bookSchema);

module.exports=Book;