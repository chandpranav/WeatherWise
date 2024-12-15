import { Schema, model } from "mongoose";

const FavoriteSchema = new Schema({
    user: { type: String, required: true }, 
    favoriteLocation: { type: String, required: false }  
});

const Favorite = model("Favorite", FavoriteSchema);

export default Favorite;
