import Search from './components/Search';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-12 text-center">

                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight pb-2">
                        Global Cities API
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        A high-performance, open-source API for exploring cities worldwide.
                        Search in real-time or consume strictly formatted JSON.
                    </p>
                </div>

                <Search />

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Link
                        href="/api/all-cities"
                        target="_blank"
                        className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all border border-blue-100 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        View All Cities (JSON)
                    </Link>

                    <a
                        href="https://github.com" // Placeholder, easy to update
                        target="_blank"
                        rel="noreferrer"
                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-blue-700 transition-all"
                    >
                        Documentation
                    </a>
                </div>

            </div>

            <footer className="absolute bottom-6 text-gray-400 text-sm">
                Global City Search By
                <a
                    href="https://seydinamb.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline mx-1"
                >
                    Seydina
                </a>
                and
                <a
                    href="https://sanouverse.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline mx-1"
                >
                    Sanouverse
                </a>
                &copy; {new Date().getFullYear()}
            </footer>

        </main>
    );
}
