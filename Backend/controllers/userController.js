import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator";

//creating JWT token 
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//login user function 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.json({
                success: false,
                message: "Incorrect password"
            })
        }
        const token = createToken(user._id);
        res.json({
            success: true,
            message: "Login successful",
            token: token
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//register user function 
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return res.json({
                success: false,
                message: "User already exists with the provided email!"
            })
        }
        else {
            //validate email and password provided
            if (!validator.isEmail(email)) {
                return res.json({
                    success: false,
                    message: "Email id is invalid!"
                })
            }
            if (password.length < 8) {
                return res.json({
                    success: false,
                    message: "Invalid password! please enter more than 8 characters"
                })
            }
            // hashing user password 
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new userModel({
                name: name,
                email: email,
                password: hashedPassword
            });

            const newuser = await newUser.save();
            const jwtToken = createToken(newuser._id);
            res.json({
                success: true,
                message: "User registered!",
                token: jwtToken
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { loginUser, registerUser }