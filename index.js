const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const userRoute = require('./routes/users');
const teamRoute = require('./routes/teams');

const PORT = process.env.PORT || 3001;


// Middleware
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://guestUser:Password123@cluster2.t13t4gs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes
app.use('/api/posts',userRoute);
app.use('/api/team',teamRoute);

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
