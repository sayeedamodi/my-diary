const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');

const homeContent  = " Welcome to My Personal Diary ✨";
const aboutContent ="my personal diary";
const contactContent ="sayeedamodix@gmail.com"

require('dotenv').config(); // Load environment variables

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(session({
    secret: 'jaiHind',
    resave: false,
    saveUninitialized: false
  }));
  

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret: 'jaiHind',
    resave: false,
    saveUninitialized: false
  }));
  

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {})
// mongoose.connect("mongodb://localhost:27017/diaryusersDB");


const userSchema = new mongoose.Schema({
    name : String ,
    username : String ,
    password : String ,
    posts : [
        {
          title: String,
          content: String
        }
      ]
})
userSchema.plugin(passportLocalMongoose);

const User  = mongoose.model("User", userSchema)

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Register route
app.get('/register', (req, res) => {
    res.render('register');
  });
  
  app.post('/register', (req, res) => {
    User.register({ name : req.body.name , username: req.body.username }, req.body.password, (err, user) => {
      if (err) {
        console.log(err);
        res.redirect('/register');
      } else {
        console.log("user saved succesfully")
        passport.authenticate('local')(req, res, () => {
          res.redirect('/posts');
        });
      }
    });
  });
  
//   app.get("/" , (res, req) => {
//     res.render("login");
//   })
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
  res.redirect('posts');
  }
  else {
    res.redirect("login")
  }
});
  // Login route
app.get('/login' ,(req, res )=> {
  res.render("login")  
})
  
  app.post('/login', (req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
  
    req.login(user, (err) => {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate('local')(req, res, (err) => {
        if(!err){
          res.redirect('/posts');
        }else{
        return res.redirect("/");
        }
        });
      }
    });
  });

  app.get("/posts", async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            // Find the authenticated user
            const foundUser = await User.findById(req.user._id);

            if (foundUser) {
                // Pass the user's posts to the EJS template
                res.render("post", { user: foundUser , userPosts: foundUser.posts });
            } else {
                res.status(404).send("User not found");
            }

        } catch (err) {
            console.error("Error fetching user posts:", err);
            res.status(500).send("An error occurred while fetching user posts");
        }
    } else {
        res.redirect("/");
    }
});

  
// app.get("/home", async function(req, res) {
//     try {
//       const posts = await Post.find();
//       res.render("home", {startingContent:homeContent , posts: posts });
//     } catch (err) {
//       console.error("Error fetching posts", err);
//       res.status(500).send("An error occurred while fetching posts");
//     }
//   });

app.get("/about", function (req, res){   
    res.render("about", {aboutContent:aboutContent});
});
app.get("/contact", function (req, res){   
    res.render("contact", {contactContent:contactContent});
});
// Compose route - Only accessible when authenticated
app.get("/compose", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("compose");
    } else {
        res.redirect("/");
    }
});

// Post submission handler for compose page - Only allow posting if authenticated
// Post submission handler for compose page - Save to the authenticated user's posts array
app.post("/compose", async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const newPost = {
                title: req.body.postTitle,
                content: req.body.postContent
            };

            // Find the authenticated user using their ID
            const foundUser = await User.findById(req.user._id);
            
            if (foundUser) {
                // Push the new post into the user's posts array
                foundUser.posts.push(newPost);
                
                // Save the updated user document
                await foundUser.save();
                
                // Redirect to /posts after saving the post
                res.redirect("/posts");
            } else {
                res.status(404).send("User not found");
            }

        } catch (err) {
            console.error("Error saving the post:", err);
            res.status(500).send("An error occurred while saving the post");
        }
    } else {
        res.redirect("/");
    }
});


// Logout Route
app.get("/logout", (req, res) => {
  req.logout(function(err) {  // Passport's logout method
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("An error occurred while logging out");
    }
    res.redirect("/login"); // Redirect to the home page or login page
  });
});


app.get("/posts/:postName", (req, res) => {
  if (!req.isAuthenticated()) {
      return res.redirect("/");

  }

  // Your logic to handle the post
  const requestedTitle =_.lowerCase(req.params.postName);
  console.log(`Requested title is: ${requestedTitle}`);

  // Example user fetching
  User.findById(req.user.id)
  .then( foundUser => {
    if (foundUser) {
      const matchingPost = foundUser.posts.find(post => _.lowerCase(post.title) === requestedTitle);
      if (matchingPost) {
          res.render("posts", {
              title: matchingPost.title,
              content: matchingPost.content
          });
      } else {
          res.status(404).send("Post not found");
      }
  } else {
      res.status(404).send("User not found");
  }

  })
  .catch(err => {
    console.error("Error fetching user:", err);
 });
});


app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});

