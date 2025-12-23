# Global Cities API & Search Interface

A high-performance, open-source Next.js application that serves as both a global cities JSON API and a smart, real-time search interface. Built with performance and security in mind.

![Global Cities App](https://via.placeholder.com/800x400?text=Global+Cities+API+Preview)

## 🚀 Features

- **Store-Backed Search**: Instant search results for thousands of cities worldwide using `country-state-city`.
- **Strict JSON API**: dedicated `/api/all-cities` endpoint returning data in a specific `{ "Country": ["City1", "City2"] }` format.
- **Smart UI**: 
  - Real-time debounced search.
  - Country flags using `flag-icons`.
  - Responsive design with Tailwind CSS animations.
- **Security & Performance**:
  - **Rate Limiting**: Built-in middleware to prevent abuse.
  - **Caching**: In-memory data caching for sub-millisecond API responses.
  - **Debouncing**: Optimized client-side search queries.
  - **Server Actions**: Efficient data filtering on the server.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Source**: [`country-state-city`](https://www.npmjs.com/package/country-state-city)
- **Icons**: [`flag-icons`](https://www.npmjs.com/package/flag-icons)
- **Language**: TypeScript

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/world-cities.git
   cd world-cities
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run locally:**
   ```bash
   npm run dev
   ```
   
   Access the app at [http://localhost:3000](http://localhost:3000).

## 📡 API Usage

### Get All Cities

**Endpoint:** `GET /api/all-cities`

**Response Format:**
```json
{
  "Afghanistan": ["Andkhoy", "Aqcha", ...],
  "Canada": ["Montreal", "Toronto", "Vancouver"],
  "Senegal": ["Dakar", "Thiès", "Saint-Louis"],
  ...
}
```

**Caching:** Responses are cached with `Cache-Control: s-maxage=86400, stale-while-revalidate`.

## 🛡️ Security Configuration

### Rate Limiting
The project uses a custom in-memory rate limiter in `middleware.ts`.
- **Default Limit**: 100 requests per minute per IP.
- **Production Note**: For distributed hosting (Vercel/AWS Lambda), it is recommended to swap the in-memory map for Redis (e.g., `@upstash/ratelimit`) to share state across instances.

### Headers
Security headers are applied globally:
- `X-XSS-Protection`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/all-cities/   # API Route
│   │   ├── components/       # UI Components (Search)
│   │   ├── actions.ts        # Server Actions
│   │   ├── layout.tsx        # Root Layout & Fonts
│   │   └── page.tsx          # Main Search Interface
│   └── middleware.ts         # Rate Limiting & Headers
├── public/
├── tailwind.config.ts
└── package.json
```

## 📜 License

This project is open-source and available under the MIT License.

## 🤝 Credits

Developed by **Seydina** and **Sanouverse**.
