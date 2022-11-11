var express = require('express');
var router = express.Router();

var Book=require('../models/book');
var Author=require('../models/author')



// create book form
router.get('/new',(req,res,next)=>{
  res.render('addBook')
})

/* GET books listing. */
router.get('/', (req, res, next) =>{
  // res.send('respond with a resource');
  Book.find({},(err,books)=>{
    if(err) return next(err)
    res.render('bookList',{books:books})
  })
});

// create book
router.post('/new',(req,res,next)=>{
  Author.create({
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
  }, (err, createdAuthor) => {
    console.log(createdAuthor, err);
    Book.create({...req.body, author: createdAuthor._id},(err,createdBook)=>{
      if(err) return next(err)
      res.redirect('/books')
    })
  })
  req.body.author = 
  console.log(req.body, 'request body');
  
})  
// book details page
router.get('/:id',(req,res,next)=>{
  var id=req.params.id;
  Book.findById(id).populate('author').exec((err,book)=>{
    if(err) return next(err);
    console.log(book, 'book details');
    res.render('bookDetails',{book: book})
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




module.exports = router;
