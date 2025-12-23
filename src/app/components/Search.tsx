'use client';

import { useState, useEffect, useRef } from 'react'; // removed useCallback as not strictly needed for this simple effect
import { searchCitiesAction, type SearchResult } from '../actions';

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Debounce logic
    useEffect(() => {
        const handler = setTimeout(async () => {
            if (query.length >= 2) {
                setLoading(true);
                try {
                    const data = await searchCitiesAction(query);
                    setResults(data);
                    setShowResults(true);
                } catch (error) {
                    console.error("Search failed", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(handler);
    }, [query]);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    return (
        <div className="w-full max-w-xl mx-auto relative" ref={wrapperRef}>
            <div className="relative">
                <input
                    type="text"
                    className="w-full p-4 pl-12 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800 placeholder-gray-400"
                    placeholder="Search for a city (e.g., 'Paris')..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (results.length > 0) setShowResults(true);
                    }}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {loading && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    </div>
                )}
            </div>

            {showResults && results.length > 0 && (
                <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-96 overflow-y-auto z-50">
                    {results.map((item, index) => (
                        <div
                            key={`${item.city}-${item.countryCode}-${index}`}
                            className="px-6 py-3 hover:bg-gray-50 flex items-center justify-between cursor-pointer transition-colors border-b border-gray-50 last:border-none"
                        >
                            <div className="flex items-center gap-3">
                                <span className={`fi fi-${item.countryCode} rounded shadow-sm text-lg`} />
                                <span className="font-medium text-gray-800">{item.city}</span>
                            </div>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{item.country}</span>
                        </div>
                    ))}
                </div>
            )}

            {showResults && query.length >= 2 && !loading && results.length === 0 && (
                <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-4 text-center text-gray-500 z-50">
                    No cities found.
                </div>
            )}
        </div>
    );
}
