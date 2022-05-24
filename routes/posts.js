const express = require('express');
const Posts = require('../schemas/posts');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('this is home page');
});

router.get('/post', async (req, res) => {
  const posts = await Posts.find().sort({date:-1});
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

  const posts = await Posts.findOne({ postId });
console.log(posts)
  res.json({
    posts
  });
});

router.delete('/post/:postId/:pwd', async (req, res) => {
  const { postId, pwd } = req.params;

  const existsPosts = await Posts.find({ postId, pwd });
  if (existsPosts.length) {
    await Posts.deleteOne({ postId });
  } else {
    return res.json({ success: false, errorMassege: "비밀번호가 일치하지 않습니다."})
  }

  res.json({ success: true, 'msg': '삭제되었습니다.' });
});

router.put('/post/:postId/:pwd', async (req, res) => {
  const { postId, pwd } = req.params;
  const { content } = req.body;

  const existsPosts = await Posts.find({ postId, pwd });
  if (!existsPosts.length) {
    return res.status(400).json({ success: false, errorMassege: "비밀번호가 일치하지 않습니다."});
  }

  await Posts.updateOne({ postId }, { $set: { content } });

  res.json({ success: "수정 완료"});
});

module.exports = router;