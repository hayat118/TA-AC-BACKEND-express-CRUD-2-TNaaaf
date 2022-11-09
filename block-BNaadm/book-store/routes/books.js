var express = require('express');
var router = express.Router();
var Book= require('../models/book');
var Comment=require('../models/comment');


// 
// router.get('/',(req,res,next)=>{
//   res.send('respond with resources')
// })




// create book form
router.get('/new',(req,res,next)=>{
  res.render('addBook')
})
/* GET books listing. */
router.get('/', (req, res, next)=> {
  // res.send('respond with a resource');
  Book.find({},(err,books)=>{
    if (err) return next(err);
    res.render('list',{books:books})
  })
});
// create book

router.post('/new',(req,res,next)=>{
  Book.create(req.body,(err,createdBook)=>{
     if(err) return next(err)
     res.redirect('/books')
  })
})

// // get book details page(method1)
// router.get('/:id',(req,res,next)=>{
//   var id =req.params.id;
//   Book.findById(id,(err,book)=>{
//     if(err) return next(err)
//     res.render('bookDetails',{book:book})
//   })
// })

// // get book details page(method2)
// router.get('/:id',(req,res,next)=>{
//   var id =req.params.id;
//   Book.findById(id,(err,book)=>{
//     if(err) return next(err)
//    Comment.find({bookId:id},(err,comments)=>{
//     res.render('bookDetails',{book,comments})
     
//    }) 
//   })
// });

// get book details page(method3)
router.get('/:id',(req,res,next)=>{
  var id =req.params.id;
  Book.findById(id).populate('comments').exec((err,book)=>{
    if(err) return next(err);
    res.render('bookDetails',{book:book})
  })
});

// 
router.get('/:id/edit',(req,res,next)=>{
  var id =req.params.id;
  Book.findById(id,(err,book)=>{
    if(err) return next(err)
    res.render('editBook',{book:book})
  })
})
router.post('/:id',(req,res,next)=>{
  var id=req.params.id;
  Book.findByIdAndUpdate(id,req.body,(err,updatedBook)=>{
    if(err) return next(err)
    res.redirect('/books/' + id)
  })
})
// 
router.get('/:id/delete',(req,res,next)=>{
  var id=req.params.id;
  Book.findByIdAndDelete(id,(err,book)=>{
    if(err) return next(err);
    Comment.deleteMany({bookId: book.id},(err,info)=>{
    res.redirect('/books')
       
    })
  })
})

// add comment
router.post('/:id/comments',(req,res)=>{
  req.body.bookId=id;
  Comment.create(req.body,(err,comment)=>{
     if(err) return next(err);
    //  update book with comment id into comments section
    Book.findByIdAndUpdate(id,{$push:{comments:comment._id}},(err,updatedBook)=>{
     if(err) return next(err);
     res.redirect('/books/' + id)
       
    })
  })
})


module.exports = router;
