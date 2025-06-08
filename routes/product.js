const express = require("express")
const router = express.Router();
const { productModel, validateProduct } = require("../models/product")
const { categoryModel, validateCategory } = require("../models/category")
const { cartModel, validateCart } = require("../models/cart")
const upload = require("../config/multer_config")
const {validateAdmin, userIsLoggedIn} = require("../middlewares/admin")

router.get("/", userIsLoggedIn ,async (req,res)=>{
       let somethingInCart = false;
       const result = await productModel.aggregate([
  {
    $sort: { _id: 1 } // or any other sorting logic you prefer
  },
  {
    $group: {
      _id: "$category",
      products: { $push: "$$ROOT" }
    }
  },
  {
    $project: {
      _id: 0,
      category: "$_id",
      products: { $slice: ["$products", 10] }
    }
  }
]);

let cart = await cartModel.findOne({user: req.session.passport.user});
if(cart && cart.products.length>0) somethingInCart = true;

let rnproducts = await productModel.aggregate([{$sample: {size:3}}])

const formattedResult = {};
result.forEach(item => {
  formattedResult[item.category] = item.products;
});

    res.render("index", { products: formattedResult , rnproducts, somethingInCart, cartCount: cart ? cart.products.length : 0,})
})

router.get("/delete/:id", validateAdmin , async (req,res)=>{

    if(req.user.admin){
        let prods = await productModel.findOneAndDelete({_id: req.params.id});
        return res.redirect("/admin/products")
    }
    res.send("You are not allowed to delete this product")

})

router.get("/delete", validateAdmin , async (req,res)=>{

    if(req.user.admin){
        let prods = await productModel.findOneAndDelete({_id: req.body.product_id});
        return res.redirect("back")
    }
    res.send("You are not allowed to delete this product")

})

router.post("/", upload.single("image") , async (req,res)=>{
    let { name,price,category,stock,description,image } = req.body;
    let {error} = validateProduct({name,price,category,stock,description,image})
    
    if(error) return res.send(error.message);
    
    let isCategory = await categoryModel.findOne({ name:category })
    if (isCategory){
        await categoryModel.create({name: category})
    }

    let product = await productModel.create({
        name,
        price,
        category,
        image: req.file.buffer,
        description,
        stock,
    });


    res.redirect(`/admin/dashboard`);

})


module.exports = router