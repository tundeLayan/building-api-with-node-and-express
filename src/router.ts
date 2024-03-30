import {Router} from 'express';
import {body, oneOf, validationResult} from "express-validator"
import { handleInputErrors } from "./modules/middleware";
import { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct } from "./handlers/product";
import { createUpdate, deleteUpdate, getAllUpdates, getOneUpdate, updateUpdate } from "./handlers/update";


const router = Router();

/**
 * Product
 */
router.get('/product', getAllProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)
router.post('/product', body('name').isString(), handleInputErrors,createProduct)
router.delete('/product/:id', deleteProduct)


/**
 * Update
 */
router.get('/update', getAllUpdates)
router.get('/update/:id', getOneUpdate)

const middlewareValidationsPUT = [ 
  body('title').optional(), 
  body('body').optional(),
  // body('status').isIn(['IN_PROGRESS','SHIPPED']),
  body('version').optional(),
  body('productId').exists().isString(), 
]
 
router.put('/update/:id', middlewareValidationsPUT, handleInputErrors, updateUpdate)

const middlewareValidationsPOST = [ 
  body('title').exists().isString(), 
  body('body').exists().isString(), 
  body('productId').exists().isString(), 
]
router.post('/update', middlewareValidationsPOST, createUpdate)
router.delete('/update/:id', deleteUpdate)

/**
 * Update Point
 */
router.get('/update-point', ()=>{})
router.get('/update-point/:id', ()=>{})
router.put('/update-point/:id', ()=>{})
router.post('/update-point', ()=>{})
router.delete('/update-point/:id', ()=>{})

export default router;