const router = require("express").Router();
const Admin = require('../models/admin');
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js"); 
const { checkLogin } = require("./middleware");




router.post('/register', async (req,res)=>{
    try {
        const newAdmin  = new Admin({
            username : req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.CRYPTOJS_KEY
            ).toString(),
        })
        const savedAdmin  = await newAdmin.save()
        const {password, ...others} = savedAdmin._doc;
        res.status(200).json(others)

    } catch (err){
        res.status(500).json({error: err.message})
    }
}) 

router.post('/login' , async (req,res)=>{
    console.log(req.body)
    try {
        const admin = await Admin.findOne({email : req.body.email})
        if(!admin){
            return res.status(401).json({ error: "Invalid email or password !" });
        }
        const accessToken = jwt.sign(
            {
                id: admin._id,
                username: admin.username,
                email : admin.email
    
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );
        const { password, ...others } = admin._doc;
        res.status(200).json({ ...others, accessToken });
    } catch (err){
        res.status(500).json({ error: err.message });

    }




})


// New route for login using token
router.post('/login-with-token', async (req, res) => {
    const { accessToken } = req.body;

    try {
        // Verify the token
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

        // Check if the user exists based on the token information
        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return res.status(401).json({ error: "User not found" });
        }

        // You can perform additional checks or actions here based on your application logic

        // Respond with success
        res.status(200).json({ message: 'Login with token successful', admin });
    } catch (error) {
        // Handle token verification error
        res.status(401).json({ error: 'Invalid token' });
    }
});
router.get('/logged-in-user', checkLogin, (req, res) => {
    const user = req.user; // This will contain the logged-in user's information
  
    if (user) {
      // User is logged in
      res.json({ user });
    } else {
      // User is not logged in
      res.json({ user: null });
    }
  });

module.exports = router