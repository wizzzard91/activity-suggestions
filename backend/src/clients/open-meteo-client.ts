import { fetchWeatherApi } from 'openmeteo';
import { WeatherData } from './types.js';

export class OpenMeteoClient {
  async getWeatherData({ cityName }: { cityName: string }): Promise<WeatherData> {
    const coordinates = await this.getCityCoordinates(cityName);
    
    const params = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      hourly: ["temperature_2m", "rain", "snow_depth", "snowfall", "wind_speed_10m"],
      forecast_days: 7,
    };
    
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly()!;

    const weatherData: WeatherData = {
      hourly: {
        time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
          (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
        ),
        temperature_2m: hourly.variables(0)!.valuesArray()!,
        rain: hourly.variables(1)!.valuesArray()!,
        snow_depth: hourly.variables(2)!.valuesArray()!,
        snowfall: hourly.variables(3)!.valuesArray()!,
        wind_speed_10m: hourly.variables(4)!.valuesArray()!,
      },
    };

    return weatherData;
  }

  private async getCityCoordinates(cityName: string): Promise<{ latitude: number; longitude: number }> {
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
    
    const response = await fetch(geocodingUrl);
    const data = await response.json() as { results?: Array<{ latitude: number; longitude: number }> };
    
    if (!data.results || data.results.length === 0) {
      throw new Error(`City "${cityName}" not found`);
    }
    
    return {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
    };
  }
}