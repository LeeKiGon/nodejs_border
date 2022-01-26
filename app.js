const express = require("express");
const connect = require("./schemas");
const Post = require("./schemas/post");
const ejs = require("ejs");
connect();

const app = express();
const port = 3000;


const postRouter = require("./routes/post");

const requestMiddleware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl,"-", new Date());
    next();
};

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")
app.use(express.json()); //클라이언트에서 받은 json데이터를 파싱(json데이터를 사용할수 있게 도와주는 미들웨어)
app.use(express.urlencoded());
app.use(requestMiddleware);
app.use("/api",postRouter);
//메인 페이지(게시글 목록 페이지)
app.get("/", (req, res) => {
    res.render("index");
});
//게시글 상세페이지
app.get("/post/:id", async (req, res) => {    
    const {id} = req.params;    
    const [writedData] = await Post.find({_id: id});
    res.render("post", {list: writedData});
});

 //게시글 작성
app.get("/news", function(req, res) {
    res.render("news");
});

//게시글 삭제
// app.get("/delete/:id", async (req, res) => {
//     const {id} = req.params;
    

//     const found = await Post.find({_id:id})
    

//     await Post.deleteOne({ _id: id });


//     res.redirect("/")
// });

//삭제
app.delete("/delete", async (req, res) => {
        const {Id,password} = req.body;
        const [pwData] = await Post.find({ _id : Id });    
        
        if (pwData['pw'] === password) {
            await Post.deleteOne({ _id:Id});
            res.json({msg:'삭제 성공'});
        }else{
            res.status(400).json({success: false ,msg:'비밀번호가 다릅니다!'});
        };
});
        
app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌어요!!");
});