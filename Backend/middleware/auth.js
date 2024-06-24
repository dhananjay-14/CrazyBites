import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';
const authMiddleWare = async (req, res, next) => {
    console.log("auth middleware called")
    console.log("token", req.headers.token);
    if (req.headers.token) {
        const verify = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        // console.log("verify ", verify)
        if (verify) {
            let user = await userModel.findById(verify.id);
            if (user) {
                req.body.userId = user._id;
                next();
            }
            else {
                console.log("user does not exist");
            }
        }
        else {
            console.log("Invalid token");
        }
    }
    else {
        console.log("user not logged in");
        return res.json({
            success: false,
            message: "Please log in to continue.."
        })
    }

}
export default authMiddleWare;