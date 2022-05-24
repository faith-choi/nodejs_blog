const express = require('express');
const Posts = require('../schemas/posts');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('this is home page');
});

router.get('/post', async (req, res) => {
  const posts = await Posts.find();
  res.json({
    posts,
  })
});


router.get('/post/:userId', async (req, res) => {
  const { userId } = req.params;

  const [content] = await Posts.find({ userId: userId });

  res.json({
    content,
  });
});

router.post('/posts', async (req, res) => {
  const { userId, title, name, content, pwd } = req.body;

  const posts = await Posts.find({ userId });
  if (posts.length) {
    return res.status(400).
    json({ success: false, errorMassege: "이미 있는 데이터입니다." });
  }

  const createdPosts = await Posts.create({ 
    userId, 
    title, 
    name, 
    content,
  });

  res.json({ posts: createdPosts });
});


module.exports = router;