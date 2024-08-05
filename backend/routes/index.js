const express = require('express')

const router = express.Router()

const userSignUpController = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSignin')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUserRole')
const uploadProductController = require('../controller/products/uploadProduct')
const getProductController = require('../controller/products/getProduct')
const updateProductController = require('../controller/products/updateProduct')
const getCategoryProducts = require('../controller/products/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/products/getCategoryWiseProducts')
const getProductDetails  = require('../controller/products/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/products/searchProduct')
const filterProductController = require('../controller/products/filterProduct')


//user login and signin and auth

router.post('/signup',userSignUpController)

router.post('/signin',userSignInController)

router.get('/user-details', authToken ,userDetailsController)

router.get('/userLogout',userLogout)
//admin panel 
router.get('/all-user',authToken ,allUsers)
router.post("/update-user",authToken,updateUser)



// product
router.post('/upload-product',authToken,uploadProductController,)
router.get('/get-product',getProductController)
router.post('/update-product',authToken,updateProductController)
router.get('/get-categoryProduct',getCategoryProducts)

router.post("/category-product",getCategoryWiseProduct)

router.post('/product-details',getProductDetails)
router.get('/search',searchProduct)
router.post("/filter-product",filterProductController)

 //  user add to cart 

router.post('/addtocart',authToken,addToCartController)

router.get('/countAddToCartProduct',authToken,countAddToCartProduct)

router.get('/view-cart-product',authToken,addToCartViewProduct)

router.post('/update-cart-product',authToken,updateAddToCartProduct)

router.post('/delete-cart-product',authToken,deleteAddToCartProduct)



module.exports = router



