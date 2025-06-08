const express = require("express");
const router = express.Router();
const { productModel } = require("../models/product")
const { adminModel } = require("../models/admin")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {validateAdmin} = require("../middlewares/admin");
const { categoryModel } = require("../models/category");

require("dotenv").config();

if(
    typeof process.env.NODE_ENV !== undefined && process.env.NODE_ENV === "DEVELOPMENT"
) {
    router.get("/create", async (req,res)=>{
        
        try{
            let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash("admin",salt)

        let user = new adminModel({
            name: "Vishwas",
            email: "admin@blink.com",
            password: hash,
            role: "admin",
        })

        await user.save();  
        
        let token = jwt.sign({email: "admin@blink.com", admin: true}, process.env.JWT_KEY)
        res.cookie("token", token);
        res.send("admin created successfully")
        } catch(err) {
            res.send(err.message)
        }

    })
}

router.get("/login", (req,res)=>{
    res.render("admin_login");
})
router.post("/login", async (req,res)=>{
    let { email, password } = req.body;
    let admin = await adminModel.findOne({ email })
    if(!admin) return res.send("this admin is not available");

    let valid = await bcrypt.compare(password, admin.password)
    if(valid){
        let token = jwt.sign({email: "admin@blink.com", admin: true}, process.env.JWT_KEY)
        res.cookie("token", token);
        res.redirect("/admin/dashboard");
    }
})

router.get("/dashboard", validateAdmin , async (req,res)=>{

    let prodcount = await productModel.countDocuments();
    let categcount = await categoryModel.countDocuments();

    res.render("admin_dashboard", { prodcount,categcount })
})

router.get("/products", validateAdmin , async (req,res)=>{

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

const formattedResult = {};
result.forEach(item => {
  formattedResult[item.category] = item.products;
});

res.render("admin_products", {products: formattedResult})

    // let products = await productModel.find();
    // res.render("admin_products", {products})
})

router.get("/logout", validateAdmin, (req,res)=>{ 
    res.cookie("token", "");
    res.redirect("/admin/login");
})

module.exports = router
