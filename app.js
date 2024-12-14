const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 3000;

// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to serve static files from the src directory
app.use('/src', express.static(path.join(__dirname, 'src'))); // Note the '/src' prefix

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(cookieParser());

// Endpoint to get articles
app.get('/api/articles', (req, res) => {
    const articlesPath = path.join(__dirname, 'src', 'articles.json');
    fs.readFile(articlesPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading articles file' });
        }
        const articles = JSON.parse(data); 
        res.json(articles);
    });
});

// Endpoint to update articles (for the admin interface)
app.post('/api/articles', (req, res) => {
    const articlesPath = path.join(__dirname, 'src', 'articles.json');
    const newArticle = req.body;

    // Add a timestamp for when the article is uploaded
    const date = new Date();
    newArticle.uploadDate = date.toISOString().split('T')[0]; // Get only the date part

    fs.readFile(articlesPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading articles file' });
        }
        const articles = JSON.parse(data);
        articles.push(newArticle); // Add the new article to the array

        fs.writeFile(articlesPath, JSON.stringify(articles, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error writing articles file' });
            }
            res.status(201).json(newArticle); // Respond with the newly created article
        });
    });
});

const users = [
    { username: "admin", password: "admin" },
    { username: "salmantap", password: "salmantap" },
    { username: "user2", password: "password456" }
];

app.post('/login', (req,res) => {
    const {username , password} = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if(user){
        res.cookie('auth','true', { maxAge: 5*60*1000, httpOnly: true });
        res.json({success: true});
    } else {
        res.json({success: false});
    }
});

app.get('/check-auth', (req,res) => {
    if(req.cookies.auth === 'true'){
        res.json({authenticated:true});
    }else{
        res.json({authenticated:false});
    }
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/admin.html', (req, res, next) => {
    if (req.cookies.auth === 'true') {
        next(); // Proceed if authenticated
    } else {
        res.redirect('/login.html'); // Redirect to login page if not authenticated
    }
}, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html')); // Serve the admin page
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
