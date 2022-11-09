var express=require('express');
const Book = require('../models/book');
var router=express.Router();

var Comment=require('../models/comment')

router.get('/:id/edit',(req,res)=>{
   var id=req.params.id;
   Comment.findById(id,(err,comment)=>{
     if(err) return next(err);
     res.render('updateComment',{comment:comment})
   })
})

router.post('/:id',(req,res)=>{
  var id=req.params.id;
  Comment.findByIdAndUpdate(id,req.body,(err,updatedComment)=>{
    if(err) return next(err)
    res.redirect('/books/' + updatedComment.bookId)
  })
})

router.get('/:id/delete',(req,res,next)=>{
  var commentId=req.params.id;
  Comment.findByIdAndDelete(commentId,(err,comment)=>{
    if(err) return next(err);
    Book.findByIdAndUpdate(comment.bookId,{$pull:{comments:comment._id}},(err,book)=>{
    res.redirect('/books/' + comment.bookId)
       
    })
  })
})
     


module.exports=router;