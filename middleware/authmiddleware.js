const jwt = require("jsonwebtoken")
const user = require("../models/user")

exports.protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(402).json({message: "No token, authorization denied"})
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await user.findById(decoded.id).select("-password")
        if (!user) return res.status(401).json
        ({message: "user not found"}) 
            req.user=user;
        next()
    } catch (error) {
        res.status(401).json({message: "token invalid", error:error})

    }
}