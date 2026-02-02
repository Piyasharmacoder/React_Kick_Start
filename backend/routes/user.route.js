import express from 'express';
import { SignUp, Login, List, SoftDelete, Update } from '../controller/user.controller.js';
import { body } from 'express-validator';
import {verifyToken} from'../middleware/auth.js';

const router = express.Router();

// signUp routes
router.post('/signup',
    body("email", "Invalid email address").notEmpty().isEmail(),
    body("name", "Name is required and must contain only letters").notEmpty().matches(/^[A-Za-z ]+$/),
    body("password", "Password must be between 8 and 16 characters").notEmpty().isLength({ min: 8, max: 16 }),
    body("contactNumber", "Contact number must be exactly 10 digits and numeric").notEmpty().isLength({ min: 10, max: 10 }).isNumeric(),
    body("isDeleted", "isDeleted must be either 0 or 1").notEmpty().isInt({ min: 0, max: 1 }),
    body("rollId", "Roll ID is required").notEmpty().isNumeric(),
    SignUp);


// login routes
router.post('/login',
    body("email", "Invalid email address").notEmpty().isEmail(),
    body("password", "Password must be between 8 and 16 characters").notEmpty().isLength({ min: 8, max: 16 }),
    Login);

// user list routes
router.get('/list',List);

// remove user routes
router.delete('/remove',
    body("id", "ID is required and must be numeric").notEmpty().isNumeric(),
    // body("isDeleted", "isDeleted must be either 0 or 1").notEmpty().isInt({ min: 0, max: 1 }),
    // body("isActive", "isActive must be either 0 or 1").notEmpty().isInt({ min: 0, max: 1 }),
    SoftDelete);

// update user routes
router.put('/update',

    body("email", "Invalid email address").notEmpty().isEmail(),
    body("name", "Name is required and must contain only letters").notEmpty().matches(/^[A-Za-z ]+$/),
    body("password", "Password must be between 8 and 16 characters").notEmpty().isLength({ min: 8, max: 16 }),
    body("contactNumber", "Contact number must be exactly 10 digits and numeric").notEmpty().isLength({ min: 10, max: 10 }).isNumeric(),
    body("isDeleted", "isDeleted must be either 0 or 1").notEmpty().isInt({ min: 0, max: 1 }),
    body("rollId", "Roll ID is required").notEmpty().isNumeric(),
    body("id", "ID is required and must be numeric").notEmpty().isNumeric(),

    Update);

export default router;





//SignUp
// Login
// List
//  Remove
// Update







































