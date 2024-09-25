const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeContent  = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus dignissim tristique. Vestibulum varius erat elit, in condimentum turpis tempor sed. Maecenas felis nisl, lacinia id felis vitae, bibendum laoreet nisi. Suspendisse justo justo, consectetur quis sapien sit amet, tempor hendrerit nisi. Ut ultrices fringilla auctor. Aliquam erat volutpat. Proin in tristique nisi.";
const contactContent ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus dignissim tristique. Vestibulum varius erat elit, in condimentum turpis tempor sed. Maecenas felis nisl, lacinia id felis vitae, bibendum laoreet nisi. Suspendisse justo justo, consectetur quis sapien sit amet, tempor hendrerit nisi. Ut ultrices fringilla auctor. Aliquam erat volutpat. Proin in tristique nisi.";
const aboutContent =  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus dignissim tristique. Vestibulum varius erat elit, in condimentum turpis tempor sed. Maecenas felis nisl, lacinia id felis vitae, bibendum laoreet nisi. Suspendisse justo justo, consectetur quis sapien sit amet, tempor hendrerit nisi. Ut ultrices fringilla auctor. Aliquam erat volutpat. Proin in tristique nisi.";

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

app.listen(3000, function(){
    console.log("server is running on port 3000");
});

