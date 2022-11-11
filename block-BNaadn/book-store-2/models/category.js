var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    fiction:{type:String},
    adventure:{type:String},
    technology:{type:String},
    motivation:{type:String},
},{timestamps:true})

var Category = mongoose.model('Category',categorySchema);
module.exports=Category;