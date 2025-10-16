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

### Frontend

I decided to use React with Vite, since it was suggested by LLLM and it is overwhelmingly popular, based on [NPM registry](https://www.npmjs.com/package/vite) data - ~30 million weekly downloads. Also it's the first option in [React App from Scratch](https://react.dev/learn/build-a-react-app-from-scratch) guide.
