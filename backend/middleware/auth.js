import jwt from "jsonwebtoken";
export const verifyToken = async (request, response, next) => {
    try {
        let token = request.headers.authorization;
        token = token.split(" ")[1];
        jwt.verify(token, "fdfjfjrwieroerivxcnmvnnvrweiorddfsdfdlkfjlfjljlraj");
        next();
    }
    catch (err) {
        return response.status(401).json({ error: "Unauthorized access"  ,err});
    }
}