//@ts-check

import jwt from 'jsonwebtoken'

const { sign: jwtSign, verify: jwtVerify } = jwt
const JWT_SECRET = "GEXIDDdmCOczKIyqsxTKXg=="

/**
 * 
 * @param {object} user 
 * @returns {Promise<string>} return
 */
function sign(user) {
    return new Promise((resolve, reject) => {
        jwtSign({ user }, JWT_SECRET, {
            issuer: 'Facebook',
            audience: 'Frontend',
            subject: 'authentication',
            expiresIn: '1h',
            notBefore: '-5s'
        }, (err, encoded) => {
            if (err) reject(err)
            else resolve(encoded)
        })
    })
}

/**
 * 
 * @param {string} token 
 * @returns {Promise<string | jwt.JwtPayload>} return
 */
function verify(token) {
    return new Promise((resolve, reject) => {
        jwtVerify(token, JWT_SECRET, {
            issuer: 'Facebook',
            audience: 'Frontend',
            subject: 'authentication'
        }, (err, decoded) => {
            if (err) reject(err)
            else resolve(decoded)
        })
    })
}

export { sign, verify }