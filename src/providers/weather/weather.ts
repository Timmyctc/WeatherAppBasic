import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class WeatherProvider {

  
  //API Key
  private apiKey: string = "bd843da346b140f3a4a57a14309d480c";

  // Object to store weather data
  private weatherInfo =  {
    city: '',
    temp: '',
    description: '',
    icon: ''
  }

  constructor(private http: HttpClient, private storage: Storage) {
    console.log('Hello WeatherProvider Provider');
  }

  //Get Weather info from City name with Units
  getWeatherFromApiCity(city: string, units: string) : void  {
    let weatherData = this.http.get('https://api.weatherbit.io/v2.0/current?city=' + city + '&key=' + this.apiKey + '&units=' + units);
    weatherData.subscribe(data => {
      let currentWeather = data;
      this.packWeatherData(currentWeather);
      console.log(currentWeather);
  });
    //return weatherData;
  }

  //Get Weather info From City name (Deprecated)
  // getWeatherFromApi(city: string) : void {
  //   let weatherData = this.http.get('https://api.weatherbit.io/v2.0/current?city=' + city + '&key=' + this.apiKey);
  //   weatherData.subscribe(data => {
  //       let currentWeather = data;
  //       console.log(currentWeather);
  //       this.packWeatherData(currentWeather);
  //   });
    //return weatherData;
  // }

  //Get Weather Data from Lat Lon
  getWeatherFromApiCoordinates(lat: number, lon: number, units: string) : void  {
    let weatherData = this.http.get('https://api.weatherbit.io/v2.0/current?lat=' + lat + '&lon=' + lon + "&key=" + this.apiKey + '&units=' + units);
    weatherData.subscribe(data => {
      let currentWeather = data;
      //TODO
      console.log(lat,lon);
      console.log(currentWeather);
      this.packWeatherData(currentWeather);
    });
   // return weatherData;
  }

  //return the icon from weatherbit api
  getIcon(icon: string) {
    return 'https://www.weatherbit.io/static/img/icons/' + icon + '.png';
  }

  //Pack Weather Data from API into an array to be stored in storage
  packWeatherData(currentWeather: any) {
    this.weatherInfo.city = currentWeather.data[0].city_name;
    this.weatherInfo.temp = currentWeather.data[0].temp;
    this.weatherInfo.description = currentWeather.data[0].weather.description;
    this.weatherInfo.icon = this.getIcon(currentWeather.data[0].weather.icon);
   
    this.storage.set('weatherInfo', this.weatherInfo);
  }

}
