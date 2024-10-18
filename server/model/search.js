import { Schema, model } from "mongoose";

// Define the search schema and model
const SearchSchema = new Schema({
    location: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Search = model("Search", SearchSchema);

export default Search;