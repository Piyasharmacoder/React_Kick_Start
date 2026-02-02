import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';
import RollRouter from './routes/roll.route.js';
import UserRouter from './routes/user.route.js';

// Load environment variables from .env file
// dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
    origin: '*', // You can replace '*' with specific domains like 'http://yourdomain.com'
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(express.urlencoded({ extended: true })); // Using Express built-in body parser
app.use(express.json());
app.use(cors(corsOptions)); // Apply CORS settings

// Routes
app.use("/roll", RollRouter);
app.use("/user", UserRouter);

// Global error handling middleware
app.use((err, req, res) => {
    console.error("Error: ", err.message);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// Dynamic Port Configuration
// const PORT = process.env.PORT || 3001;
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}...`);
    console.log("✅ Welcome to the API...");
});















































// import express  from'express';
// import bodyParser from 'body-parser';
// import RollRouter from './routes/roll.route.js';
// import UserRouter from './routes/user.route.js';
// import cors from'cors';

// const app = express();


// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(cors());

// app.use("/roll",RollRouter);
// app.use("/user",UserRouter);

// app.listen(3001,()=>{
//     console.log("Server is started on port 3001.....");
//     console.log("Welcome to the API...");
// })
