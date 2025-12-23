import { NextResponse } from 'next/server';
import { City, Country } from 'country-state-city';

// Cache the data in memory to avoid rebuilding on every request (Lambda warm start optimization)
let cachedData: Record<string, string[]> | null = null;

export async function GET() {
  // Use cached data if available
  if (cachedData) {
    return NextResponse.json(cachedData, {
      headers: {
        'Cache-Control': 's-maxage=86400, stale-while-revalidate',
      },
    });
  }

  try {
    const allCountries = Country.getAllCountries();
    const formattedData: Record<string, string[]> = {};

    // Iterate efficiently
    for (const country of allCountries) {
      const cities = City.getCitiesOfCountry(country.isoCode);
      if (cities && cities.length > 0) {
        // Just storing city names as requested
        formattedData[country.name] = cities.map((city) => city.name);
      }
    }

    cachedData = formattedData;

    return NextResponse.json(formattedData, {
      headers: {
        'Cache-Control': 's-maxage=86400, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating cities data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
