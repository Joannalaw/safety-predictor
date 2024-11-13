import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    safetyIndex:{
        type: Number,
        required: false
    },
    moodIndex:{
        type: Number,
        required: false
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: false
        },
        coordinates: {
            type: [Number],
            required: false
        }
    },
})

userSchema.index({ location: "2dsphere" });

const User = mongoose.model('User', userSchema);

export default User;