import express from 'express';
import { body } from 'express-validator';
import {verifyToken} from'../middleware/auth.js';
import { Add, List, Search, Update, Remove } from '../controller/roll.controller.js';

const router = express.Router();

// Add a new roll 
// Example: localhost:3001/role/add
router.post('/add',
    body("name", "Name must contain only letters.").notEmpty().isAlpha(),
    body("isActive", "Invalid input. Please enter either 0 or 1.").notEmpty().isInt({ min: 0, max: 1 }),
    Add
);

// Get all rolls
router.get('/list',List);

// Search for a roll
router.post('/search', 
    body("id", "Please enter a valid id.").notEmpty().isNumeric(),
    Search
);

// Update a roll
router.put('/update', verifyToken,
    body("id", "Please enter a valid id.").notEmpty().isNumeric(),
    body("name", "Name must contain only letters.").notEmpty().isAlpha(),
    body("isActive", "Invalid input. Please enter either 0 or 1.").notEmpty().isInt({ min: 0, max: 1 }),
    Update
);

// Delete a roll
router.delete('/delete',verifyToken,
    body("id", "Please enter a valid id.").notEmpty().isNumeric(),
    Remove
);

export default router;
