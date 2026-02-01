import jwt from 'jsonwebtoken'
import User from '../Models/UserModel.js'
import VisitorUser from '../Models/VisitorUser.js'

const Protection = async (req, res, next) => {
    try {
        const AuthHeader = req.headers.authorization;
        if (!AuthHeader || !AuthHeader.startsWith('Bearer')) {
            return res.status(401).json({
                message: "Invalid Token"
            })
        }
        const token = AuthHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role === 'visitor') {
            req.user = await VisitorUser.findById(decoded.id).select('-password');
        } else {
            req.user = await User.findById(decoded.id).select('-password');
        }

        if (!req.user) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        if (req.user.role !== 'visitor' && req.user.isActive === false) {
            return res.status(403).json({
                message: "Account is disabled by admin"
            });
        }

        next();
    }
    catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

const restrictedTo = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return res.status(403).json({
                message: "No such User found"
            })
        }
        next()

    }
}


export { Protection, restrictedTo }