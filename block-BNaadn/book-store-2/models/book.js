var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var bookSchema= new Schema({
  title:{type:String, required:true},
  summary:{type:String},
  pages:{type:Number},
  publication:{type:String},
  // cover_image:{type:String},
  authorId:[{type:Schema.Types.ObjectId, ref:"Author"}],
  categoryId:[{type:Schema.Types.ObjectId, ref:"category"}],


},{timestamps:true});

var Book=mongoose.model('Book',bookSchema);

module.exports=Book;

