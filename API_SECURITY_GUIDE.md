
## 🔐 Security & Auth

The API is secured with an API Key. All requests to `/api/all-cities` must include the `x-api-key` header.

### 1. Setting Up the Secure Key (Vercel)

To run this in production, you must set the environment variable:

1. Go to your **Vercel Dashboard** > Select your Project.
2. Navigate to **Settings** > **Environment Variables**.
3. Add a new variable:
   - **Key:** `API_SECRET_KEY`
   - **Value:** `your-super-secret-password-here` (Pick a strong password)
4. Click **Save** and **Redeploy** (or just wait for the next push).

### 2. Client-Side Usage Example

Here is how to fetch the secure API from any client (e.g., CodePen, React App):

```javascript
const API_URL = 'https://world-cities-api.vercel.app/api/all-cities';
const API_KEY = 'your-super-secret-password-here'; // Must match the Env Var

async function fetchCities() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY 
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`); // Handles 401 Unauthorized
    }

    const data = await response.json();
    console.log('Secure Data Received:', data);
    return data;

  } catch (error) {
    console.error('Fetch failed:', error);
  }
}

fetchCities();
```
