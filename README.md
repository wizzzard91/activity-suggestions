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

## Stack

### AI instruments used

I use Anthropic's Claude Sonnet 4.5 for suggestions and discussions, as well as Github Copilot's agent.

### Backend

I decided to go with Apollo, since it was suggested by LLLM and it is pretty popular in [NPM registry](https://www.npmjs.com/package/@apollo/server).

I used [Get Started with Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started) guide for initial project setup.

### Frontend

I decided to use React with Vite, since it was suggested by LLLM and it is overwhelmingly popular, based on [NPM registry](https://www.npmjs.com/package/vite) data - ~30 million weekly downloads. Also it's the first option in [React App from Scratch](https://react.dev/learn/build-a-react-app-from-scratch) guide - which I am going to use for initial project set up.

I am using [Apollo Client](https://www.apollographql.com/docs/react) on frontend to send requests to backend.

I've implemented a simple ContentCard and ContentCardManager components, and made the later a generic, because on the earlier part of development I was focused to ensure frontend and backend communicate properly. I also used styles.css - though I understand that it would be better to use some library for that, like Material UI - but since it's MVP, I decided not to focus on it. 

Also, I've provided a simple config file support - `config.ts`. It will throw an error if the config is not provided - that's a simple validation, and given more time, I would suggest to add proper config validation.

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