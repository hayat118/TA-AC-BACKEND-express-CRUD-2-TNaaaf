var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var bookSchema= new Schema({
  title:{type:String, required:true},
  summary:{type:String},
  pages:{type:Number},
  publication:{type:String},
  // cover_image:{type:URL},
  // category:[{type:Schema.Types.ObjectId, ref:"category"}],
  category:[{type:String}],
  author:{type:Schema.Types.ObjectId, ref:"Author"},

},{timestamps:true});

var Book=mongoose.model('Book',bookSchema);

module.exports=Book;

