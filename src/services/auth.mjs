//@ts-check

import { randomBytes, scrypt, timingSafeEqual } from 'crypto'

/**
 * 
 * @param {string} password
 * @returns {Promise<string>} return
 */
function hashPassword(password) {
    return new Promise((resolve, reject) => {
        const salt = randomBytes(32).toString('hex')
        scrypt(password, salt, 32, (err, derivedKey) => {
            if (err) reject(err)
            else resolve(`${derivedKey.toString('hex')}:${salt}`)
        })
    })
}

/**
 * 
 * @param {string} hashedPassword 
 * @param {string} password 
 * @returns {Promise<boolean>} return
 */
function verifyPassword(hashedPassword, password) {
    return new Promise((resolve, reject) => {
        const [hash, salt] = hashedPassword.split(':')
        scrypt(password, salt, 32, (err, derivedKey) => {
            if (err) reject(err)
            else resolve(timingSafeEqual(Buffer.from(hash, 'hex'), derivedKey))
        })
    })
}

export { hashPassword, verifyPassword }