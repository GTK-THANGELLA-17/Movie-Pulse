
# MoviePulse Backend

This is the backend server for the MoviePulse application. It's built with Node.js, Express, and MongoDB to store and retrieve user opinions, analytics data, and provide real-time statistics.

## Setup

1. Make sure you have Node.js (v14 or higher) and MongoDB installed on your system
2. Navigate to the server directory: `cd server`
3. Install dependencies: `npm install`
4. Create a `.env` file with your MongoDB URI (see `.env.example`)
5. Start the server: `npm start` (or `npm run dev` for development)

## API Endpoints

### Opinions

- `GET /api/opinions` - Get all opinions
- `POST /api/opinions` - Submit a new opinion
- `GET /api/opinions/category/:category` - Get opinions by category (film, television, youtube, streaming)

### Analytics

- `GET /api/opinions/analytics` - Get analytics data including:
  - Total opinions count
  - Category breakdown
  - Time-based data

## Data Model

```javascript
{
  category: String,       // 'film', 'television', 'youtube', 'streaming'
  question: String,       // The question being answered
  answer: String,         // User's response
  userId: String,         // Anonymous user identifier
  demographics: {         // Optional demographic information
    age: Number,
    region: String,
    gender: String
  },
  createdAt: Date         // Timestamp
}
```

## Deployment

The backend can be deployed to various platforms:

- Heroku
- DigitalOcean
- AWS
- Vercel
- Railway
- Render

When deploying, make sure to set the environment variables properly, especially the MongoDB connection string.
