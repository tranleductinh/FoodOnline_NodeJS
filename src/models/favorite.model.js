import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    user_id: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    food: {
        ref: 'Food',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});
const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite