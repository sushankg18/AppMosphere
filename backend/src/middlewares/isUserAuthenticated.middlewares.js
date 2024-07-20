import jwt from 'jsonwebtoken';


export const isUserAuthenticated = async (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({ message: "Token not found!" })
        };

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!decode) {
            return res.status(401).json({ message: "Invalid token" })
        };

        req.id = decode.userId;
        
        next();


    } catch (error) {
        console.log("Error while fetching token : ",error);
        return res.status(500).json({
            message : "Internal Server Error!"
        });
    }
}