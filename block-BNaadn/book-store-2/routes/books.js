var express = require('express');
// const{ route }= require(' . ')
var router = express.Router();

var Book=require('../models/book');
var Author=require('../models/author');
var Category=require('../models/category');



// create book form
router.get('/new',(req,res,next)=>{
  res.render('addBook')
})

/* GET books listing. */
router.get('/', (req, res, next) =>{
  Book.find({},(err,books)=>{
    if(err) return next(err)
    res.render('bookList',{books:books})
  })
});

// create book
router.post('/new',(req,res,next)=>{
  var id=req.params.id;
  Book.create(req.body,(err,createdBook)=>{
    if(err) return next(err);
    res.redirect('/books')
  })
})
// book details page
router.get('/:id',(req,res,next)=>{
  var id=req.params.id;
  Book.findById(id).populate('authorId').populate('categoryId').exec((err,book)=>{
    if(err) return next(err);
    // console.log(book, 'book details');
    res.render('bookDetails',{book: book})
  })
})

//edit

router.get('/:id/edit',(req,res,next)=>{
  var id= req.params.id;
  Book.findById(id,(err,updatebook)=>{
    if(err) return next(err);
    res.render('updatebookform',{updatebook:updatebook})
  })
})
router.post('/:id',(req,res,next)=>{
  var id = req.params.id;
  Book.findByIdAndUpdate(id,req.body,(err,update)=>{
    if(err) return next(err);
    res.redirect('/books/'+id)
  })
})

// delete
router.get('/:id/delete',(req,res,next)=>{
  var id=req.params.id;
  Book.findByIdAndDelete(id,(err,book)=>{
    if(err) return next(err);
    Author.deleteMany({bookId:book.id},(err,info)=>{
    res.redirect('/books')
     
    })
  })
})



//author

router.post('/:id/author',(req,res,next)=>{
  var id = req.params.id;
  req.body.bookId= id;
  Author.create(req.body,(err,author)=>{
    // console.log(err,author)
    if(err) return next(err)
    Book.findByIdAndUpdate(id,{$push:{authorId:author.id}},(err,author)=>{
      // console.log(authors)
      if(err) return next(err)
      res.redirect('/books/'+id)
    })
  })
})

// category

router.post('/:id/category',(req,res,next)=>{
  var id = req.params.id;
  // req.body.bookId= id;
  Category.create(req.body,(err,category)=>{
    // console.log(err,category)
    if(err) return next(err)
    Book.findByIdAndUpdate(id,{$push:{categoryId:category.id}},(err,category)=>{
      // console.log(categorys)
      if(err) return next(err)
      res.redirect('/books/'+id)
    })
  })
})





module.exports = router;
