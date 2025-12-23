'use server';

import { City, Country } from 'country-state-city';

export interface SearchResult {
    city: string;
    country: string;
    countryCode: string; // ISO Code for flag
}

// Optimization: Pre-compute a flattened list or index if possible.
// For now, we will search on demand but optimized.
// Searching *all* cities might be slow if we iterate everything every time.
// We can cache the full list in memory (lambda warm start).

let allCitiesCache: SearchResult[] | null = null;

function getAllCities() {
    if (allCitiesCache) return allCitiesCache;

    const results: SearchResult[] = [];
    const countries = Country.getAllCountries();
    for (const country of countries) {
        const cities = City.getCitiesOfCountry(country.isoCode);
        if (cities) {
            for (const city of cities) {
                results.push({
                    city: city.name,
                    country: country.name,
                    countryCode: country.isoCode.toLowerCase(),
                });
            }
        }
    }
    allCitiesCache = results;
    return results;
}

export async function searchCitiesAction(query: string): Promise<SearchResult[]> {
    if (!query || query.length < 2) return [];

    const lowerQuery = query.toLowerCase();

    // Ensure cache is populated
    const allData = getAllCities();

    // Filter 
    // Limit results to 50 to avoid massive payloads
    const filtered = allData
        .filter((item) => item.city.toLowerCase().includes(lowerQuery))
        .slice(0, 50);

    return filtered;
}
