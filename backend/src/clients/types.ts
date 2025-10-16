export interface WeatherData {
  hourly: {
    time: Date[];
    temperature_2m: Float32Array;
    rain: Float32Array;
    snow_depth: Float32Array;
    snowfall: Float32Array;
    wind_speed_10m: Float32Array;
  };
}
