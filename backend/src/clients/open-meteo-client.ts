export class OpenMeteoClient {
  constructor() {
    // add axios, baseURL, etc.

  }

  async getWeatherData(): Promise<{ temperature: number }> {
    // mocked
    return {
      temperature: 20,
    }
  }
}