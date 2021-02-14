const Blog = require("../models/blog");
const User = require("../models/user");

exports.get_blogs = function (req, res, next) {
  Blog.find({})
    .populate('author')
    .then((blogs) =>
      res.render("index", { title: "Home Page", blogs: blogs})
    )
    .catch((err) => next(err));
};

exports.get_create_blog = function(req, res, next){
  res.render('create-blog',{title: 'Create Blog'});
}

exports.post_create_blog = function (req, res, next) {
  const {title, content} = req.body;
  const author = req.user._id;
  const _blog = new Blog({ title, content, author });
  _blog.save().catch((err) => next(err));
  res.redirect("/blogs");
};

exports.post_delete_blog = function (req, res, next){
    Blog.findByIdAndDelete(req.params.id)
        .catch(err => next(err));
    res.redirect('/blogs');
}