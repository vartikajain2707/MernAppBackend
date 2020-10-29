const router=require("express").Router();
const bcrypt=require("bcryptjs");
const User=require("../Models/UserModel");
const jwt=require('jsonwebtoken');
const auth =require("../middleware/auth");


router.post("/register",async(req,res)=>{
    try{
    let {email,password,passwordCheck,displayName}=req.body;

    if(!email || !password || !passwordCheck){
        return res.status(400).json({msg:"Please fill all the required fields"});
    }
    if(password.length < 5){
        return res.status(400).json({msg:"Passwords should be atleast 5 characters long"});
    }
    if(password!=passwordCheck){
        return res.status(400).json({msg:"Passwords should match"});
    }
    const existingUser= await User.findOne({email:email});
    if (existingUser){
        return res.status(400).json({msg:"User with this email already exists"});
    }
    if(!displayName){
        displayName=email;
    }
    const salt=await bcrypt.genSalt();
    const passwordHash=await bcrypt.hash(password,salt);
    
    const newUser= new User({
        email,
        password:passwordHash,
        displayName
    });
    const savedUser= await newUser.save();
    res.json(savedUser);
}
    catch(err){
        return res.status(500).json({error:err.message});
    }
    
});
router.post("/login", async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({msg:"Please fill all the required fields"});
        }
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({msg:"No account with this email has been registered"});
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid credentials "});
        }
        const token=jwt.sign({id:user._id},process.env.JWTSECRET);
        res.json({
            token,
            user:{
                id:user._id,
                displayName:user.displayName,
               
            }, 
        });
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
});
router.delete("/delete",auth, async(req,res)=>{
    try{
        const deletedUser=await User.findByIdAndDelete(res.user);
        res.json(deletedUser);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }

});
router.post("/tokenIsValid", async(req,res)=>{
    try{
        const token=req.header('x-auth-token');
        if(!token){
            return res.json(false);
        }
        const verified=jwt.verify(token,process.env.JWTSECRET);
        if(!verified){
            return res.json(false);
        }
        const user=await User.findById(verified.id);
        if(!user){
            return res.json(false);
        }
        return res.json(true);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
});
router.get('/home',auth,async (req,res)=>{
    try{
        const user=await User.findById(req.user);
        res.json({
            displayName:user.displayName,
            id:user._id,
        });
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
   
});
module.exports=router;