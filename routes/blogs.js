var express = require("express");
var router = express.Router();
const { isLoggedIn, verifyAdmin, verifyMember } = require("../controllers/auth");
const { get_blogs, get_create_blog, post_create_blog, post_delete_blog } = require("../controllers/blogs");

router.get("/", get_blogs);

router.get('/create', get_create_blog);

router.post('/create', verifyMember, post_create_blog);

router.post('/:id/delete', verifyAdmin, post_delete_blog);

module.exports = router;
