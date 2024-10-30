import Search from '../model/search.js';

export async function saveSearchToDatabase(location, temperatureC, temperatureF, description) {
    try {
        const search = new Search({ location, temperatureC, temperatureF, description });
        await search.save();
        console.log('Search saved:', search);
        return { message: "Search saved!"};
    } catch (err) {
        console.error("Failed to save serach:", err);
        throw new Error("Failed to save search");
    }
}