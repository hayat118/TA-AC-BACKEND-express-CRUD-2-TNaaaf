var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var authorSchema= new Schema({
  name:{type:String},
  email:{type:String,required:/@/},
  country:{type:String},
 // bookId:{type:Schema.Types.ObjectId, ref:"Book", required:true}
},{timestamps:true})

var Author=mongoose.model('Author',authorSchema)

module.exports=Author;
