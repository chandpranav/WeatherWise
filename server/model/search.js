import { Schema, model } from "mongoose";

// Define the search schema and model
const SearchSchema = new Schema({
    user: {type: String, required: true},
    location: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    temperatureC: { type: Number, required: true }, 
    temperatureF: { type: Number, required: true }, 
    description: { type: String}
});

const Search = model("Search", SearchSchema);

export default Search;