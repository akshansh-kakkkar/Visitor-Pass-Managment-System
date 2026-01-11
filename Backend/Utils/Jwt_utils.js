import jwt from 'jsonwebtoken';
const GenerateToken = (id, role)=>{
    return jwt.sign(
        {id, role},
        process.env.JWT_SECRET,
        {expiresIn : '7d'}
    )
}

export default GenerateToken