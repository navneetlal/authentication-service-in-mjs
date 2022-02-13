import mongoose from 'mongoose'

const UserSecrets = mongoose.model('UserSecrets', {
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    }
})

export default UserSecrets