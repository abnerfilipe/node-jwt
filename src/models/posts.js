import Mongoose from 'mongoose'

const schema = new Mongoose.Schema({
    title: String,
    content: String,
    author: String,
    publishDate: Date
},{
    timestamps: {
        createdAt: true,
        updatedAt: true
    },
    toJSON: {
        virtuals: true,
        transfom(doc, ret){
            ret.id = ret._id
            delete ret._id
        }
    },
    versionKey: false,
})
const PostModel = Mongoose.model('Posts', schema)

export default PostModel