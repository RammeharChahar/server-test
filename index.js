const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;


// Middleware
app.use(express.json());

// Routes
app.get('/api/posts',(req,res) =>{
    console.log("hii how are you");
    res.json({message : 'how are you all'});
});




app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
