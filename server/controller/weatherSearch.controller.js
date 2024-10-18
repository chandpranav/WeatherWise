import Search from "../model/search.js";

// Get the last 10 searches
export const getSearches = async (req, res) => {
    try {
        const searches = await Search.find()
            .sort({ timestamp: -1 }) // Sort by most recent
            .limit(10); // Get the last 10 searches
        res.status(200).json(searches);
    } catch (err) {
        console.error('Failed to fetch searches:', err);
        res.status(500).json({
            status: "Fail",
            message: "Failed to get searches."
        });
    }
};

// Save a new search
export const saveSearch = async (req, res) => {
    try {
        const { location } = req.body;
        console.log('Location received:', location); // Log to check data being received
        
        const newSearch = new Search({ location });
        await newSearch.save(); // Save the new search to the database
        
        console.log('Search saved to database');
        res.status(201).json({ message: 'Search saved!' });
    } catch (err) {
        console.error('Failed to save search:', err);
        res.status(500).json({ error: 'Failed to save search' });
    }
};
