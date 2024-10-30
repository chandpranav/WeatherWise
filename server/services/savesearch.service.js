import Search from '../model/search.js';

export async function saveSearchToDatabase(location) {
    try {
        const search = new Search({ location });
        await search.save();
        console.log('Search saved:', search);
        return { message: "Search saved!"};
    } catch (err) {
        console.error("Failed to save serach:", err);
        throw new Error("Failed to save search");
    }
}