const User = require("../models/User");
const yup = require("yup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const register = async(req, res) => {

    const {username, email, password, confirmPassword} = req.body;
    
    const schema = yup.object({
        username: yup.string().required().min(3),
        email: yup.string().required().email(),
        password: yup.string().required('Password is required'),
        confirmPassword: yup.string()
           .oneOf([yup.ref('password'), null], 'Passwords must match')
      });
      
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                erro: "Error on validade schema"
            })
      }
    const oldUser = await User.findOne({email});
        
        if(oldUser){
          return res.json({error: "User Exists"});
        }
    const passwordHash = await bcrypt.hash(password,5);
        
    const newUser = new User({username, email,password: passwordHash});
        try {
            await newUser.save()
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json(error);
        }
}


const login = async(req, res)=>{
    const { email, password } = req.body;

    const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: "User Not found" });
        }
        if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

        if (res.status(201)) {
        return res.json({ status: "ok", data: token });
        } else {
        return res.json({ error: "error" });
        }
    }
    return res.json({ status: "error", error: "InvAlid Password" });
}


module.exports = {register,login}