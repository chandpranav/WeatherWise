import Search from '../model/search.js'; 

export async function deleteOldSearches() {
    const THIRTY_DAYS_AGO = new Date();
    THIRTY_DAYS_AGO.setDate(THIRTY_DAYS_AGO.getDate() - 30);

    try {
        const result = await Search.deleteMany({ timestamp: { $lt: THIRTY_DAYS_AGO } });
        console.log(`Deleted ${result.deletedCount} old searches.`);
    } catch (error) {
        console.error('Error deleting old searches:', error);
    }
}
