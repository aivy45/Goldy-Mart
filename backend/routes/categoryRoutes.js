import express from 'express'
import {isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { categoryController, 
         createCategoryController,
         deleteCategoryController,
         singleCategoryController,
         updateCategoryController,
         } 
from '../controllers/categoryController.js';

 const router = express.Router(); 


 //routes

 // Create Category || post 
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

// Update Category || put
// As passing id as it is admin so admin has access of id
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController )

// get all category  || get
router.get('/get-category', categoryController)

//single category || get
// passing slug as it is user so user might not have access of id
router.get('/single-category/:slug', singleCategoryController)
export default router

// delete category || delete
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)





