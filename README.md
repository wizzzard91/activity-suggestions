# activity-suggestions
GraphQL + React service to suggest activities for a city based on the weather


## Objective

My goal is to build a web application that accepts a city or town, and returns a ranking of how desirable it will be to visit for various activities over the next 7 days, based on weather data.

Activities to Rank:
• Skiing
• Surfing
• Outdoor sightseeing
• Indoor sightseeing

I need to use [Open-Meteo](https://open-meteo.com/) for all the required data.

## Description

### AI instruments used

I use Anthropic's Claude Sonnet 4.5 for suggestions and discussions, as well as Github Copilot's agent.

GitHub Copilot provided inline type suggestions and autocompletion for TypeScript interfaces, though I had to turn it off while working on `evaluate` method - because code suggestions were messing with my idea of how algorithm can work.

I used AI as a consultant and auto-suggestions, but made all final architectural decisions myself. I also validated all AI-generated code. I tried to avoid unnecessary explicit code and configs.

### Backend

I decided to go with Apollo, since it was suggested by LLLM and it is pretty popular in [NPM registry](https://www.npmjs.com/package/@apollo/server).

I used [Get Started with Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started) guide for initial project setup.

I've implemented a clean 3-layer architecture: 

- **Data Access Layer**: `clients/open-meteo-client.ts` - handles external API calls
- **Service Layer**: `services/suggestions-service.ts` - contains business logic for ranking activities
- **Controller Layer**: `resolvers/suggestions-resolver.ts` - GraphQL resolver definitions

Tradeoffs I had to embrace: I would also prefer to use GraphQL Code Generator for type safety between GraphQL schema and TypeScript code, but I need to focus on a better usage of time. Same goes for dependency inversions - it would take time to set up as well.

Another tradeoff I had to deal is to make backend not configurable. I've focused instead on introducing better strategies to resolve ranking, to meet the deadline.

One more trade-off - the algorithms in Ranking Strategies could be faster, but I've embraced the most simple solution.

### Frontend

I decided to use React with Vite, since it was suggested by LLLM and it is overwhelmingly popular, based on [NPM registry](https://www.npmjs.com/package/vite) data - ~30 million weekly downloads. Also it's the first option in [React App from Scratch](https://react.dev/learn/build-a-react-app-from-scratch) guide - which I am going to use for initial project set up.

I am using [Apollo Client](https://www.apollographql.com/docs/react) on frontend to send requests to backend.

I've implemented a simple ContentCard and ContentCardManager components, and made the later a generic, because on the earlier part of development I was focused to ensure frontend and backend communicate properly. I also used styles.css - though I understand that it would be better to use some library for that, like Material UI - but since it's MVP, I decided not to focus on it. 

Also, I've provided a simple config file support - `config.ts`. It will throw an error if the config is not provided - that's a simple validation, and given more time, I would suggest to add proper config validation.

### Infrastructure Tradeoff

I omitted Docker to focus on architecture and business logic within the time constraint, accepting that local setup requires manual dependency management.

### API Contract

The backend exposes a single GraphQL query that accepts a city name and returns activity rankings for the next 7 days based on weather conditions.

**Query:**
```graphql
query GetSuggestions {
  getSuggestions(city: "San Francisco") {
    data {
      date
      activities {
        activityName
        rank
      }
    }
  }
}
```

**Response example:**
```json
{
  "data": {
    "getSuggestions": {
      "data": [
        {
          "date": "2023-10-01",
          "activities": [
            {
              "activityName": "indoor sightseeing",
              "rank": 1
            },
            {
              "activityName": "outdoor sightseeing",
              "rank": 2
            }
          ]
        }
      ]
    }
  }
}
```

**Fields:**

* city (String, required): Name of the city to get suggestions for
* date (String): ISO date format (YYYY-MM-DD)
* activityName (String): One of: "skiing", "surfing", "outdoor sightseeing", "indoor sightseeing"
* rank (Int): Desirability score from 0-10 (higher is better)


## How to run

### Initial set up

We need to provide a proper config. Example already there - so you just need to run commands:

```bash
cd frontend
cp .env.example .env
cd ../
```

#### Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
cd ../
```

#### Run backend (in one terminal)
```bash
cd backend && npm start
```

#### Run frontend (in another terminal)
```bash
cd frontend && npm run dev`
```