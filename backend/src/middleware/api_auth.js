import * as Users from "../models/users.js";

// Authorisation middleware
export default function api_auth(allowed_roles) {
    return function (req, res, next) {
        const auth_key = req.get("X-AUTH-KEY")

        if(auth_key) {
            Users.getByAuthKey(auth_key).then(user => {
                if (allowed_roles.includes(user.role)) {
                    next()
                } else {
                    res.status(403).json({
                        status: 403,
                        message: "Access forbidden"
                    })
                }
            }).catch(err => {
                res.status(401).json({
                    status: 401,
                    message: "Auth key not found / not logged in."
                })
            })
        } else {
            res.status(400).json({
                status: 400,
                message: "Missing auth key."
            }) 
        }
    }
}
