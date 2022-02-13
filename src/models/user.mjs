import mongoose from 'mongoose'

const User = mongoose.model('User', {
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String
    }
})

export default User