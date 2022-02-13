import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/test', (err) => {
    if(err) throw err
    else console.log('Connection successful')
})

export default mongoose