import { Schema, model } from "mongoose";

const FavoriteSchema = new Schema({
    user: { type: String, required: true },
    favoriteLocations: {
        type: [String], 
        validate: [arrayLimit, '{PATH} exceeds the limit of 3']
    }
});

function arrayLimit(val) {
    return val.length <= 3;
}

const Favorite = model("Favorite", FavoriteSchema);

export default Favorite;