import Search from '../model/search.js'

export async function getUserHistory(user) {    
    try {
        const searches = await Search.find({ user: "Diego" })
            .sort({ timestamp: -1 }) // Sort by most recent
            .limit(10) // Get the last 10 searches
            .select("user location timestamp"); // Only include these fields
        return searches;
    } catch (err) {
        console.error('Failed to fetch searches:', err);
    }
}