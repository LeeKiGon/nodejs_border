const express = require("express");
const connect = require("./schemas");
const Post = require("./schemas/post");
const ejs = require("ejs"); //ejs 템플릿 사용!!

connect(); //db 연결

const app = express(); 
const port = 3000; //포트


const postRouter = require("./routes/post");

const requestMiddleware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl,"-", new Date());
    next();
};
console.log(new Date);

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")
app.use(express.json()); //클라이언트에서 받은 json데이터를 파싱(json데이터를 사용할수 있게 도와주는 미들웨어)
app.use(express.urlencoded()); //req안의 데이터를 url로 인코딩하여 파싱(해석)한다
app.use(requestMiddleware); //app.use안에 있는 모든 함수들은 모두 미들웨어이며 요청이 올때마다 미들웨어를 거쳐
app.use("/api",postRouter);  //클라이언트에게 응답하게 된다.

//메인 페이지(게시글 목록 페이지)
app.get("/", (req, res) => {
    res.render("index");
});

//게시글 상세페이지
app.get("/post/:id", async (req, res) => {    
    const {id} = req.params; // 요청 url 정보
    const [writedData] = await Post.find({_id: id}); //[]해줘야 obj 받아옴
    res.render("post", {list: writedData});
});

 //게시글 작성페이지
app.get("/news", function(req, res) {
    res.render("news");
});

//게시글 삭제
app.delete("/delete", async (req, res) => {
        const {Id,password} = req.body; //클라이언트에게 전달받은 id,pasword
        const [pwData] = await Post.find({ _id : Id }); //db에서 id로 찾아 내용을 변수에 저장 ([]해줘야 obj 받아옴)
        
        if (pwData['pw'] === password) {  //db의 pw와 클라이언트에서 입력받은 pasword 비교
            await Post.deleteOne({ _id:Id}); //일치하면 해당id값을 가진 db데이터 삭제
            res.json({msg:'삭제 성공'});
        }else{
            res.status(400).json({success: false ,msg:'비밀번호가 다릅니다!'});
        };
});
//게시글 수정!!
app.post("/save/:id", async (req, res) => {
    const {Id,password,memo} = req.body; //클라이언트에게 전달받은 id,password,memo
    const [saveData] = await Post.find({_id : Id}); //db에서 id로 찾아 내용을 변수에 저장 ([]해줘야 obj 받아옴)
    if (saveData['pw'] === password) { //db와 클라이언트에서 입력받은 password 비교
        await Post.findByIdAndUpdate(req.params.id, {memo: req.body.memo}); //db의 id값을 찾아 클라이언트에 입력받은값을 db에 저장
        res.json({ success: '수정 완료!' })
    } else {
        res.json({ success: "비밀번호가 틀립니다!!"})
    }
});
        
app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌어요!!");
});