import Search from '../model/search.js';

export async function saveSearchToDatabase(user, location, temperatureC, temperatureF, description) {
    try {
        const search = new Search({user, location, temperatureC, temperatureF, description });
        await search.save();    // save is a mongoose method
        console.log('Search saved:', search);
        return { message: "Search saved!"};
    } catch (err) {
        console.error("Failed to save serach:", err);
        throw new Error("Failed to save search");
    }
}