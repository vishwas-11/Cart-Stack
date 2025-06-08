// const express = require("express")
// const router = express.Router();
// const { cartModel, validateCart } = require("../models/cart")
// const {validateAdmin, userIsLoggedIn} = require("../middlewares/admin");
// const { productModel } = require("../models/product");


// router.get("/", userIsLoggedIn , async (req,res)=>{
//     try{
//         let cart = await cartModel.findOne({user: req.session.passport.user}).populate("products")
        
//         let cartDataStructure = []

//         cart.products.forEach(product=>{
//             let key = product._id.toString();
//             if(cartDataStructure[key]) {
//                 cartDataStructure[key].quantity += 1;
//             } else {
//                 cartDataStructure[key] = {
//                     ...product._doc,
//                     quantity: 1,
//                 }
//             }
//         })

//         let finalarray = Object.values(cartDataStructure);

//         let finalprice = cart.totalPrice + 34;

//         res.render("cart", {cart: finalarray, finalprice: finalprice, userid: req.session.passport.user, })
//     } catch(err) {
//         res.send(err.message)
//     }
// })


// router.get("/remove/:id", userIsLoggedIn , async (req,res)=>{
//     try{
//         let cart = await cartModel.findOne({
//             user: req.session.passport.user,
//         });
//         let product = await productModel.findOne({_id: req.params.id})

//         if(!cart){
//            return res.send("There is nothing in the cart")
//         }
//         else{
//             let prodId = cart.products.push(req.params.id);
//             cart.products.splice(prodId, 1);
//             cart.totalPrice = Number(cart.totalPrice) - Number(product.price);

//             await cart.save();
//         }

//         res.redirect("back")
//     } catch(err) {
//         res.send(err.message)
//     }
// })
// router.get("/add/:id", userIsLoggedIn , async (req,res)=>{
//     try{
//         let cart = await cartModel.findOne({
//             user: req.session.passport.user,
//         });
//         let product = await productModel.findOne({_id: req.params.id})

//         if(!cart){
//             cart = await cartModel.create({
//             user: req.session.passport.user,
//             products: [req.params.id],
//             totalPrice: Number(product.price)   
//         });
//         }
//         else{
//             cart.products.push(req.params.id);
//             cart.totalPrice = Number(cart.totalPrice) + Number(product.price)
//             await cart.save();
//         }

//         res.redirect("back")
//     } catch(err) {
//         res.send(err.message)
//     }
// })



// router.get("/remove/:id", userIsLoggedIn , async (req,res)=>{
//     try{
//         let cart = await cartModel.find({user: req.session.passport.user});
//         if(!cart) return res.send("Something went wrong while removing item");
//         let index = cart.products.indexOf(req.params.id);
//         if(index !==1) cart.products.splice(index,1);
//         else return res.send("Item is not present in the cart.")

//         await cart.save();
//         res.redirect("back")
//     } catch(err) {
//         res.send(err.message)
//     }
// })

// module.exports = router


const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { cartModel } = require("../models/cart");
const { userIsLoggedIn } = require("../middlewares/admin");
const { productModel } = require("../models/product");

// View Cart
router.get("/", userIsLoggedIn, async (req, res) => {
  try {
    let cart = await cartModel.findOne({ user: req.session.passport.user }).populate("products");

    if (!cart) {
      return res.render("cart", {
        cart: [],
        finalprice: 34,
        userid: req.session.passport.user,
      });
    }

    let cartDataStructure = {};

    cart.products.forEach(product => {
      let key = product._id.toString();
      if (cartDataStructure[key]) {
        cartDataStructure[key].quantity += 1;
      } else {
        cartDataStructure[key] = {
          ...product._doc,
          quantity: 1,
        };
      }
    });

    const finalArray = Object.values(cartDataStructure);
    const finalPrice = cart.totalPrice + 34;

    res.render("cart", {
      cart: finalArray,
      finalprice: finalPrice,
      userid: req.session.passport.user,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error: " + err.message);
  }
});

// Add Product to Cart
router.get("/add/:id", userIsLoggedIn, async (req, res) => {
  try {
    const productId = req.params.id;
    // console.log("Product ID received:", productId);

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.log("⚠️ Invalid product ID:", productId);
      return res.status(400).send("Invalid product ID");
    }

    const product = await productModel.findById(productId);
    if (!product) return res.status(404).send("Product not found");

    let cart = await cartModel.findOne({ user: req.session.passport.user });

    if (!cart) {
      cart = await cartModel.create({
        user: req.session.passport.user,
        products: [new mongoose.Types.ObjectId(productId)],
        totalPrice: Number(product.price),
      });
    } else {
      cart.products.push(new mongoose.Types.ObjectId(productId));
      cart.totalPrice += Number(product.price);
      await cart.save();
    }

    res.redirect(req.get("Referrer") || "/")
  } catch (err) {
    res.status(500).send("Error adding to cart: " + err.message);
  }
});

// Remove Product from Cart
router.get("/remove/:id", userIsLoggedIn, async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send("Invalid product ID");
    }

    const product = await productModel.findById(productId);
    if (!product) return res.status(404).send("Product not found");

    const cart = await cartModel.findOne({ user: req.session.passport.user });
    if (!cart) return res.status(404).send("Cart not found");

    const index = cart.products.findIndex(pid => pid.equals(productId));
    if (index !== -1) {
      cart.products.splice(index, 1);
      cart.totalPrice -= Number(product.price);
      await cart.save();
    }

    res.redirect("back");
  } catch (err) {
    res.status(500).send("Error removing from cart: " + err.message);
  }
});

module.exports = router;
