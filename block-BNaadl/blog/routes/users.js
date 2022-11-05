var express = require('express');
var router = express.Router();

var Article=require('../models/article')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/new',(req,res,next)=>{
  res.render('newForm')
})

router.post('/new',(req,res,next)=>{
  // res.send(req.body);
  Article.create(req.body,(err,createArticle)=>{
    if(err) return next(err);
    // console.log(createArticle)
    res.redirect("/users/list")
  })
})
router.get('/list',(req,res,next)=>{
  Article.find({},(err,articles)=>{
    if(err) return next(err)
  res.render('list',{articles})

  })
})
router.get('/:id',(req,res,next)=>{
  var id=req.params.id;
  Article.findById(id,(err,article)=>{
    if(err) return next(err)
    res.render('articleDetails',{article:article})
  })
})
router.get('/:id/edit',(req,res,next)=>{
  var id =req.params.id;
  Article.findById(id,(err,article)=>{
    if(err) return next(err)
    res.render('editForm',{article:article})
  })
})
router.post('/:id',(req,res,next)=>{
  var id =req.params.id;
Article.findByIdAndUpdate(id,req.body,(err,updatedArticle)=>{
  if(err) return next(err)
  res.redirect('/users/' + id)
})
})
router.get('/:id/likes',(req,res,next)=>{
  var id = req.params.id;
  Article.findByIdAndUpdate(id,{$inc: {likes: 1}},(err,article)=>{
    if (err) return next(err);
    res.redirect('/users/' + id)
  })
})


router.get('/:id/delete',(req,res,next)=>{
  var id =req.params.id;
  Article.findByIdAndDelete(id,(err,article)=>{
    if(err) return next(err)
    res.redirect('/users/list')
  })
})




module.exports = router;
