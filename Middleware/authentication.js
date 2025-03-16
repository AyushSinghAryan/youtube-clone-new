import jwt from "jsonwebtoken";
import userModel from "../Models/user.model.js";

const auth = async (req, res, next) => {

    const token = req.cookies.token;
    // try to get token from cookie
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    } else {
        try {
            // this will verify the token
            const decode = jwt.verify(token, "Its_My_Secret_Key");
            // uisng select will not give password , so in req.user we do not give password
            req.user = await userModel.findById(decode.userId).select('-password');
            next();
        } catch (err) {
            res.status(401).json({ error: 'Token is not valid' });
        }
    }
}

export default auth;