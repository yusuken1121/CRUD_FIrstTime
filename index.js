const express = require("express");
const app = express();
const path = require("path");
const { emitWarning } = require("process");
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: true })) 
app.use(express.json())
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

let comments = [
    {
        id:uuid(),
        username: 'yamada',
        comment: 'おもしろすぎ！！'
    },
    {
        id:uuid(),
        username: 'suzuki',
        comment: '趣味はバードウォッチング'
    },
    {
        id:uuid(),
        username: 'tanaka',
        comment: 'yamadaさん、何がおもしろいんですか'
    },
    {
        id:uuid(),
        username: 'wanwan',
        comment: 'わんわんわん'
    }
];

app.get("/comments",(req,res)=>{
    res.render("comments/index",{comments})
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.get("/comments/:id/edit", (req,res)=>{
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/edit", {comment});
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
});

app.patch("/comments/:id",(req,res)=>{
    const { id } = req.params; //idを取得
    const newCommentText = req.body.comment; //フォームで送ったコメントを取得
    const foundCoumment = comments.find(c => c.id === id); //idと一致したコメントを取得
    foundCoumment.comment = newCommentText //修正コメントをコメントで置き換えする
    res.redirect("/comments");
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
});

app.post("/comments",(req,res)=>{
    const {username, comment} = req.body;
    comments.push({username, comment, id:uuid()})
    res.redirect("/comments");
});

app.get("/tacos",(req,res)=>{
    res.send("GET /tacos response");
});
app.post("/tacos",(req,res)=>{
    const {meat, qty} =req.body
    res.send(`${meat} ${qty} どうぞ`);
});

app.listen(3000, () =>{
    console.log("waiting at PORT 3000");
});