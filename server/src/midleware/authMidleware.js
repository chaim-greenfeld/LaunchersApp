
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export function verifyToken(req, res, next) {
    try {
       

        const token = req.cookies.token
        if(!token) {
            return res.status(401).json({msg: "no token"})
        }
        
        const decoded = jwt.verify(token, JWT_SECRET)
        if(decoded.user_type !== 'admin' && decoded.user_type !== "intelligence" && decoded.user_type !== "airforce") {
            return res.status(401).json({msg: "No permission"})
        }
        req.user = decoded
        next()
    }catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


export function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.user_type)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}