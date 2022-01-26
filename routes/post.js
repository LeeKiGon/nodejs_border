const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

router.get("/", (req, res) =>{
    res.send("border page");
});

router.get("/post", async (req, res) => { 
    // const { postId } = req.body; //postId값에 맞는것만 필터링!! (url에 localhsot:3000/post>?post=1< 이런식) 값 안넣으면 목록 다

    const post = await Post.find( {}); // Post모델을 사용한다
    res.json({
        post
    });
});

// router.get("/post/:id", async (req, res) => {
//     const {postId} = req.params;

//     const [detail] = await Post.find({ postId: Number(postId)}); //라우터를 통해 모델사용 > db에 있는 자료 뿌려주기(post)

//     res.json({
//         detail,
//     });
// });

router.post("/post", async (req, res) => {
    const { name, pw, memo, title} = req.body; //클라이언트로 부터 값 받기
    console.log(req.body)
    // const post = await Post.find({ Date }); // postId값을 찾는다
    // if (post.length) { //입력받은 데이터가 db에 이미 있을경우
    //     return res
    //     .status(400) //에러코드
    //     .json({ success: false, errorMessage: "이미 있는 데이터 입니다." }); //에러시 출력!!
    // }


    let date = Date.now();
    await Post.create({ name, pw, memo, title,date}); //dbdp 저장
    
    res.redirect("/");

});

module.exports = router;