import mongoose from 'mongoose'

const User = mongoose.model('User', {
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    name: {
        type: String
    }
})

export default User