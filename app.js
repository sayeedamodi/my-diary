const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeContent  = " Welcome to My Personal Diary ✨";
const aboutContent ="my personal diary";
const contactContent ="sayeedamodix@gmail.com"

var posts =[];


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");



app.get("/", function (req, res){    
    res.render("home", {startingContent: homeContent , posts : posts });

});
app.get("/about", function (req, res){   
    res.render("about", {aboutContent:aboutContent});
});
app.get("/contact", function (req, res){   
    res.render("contact", {contactContent:contactContent});
});
app.get("/compose", function (req, res){   
    res.render("compose");
});

app.post("/compose", function(req,res){
   const post = {
       postTitle : req.body.postTitle,
       postContent : req.body.postContent 
   }
   posts.push(post);
   res.redirect("/");
});

app.get("/posts/:postName", function (req,res){
   const requestedTitle = _.lowerCase(req.params.postName) ;
   
    console.log(`requested title is ${requestedTitle}`);

   posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.postTitle);
    console.log(`stored title are ${storedTitle}`);
    if(storedTitle === requestedTitle) {
        res.render("post",{
            title: post.postTitle,
            content: post.postContent
        });
    }
   });
});
app.listen(3000, function(){
    console.log("server is running on port 3000");
});

