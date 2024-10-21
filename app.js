const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
const homeContent  = " Welcome to My Personal Diary ✨";
const aboutContent ="my personal diary";
const contactContent ="sayeedamodix@gmail.com"

require('dotenv').config(); // Load environment variables


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("Error connecting to MongoDB:", err));

const postsSchema = new mongoose.Schema({
    postTitle : String ,
    postContent : String
})

const Post  = mongoose.model("Post", postsSchema)
// var posts =[];


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");



app.get("/", async function(req, res) {
    try {
      const posts = await Post.find();
      res.render("home", {startingContent:homeContent , posts: posts });
    } catch (err) {
      console.error("Error fetching posts", err);
      res.status(500).send("An error occurred while fetching posts");
    }
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

app.get("/posts/:postName", async function (req, res) {
    try {
        const requestedTitle = _.lowerCase(req.params.postName);
        console.log(`Requested title is: ${requestedTitle}`);

        // Fetch all posts from the database
        const posts = await Post.find();
        
        // Find the post that matches the requested title
        const matchingPost = posts.find(post => _.lowerCase(post.postTitle) === requestedTitle);
        
        if (matchingPost) {
            // Render the 'post' view with the matching post's data
            res.render("post", {
                title: matchingPost.postTitle,
                content: matchingPost.postContent
            });
        } else {
            // If no post is found, render a 404 or an error message
            res.status(404).send("Post not found");
        }
    } catch (err) {
        console.error("Error fetching posts", err);
        res.status(500).send("An error occurred while fetching the post");
    }
});



app.post("/compose", function(req, res) { 
    const post = new Post({
        postTitle: req.body.postTitle,
        postContent: req.body.postContent
    });
 
    post.save();
    res.redirect("/");
        // .then(() => {
        //     res.redirect("/");  // Redirect after saving
        // })
        // .catch(err => {
        //     console.error("Error saving the post", err);
        //     res.status(500).send("An error occurred while saving the post");
        // });
 });


app.listen(3000, function(){
    console.log("server is running on port 3000");
});

