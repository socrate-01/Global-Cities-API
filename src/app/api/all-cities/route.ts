import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { City, Country } from 'country-state-city';

// Cache the data in memory to avoid rebuilding on every request (Lambda warm start optimization)
let cachedData: Record<string, string[]> | null = null;

// CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
};

// Handle Preflight Request
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  // 1. Security Check: API Key
  const apiKey = request.headers.get('x-api-key');
  const validKey = process.env.API_SECRET_KEY;

  // If validation fails, return 401 Unauthorized
  if (!validKey || apiKey !== validKey) {
    return NextResponse.json(
      { error: 'Unauthorized: Missing or invalid API Key' },
      { status: 401, headers: corsHeaders }
    );
  }

  // 2. Data Retrieval (Cached)
  if (cachedData) {
    return NextResponse.json(cachedData, {
      headers: {
        'Cache-Control': 's-maxage=86400, stale-while-revalidate',
        ...corsHeaders,
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
        formattedData[country.name] = cities.map((city) => city.name);
      }
    }

    cachedData = formattedData;

    return NextResponse.json(formattedData, {
      headers: {
        'Cache-Control': 's-maxage=86400, stale-while-revalidate',
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error('Error generating cities data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500, headers: corsHeaders }
    );
  }
}
