const express = require('express');

const app = express();
const routes=require('./router/book')
const Reviewroutes=require('./router/reviews')
const ReviewroutesByaxios=require('./router/byaxios')
const session = require('express-session')
const jwt = require('jsonwebtoken');
const PORT=5000;

let users = []

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

// Check if the user with the given username and password exists
const authenticatedUser = (username, password) => {
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

app.use(session({secret:"fingerpint"},resave=true,saveUninitialized=true));

app.use(express.json());



// Middleware to authenticate requests to "/review" endpoint
app.use("/review", function auth(req, res, next) {

    console.log('req.session',req.session)
    // Check if user is logged in and has valid access token
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken'];

        // Verify JWT token
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user;
                next(); // Proceed to the next middleware
            } else {
                return res.status(403).json({ message: "User not authenticated" });
            }
        });
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});

// Login endpoint
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        
        return res.status(200).json("User successfully logged in",req.session.authorization);
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});
// Register a new user
app.post("/register", (req, res) => {
    console.log('req==>',req.body)
    const username = req.body.username;
    const password = req.body.password;

    console.log('password==>',password,username)

    // Check if both username and password are provided
    if (username && password) {
        console.log('!doesExist(username)',!doesExist(username))
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});



app.use("/review", Reviewroutes);



app.use("/books", routes);
app.use("/bookswithaxios", ReviewroutesByaxios);
app.listen(PORT,()=>console.log("Server is running",PORT));



