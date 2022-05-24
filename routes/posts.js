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



router.post('/posts', async (req, res) => {
  const { postId, title, userName, content, pwd } = req.body;

  const posts = await Posts.find({ postId });
  if (posts.length) {
    return res.status(400).
    json({ success: false, errorMassege: "이미 있는 데이터입니다." });
  }

  const createdPosts = await Posts.create({ 
    postId, 
    title, 
    userName, 
    content,
    date: new Date(),
    pwd,
  });

  res.status(201).json({ 'result': 'success', 'msg': '등록되었습니다.' });
});


router.get('/post/:postId', async (req, res) => {
  const { postId } = req.params;

  const content = await Posts.findOne({ postId });

  res.json({
    content
  });
});

router.delete('/post/:postId', async (req, res) => {
  const { postId } = req.params;

  const existsPosts = await Posts.find({ postId });
  if (existsPosts.length) {
    await Posts.deleteOne({ postId });
  }

  res.json({ success: true });
});

router.put('/post/:postId', async (req, res) => {
  const { postId } = req.params;

  const existsPosts = await Posts.find({ postId });
  if (!existsPosts.length) {
    return res.status(400).json({ success: false, errorMassege: "수정"});
  }

  await Posts.updateOne({ postId }, { $set: { content: content } });

  res.json({ success: true});
});

module.exports = router;