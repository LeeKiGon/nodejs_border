const express = require("express"); //express 사용
const Post = require("../schemas/post"); // 스키마의 post.js파일 추적
const router = express.Router();  //라우터 사용

router.get("/", (req, res) =>{  // 사이트 url "/" 화면
    res.send("border page"); 
});

router.get("/post", async (req, res) => { 
    // const { postId } = req.body; //postId값에 맞는것만 필터링!! (url에 localhsot:3000/post>?post=1< 이런식) 값 안넣으면 목록 다

    const post = await Post.find( {}); // Post모델을 사용한다 find = Post의 모든 정보를 찾는다(가져온다)
    res.json({ //응담(json)형식 post 실행(바로 윗줄 Post.find 에 대한 응답값 실행)
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

router.post("/post", async (req, res) => { //게시글db에 저장
    const { name, pw, memo, title, Date} = req.body; //클라이언트로 부터 입력 값 받아오기
    console.log(req.body)
    // const post = await Post.find({ Date }); // postId값을 찾는다
    // if (post.length) { //입력받은 데이터가 db에 이미 있을경우
    //     return res
    //     .status(400) //에러코드
    //     .json({ success: false, errorMessage: "이미 있는 데이터 입니다." }); //에러시 출력!!
    // }
    await Post.create({ name, pw, memo, title,Date}); //dbdp 저장
    
    res.redirect("/"); //(응답)성공하면 url"/"로 간다

});

module.exports = router; //모듈 사용 선언