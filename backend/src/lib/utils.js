import jwt from 'jsonwebtoken'

export const generateToken = (userId, res)=>{
    const token = jwt.sign({userId: userId._id}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000,
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        // secure: process.env.NODE_ENV !== 'development',
    })

    return token;
}

